"use strict";

// const mdns = require("mdns");

// module.exports = function(port, name) {
//   mdns.createAdvertisement(mdns.tcp("http"), port, { name: name });
// };

const bonjour = require("nbonjour").create();
module.exports = {
  startup: (port, name) => bonjour.publish({ name, port, type: "http" }),
  exit: () => bounjour.unpublishAll(() => bonjour.destroy())
};
