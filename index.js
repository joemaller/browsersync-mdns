'use strict';

const os = require('os');
const http = require('http');

const readPkgUp = require('read-pkg-up').sync;
const portscanner = require('portscanner');

const pkg = readPkgUp({ normalize: false }).pkg;
const pluginName = 'Browsersync mDNS';

const mDNSAdvertise = require('./lib/mdns-advert');
const logAdvert = require('./lib/log-advert');

module.exports = {
  'plugin:name': pluginName,
  plugin: function(options, browsersync) {
    const displayName = options.name || pkg.name || os.hostname();
    const external = browsersync.options.get('urls').get('external');
    const scheme = browsersync.options.get('scheme');
    const port = browsersync.options.get('port');
    if (external) {
      if (scheme === 'https') {
        const redirector = http.createServer((req, res) => {
          res.writeHead(302, { Location: external });
          res.end();
        });

        portscanner.findAPortNotInUse(port + 1000, function(err, httpPort) {
          if (err) throw err;
          redirector.listen(httpPort);

          mDNSAdvertise(httpPort, displayName);
        });
      } else {
        mDNSAdvertise(port, displayName);
      }
      const logger = logAdvert.bind(null, displayName, browsersync);
      browsersync.emitter.on('service:running', logger);
    }
  }
};
