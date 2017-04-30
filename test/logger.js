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

describe("Browsersync mDNS Logger", function() {
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

  it("should use a short label");
  it("should use the full label");

  it("should log underlines to match length of Browsersync Access Urls", function() {
    this.bs.options = Map({ port: 3000, urls: Map(bsUrlShort) });
    this.bsmdns.plugin({}, this.bs);
    this.bs.emitter.emit("service:running");

    this.bs.options = Map({ port: 3000, urls: Map(bsUrlLong) });
    this.bsmdns.plugin({}, this.bs);
    this.bs.emitter.emit("service:running");

    this.bs.logger.info.should.have.been.called;
    this.bs.logger.unprefixed.getCall(0).args[2].should.have.lengthOf(31);
    this.bs.logger.unprefixed
      .getCall(0)
      .args[2].should.be.string("----------------------------");
    this.bs.logger.unprefixed.getCall(3).args[2].should.have.lengthOf(55);
    this.bs.logger.unprefixed
      .getCall(3)
      .args[2].should.be.string(
        "-------------------------------------------------------"
      );
  });
});