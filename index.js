"use strict";

const os = require("os");
const http = require("http");

const readPkgUp = require("read-pkg-up").sync;
const portscanner = require("portscanner");
// const bonjour = require("nbonjour").create();
// const Bonjour = require("nbonjour");
// const bonjour = new Bonjour();

const Bonjour = require("bonjour");
const bonjour = new Bonjour("abc");

const pkg = readPkgUp({ normalize: false }).pkg;
const pluginName = "Browsersync mDNS";

// const mDNSAdvertise = require("./lib/mdns-advert");
const logAdvert = require("./lib/log-advert");

let nameIncrement = 1;
const safeNamePublish = advert => {
    if (nameIncrement > 50) return;
  console.log("in safeNamePublish", advert);
  const advertClone = { ...advert };
  if (!advertClone.hasOwnProperty("basename")) {
    advertClone.basename = advertClone.name;
  }
  console.log('console to the fucking log', bonjour)
  // console.log(bonjour.publish(advertClone))
  //
  // bonjour.publish(advertClone)
  // console.log("bonjour", bonjour);
  // const bnj =
  bonjour.publish(advertClone)

  // console.log(bnj);
  // bnj
  .on("error", (err, more) => {
    console.log(err.message);
    advertClone.name = `${advertClone.basename} (${nameIncrement++})`;
    safeNamePublish(advertClone);
    // return;
  })
  .on("up", () => console.log("up up up!", advert));
};

module.exports = {
  "plugin:name": pluginName,
  plugin: function(options, browsersync) {

    const displayName = options.name || pkg.name || os.hostname();
    const external = browsersync.options.get("urls").get("external");
    const scheme = browsersync.options.get("scheme");
    const port = browsersync.options.get("port");
    // console.log(JSON.stringify(displayName));
    const advert = {
      name: displayName + Math.floor(Math.random() * 1000),
      port,
      type: "http"
    };

    // const browser = bonjour.find({}, serv => console.log(serv.name, serv.type, browser.services.length))
    // console.log('services', browser.services)
    // bonjour.find({ type: 'http' }, service =>   console.log('Found an HTTP server:', service.name));
    // bonjour.findOne({ name: displayName }, service =>   console.log('Name in use:', service.name));

    if (external) {
      if (scheme !== "https") {
        safeNamePublish(advert);
      } else {
        const redirector = http.createServer((req, res) => {
          res.writeHead(302, { Location: external });
          res.end();
        });

        portscanner.findAPortNotInUse(port + 1000, function(err, httpPort) {
          if (err) throw err;
          redirector.listen(httpPort);
          advert.post = httpPort;
          safeNamePublish(advert);
        });
      }
      const logger = logAdvert.bind(null, advert.name, browsersync);
      browsersync.emitter.on("service:running", logger);
      browsersync.emitter.on("service:exit", () => {
        console.log("shutting down");
        bonjour.unpublishAll(() => {
          bonjour.destroy();
        });
      });
    }
  }
};
