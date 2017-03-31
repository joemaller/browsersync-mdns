const readPkgUp = require('read-pkg-up').sync;

const pkg = readPkgUp({ normalize: false }).pkg;
const mdns = require('mdns');
const chalk = require('chalk');
const pluginName = 'Browsersync mDNS';

module.exports = {
  'plugin:name': pluginName,
  plugin: function(options, browserSync) {

        // console.log('************');
        // console.log(process.cwd());
        // console.log(pkg);
        // console.log(boo);
        // console.log('options', options);
        // console.log('bs', bs);

        // console.log(require('./package.json'));
        // console.log('************');

        /// TODO: Merge options against pkg.json defaults

        // console.log('displayName', displayName);

    const displayName = options.name || pkg.name;
    browserSync.logger.info(
      '[' + chalk.blue('mDNS') + ']',
      'Advertising',
      chalk.cyan(displayName)
    );
    mdns.createAdvertisement(mdns.tcp('http'), browserSync.options.get('port'), {
      name: displayName
    });
  }
};
