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

describe("Browsersync mDNS plugin HTTPS redirect", function() {
  beforeEach(function() {
    this.mdns = sinon.stub(mdns, "createAdvertisement");
    this.readPkgUp = sinon.stub(readPkgUp, "sync").returns(pkg);
    this.os = sinon.stub(os, "hostname");
    this.findPort = sinon.stub(portscanner, "findAPortNotInUse");
    this.createServer = sinon.stub(http, "createServer");
    this.server = { listen: sinon.spy() };
    this.response = { writeHead: sinon.spy(), end: sinon.spy() };
    this.createServer.returns(this.server).yields(null, this.response);
    this.bs = {
      logger: { info: sinon.spy(), unprefixed: sinon.spy() },
      options: Map({ port: 3000, urls: Map(bsUrls), scheme: "http" }),
      emitter: new EventEmitter()
    };
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
    this.createServer.restore();
    this.mdns.reset();
  });

  it("should use https", function() {
    this.bs.options = Map({ port: 3000, urls: Map(bsUrls), scheme: "https" });
    this.bsmdns.plugin({}, this.bs);
    this.createServer.should.have.been.called;
  });

  it("should not use https", function() {
    this.bsmdns.plugin({}, this.bs);
    this.createServer.should.not.have.been.called;
  });

  it("should listen on a unique port", function() {
    // TODO: This test is a bit pointless, it just tests the callback where
    // portscanner.findAPortNotInUse returned a port successfully
    const port = 3567;
    this.bs.options = Map({ port: port, urls: Map(bsUrls), scheme: "https" });
    this.findPort.callsArgWith(1, null, port + 1000);
    this.bsmdns.plugin({}, this.bs);

    const listenPort = this.findPort.firstCall.args[0];
    this.findPort.should.have.been.called;
    this.server.listen.should.have.been.called;
    this.server.listen.firstCall.args[0].should.equal(listenPort);
  });

  it("should throw when unable to find an open port (forced error)", function() {
    this.bs.options = Map({ port: 1337, urls: Map(bsUrls), scheme: "https" });
    this.findPort.callsArgWith(1, new Error("error"), 5000);
    try {
      this.bsmdns.plugin({}, this.bs);
    } catch (err) {
      err.should.be.an.instanceOf(Error);
    }
  });

  it("should send code 302 when redirecting", function() {
    this.bs.options = Map({ port: 3000, urls: Map(bsUrls), scheme: "https" });
    this.bsmdns.plugin({}, this.bs);
    this.response.writeHead.firstCall.args[0].should.equal(302);
  });

  it("should redirect to the external url", function() {
    this.bs.options = Map({ port: 3000, urls: Map(bsUrls), scheme: "https" });
    this.bsmdns.plugin({}, this.bs);
    this.createServer.should.have.been.called;
    this.response.writeHead.firstCall.args[1].should.have.property(
      "Location",
      bsUrls.external
    );
  });
});
