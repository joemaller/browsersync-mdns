"use strict";

const mdns = require("mdns");

module.exports = function(port, name) {
  mdns.createAdvertisement(mdns.tcp("http"), port, { name: name });
};
