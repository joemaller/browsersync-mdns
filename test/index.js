/* eslint-env node,mocha,chai */

"use strict";

const proxyquire = require("proxyquire");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

const Map = require("immutable").Map;
const EventEmitter = require("events");

// Modules to be stubbed
const os = require("os");
const http = require("http");
const mdns = require("mdns");
const readPkgUp = require("read-pkg-up");
const portscanner = require("portscanner");

const pkg = { pkg: { name: "package.json" } };
const bsUrlShort = { external: "http://localhost:3000" }; // key: 8 chars, value: 21 chars
const bsUrlLong = { a_much_longer_key: "https://a-very-long-example-url:3001" };
const bsUrls = Object.assign({}, bsUrlShort, bsUrlLong);

describe("Browsersync mDNS plugin", function() {
  beforeEach(function() {
    this.mdns = sinon.stub(mdns, "createAdvertisement");
    this.readPkgUp = sinon.stub(readPkgUp, "sync").returns(pkg);
    this.os = sinon.stub(os, "hostname");
    this.findPort = sinon.stub(portscanner, "findAPortNotInUse");
    // this.listen = sinon.stub(http.createServer(), 'listen');
    // this.server = sinon.mock(http.createServer);
    // this.server.expects('listen');

    // const createServer = function

    this.server = sinon.stub(http, "createServer");
    this.bs = {
      logger: { info: sinon.spy(), unprefixed: sinon.spy() },
      options: Map({ port: 3000, urls: Map(bsUrls), scheme: "http" }),
      emitter: new EventEmitter()
    };
    // this.bs.options.set('urls', bsUrls);
    this.bsmdns = proxyquire("../", {
      mdns: this.mdns,
      "read-pkg-up": this.readPkgUp
    });
  });

  afterEach(function() {
    this.mdns.restore();
    this.readPkgUp.restore();
    this.os.restore();
    this.findPort.restore();
    this.server.restore();
    this.os.reset();
    this.mdns.reset();
  });

  it("has a name", function() {
    this.bsmdns.should.have.property("plugin:name", "Browsersync mDNS");
  });

  it("exports a plugin", function() {
    this.bsmdns.should.have.property("plugin").that.is.a("function");
  });

  it("should advertise a service", function() {
    this.bsmdns.plugin({}, this.bs);
    this.bs.emitter.emit("service:running");
    this.bs.logger.info.should.have.been.called;
    this.bs.logger.unprefixed.should.have.been.called;
    this.mdns.firstCall.args.should.contain(3000);
  });

  it("should not advertise without a network connection", function() {
    this.bs.options = Map({ port: 3000, urls: Map(bsUrlLong) });
    this.bsmdns.plugin({}, this.bs);
    this.bs.emitter.emit("service:running");
    this.bs.logger.info.should.not.have.been.called;
    this.bs.logger.unprefixed.should.not.have.been.called;
  });

  it("should use the provided port", function() {
    const port = 5000;
    this.bs.options = Map({ port: port, urls: Map(bsUrls) });
    this.bsmdns.plugin({}, this.bs);
    this.mdns.args.should.have.deep.property("[0][1]", port);
  });

  it("should use a custom name", function() {
    const name = "yogi";
    const opts = { name: name };
    this.bsmdns.plugin(opts, this.bs);
    this.mdns.args.should.have.deep.property("[0][2].name", name);
  });

  it("should use http", function() {
    this.bsmdns.plugin({}, this.bs);
    this.server.should.not.have.been.called;
  });

  it("should use the name from package.json", function() {
    this.bsmdns.plugin({}, this.bs);
    this.mdns.args.should.have.deep.property("[0][2].name", "package.json");
  });

  it("should fallback to the hostname", function() {
    const hostname = "test-hostname.dev";
    const rpu = this.readPkgUp.returns({ pkg: {} });
    this.os.returns(hostname);

    var bsmdns = proxyquire("../", {
      mdns: this.mdns,
      os: this.os,
      "read-pkg-up": rpu
    });
    bsmdns.plugin({}, this.bs);

    this.mdns.args.should.have.deep.property("[0][2].name", hostname);
  });
});
