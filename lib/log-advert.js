"use strict";

const leftPad = require("left-pad");
/**
 * Logs mDNS advertisement using the Browsersync logger
 * @param  {string} name Display name of the advertised service
 * @param  {object} bs   A Browsersync instance
 */
function logAdvertisement(name, bs) {
  const urls = bs.options.get("urls").toJS();
  const keys = Object.keys(urls);
  let longestName = 0;
  let longestUrl = 0;
  const offset = 2;
  let label = "mDNS Name";

  keys.map(function(key) {
    longestName = Math.max(key.length, longestName);
    longestUrl = Math.max(urls[key].length, longestUrl);
    return key;
  });

  label = label.length < longestName ? label : label.split()[0];

  const line = new Array(longestName + offset + longestUrl + 1).join("-");

  bs.logger.info("{bold:Advertising:}");
  bs.logger.unprefixed("info", "{grey: %s}", line);
  bs.logger.unprefixed(
    "info",
    " %s: {magenta:%s}",
    leftPad(label, longestName),
    name
  );
  bs.logger.unprefixed("info", "{grey: %s}", line);
}

module.exports = logAdvertisement;
