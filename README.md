# browsersync-mdns
Advertise [Browsersync][] instances over mDNS (bonjour/zeroconf)

[![Build Status](https://travis-ci.org/joemaller/browsersync-mdns.svg?branch=master)](https://travis-ci.org/joemaller/browsersync-mdns) 
[![Coverage Status](https://coveralls.io/repos/github/joemaller/browsersync-mdns/badge.svg?branch=master)](https://coveralls.io/github/joemaller/browsersync-mdns?branch=master) 
[![npm](https://img.shields.io/npm/v/browsersync-mdns.svg)](https://www.npmjs.com/package/browsersync-mdns)
[![dependencies Status](https://david-dm.org/joemaller/browsersync-mdns/status.svg)](https://david-dm.org/joemaller/browsersync-mdns)
[![devDependencies Status](https://david-dm.org/joemaller/browsersync-mdns/dev-status.svg)](https://david-dm.org/joemaller/browsersync-mdns?type=dev)


### Installation

This is still pre-release, so install directly from GitHub:
```
npm install joemaller/browsersync-mdns
```

### Basic usage

#### Code

Add Browsersync-mDNS to the Browsersync init block's plugins array and the instance will be advertised when Browsersync starts up. 
```
browserSync.init({
  plugins: ['browsersync-mdns']
});
```

#### Command Line

Include `--plugins browsersync-mdns` in your browsersync command:
```
browser-sync start -s app --plugins browsersync-mdns
```

Note that both Browsersync and this plugin will need to be installed globally.

### Options

In most cases, Browsersync-mDNS will advertise the instance using the `name` value from **package.json**. 

To set a specific name, define the plugin using an object. 
```
browserSync.init({
  plugins: [{
    module: 'browsersync-mdns',
    options: {
      name: 'Local Dev Site'
    }
  }]
});
```
See the [Browsersync plugins documentation][plugin-docs] for other plugin configuration examples.


If `options.name` isn't defined and a **package.json** file can't be found, the hostname will be used as a fallback. 



[browsersync]: https://www.browsersync.io/
[plugin-docs]: https://www.browsersync.io/docs/options#option-plugins
