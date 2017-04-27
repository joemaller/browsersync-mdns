const os = require('os');
const leftPad = require('left-pad');
const mdns = require('mdns');
const readPkgUp = require('read-pkg-up').sync;

const pkg = readPkgUp({ normalize: false }).pkg;
const pluginName = 'Browsersync mDNS';

module.exports = {
  'plugin:name': pluginName,
  plugin: function(options, browsersync) {
    const displayName = options.name || pkg.name || os.hostname();

    mdns.createAdvertisement(mdns.tcp('http'), browsersync.options.get('port'), {
      name: displayName
    });

    browsersync.emitter.on('service:running', function() {
      logAdvertisement(displayName, browsersync);
    });
  }
};

function logAdvertisement(name, bs) {
  const urls = bs.options.get('urls').toJS();
  const keys = Object.keys(urls);
  let longestName = 0;
  let longesturl = 0;
  const offset = 2;
  let label = 'mDNS Name';


  keys.map(function (key) {
    if (key.length > longestName) {
      longestName = key.length;
    }
    if (urls[key].length > longesturl) {
      longesturl = urls[key].length;
    }
    return key;
  });

  label = (label.length < longestName) ? label : label.split()[0];

  const line = new Array(longestName + offset + longesturl + 1).join('-');

  bs.logger.info('{bold:Advertising:}');
  bs.logger.unprefixed('info', '{grey: %s}', line);
  bs.logger.unprefixed('info', ' %s: {magenta:%s}', leftPad(label, longestName), name);
  bs.logger.unprefixed('info', '{grey: %s}', line);
}
