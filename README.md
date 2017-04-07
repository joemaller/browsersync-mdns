# Browsersync-mDNS
Advertise [Browsersync][] instances over mDNS (bonjour/zeroconf/avahi)

[![Build Status](https://travis-ci.org/joemaller/browsersync-mdns.svg?branch=master)](https://travis-ci.org/joemaller/browsersync-mdns) 
[![Coverage Status](https://coveralls.io/repos/github/joemaller/browsersync-mdns/badge.svg?branch=master)](https://coveralls.io/github/joemaller/browsersync-mdns?branch=master) 
[![npm](https://img.shields.io/npm/v/browsersync-mdns.svg)](https://www.npmjs.com/package/browsersync-mdns)
[![dependencies Status](https://david-dm.org/joemaller/browsersync-mdns/status.svg)](https://david-dm.org/joemaller/browsersync-mdns)
[![devDependencies Status](https://david-dm.org/joemaller/browsersync-mdns/dev-status.svg)](https://david-dm.org/joemaller/browsersync-mdns?type=dev)


## Installation

This is still pre-release, so install directly from GitHub:
```
npm install joemaller/browsersync-mdns
```

## Basic usage

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

## Options

In most cases, Browsersync-mDNS will advertise the current instance using the `name` value from **package.json**. 

To use a specific name instead, define the plugin using an object. 
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

## Related Plugins & Tools

For browsing mDNS/Bonjour services on Android and iOS, I've been using Tomoaki Takeda's (parKhang CyungCyung's?) [BonjourSearch][bs] app ([Android][bsa], [iOS][bsi]). It's a free, barebones app that does one simple thing really well. I haven't found a functional equivalent for Windows.

This project was partly inspired by stephenfri's [bs-console-qrcode][] project, which prints a QR code linking to the current Browsersync instance directly in the terminal (and browser console).

## Epilogue

[Bonjour][] / [ZeroConf][] / [mDNS][] / [multicast DNS][] / [Avahi][] / [DNS-SD][]... Can't we just pick one name?


[browsersync]: https://www.browsersync.io/
[plugin-docs]: https://www.browsersync.io/docs/options#option-plugins

[bs]: http://tbt.deci.jp/ios//2016/bonjour_search/
[bsa]: https://play.google.com/store/apps/details?id=jp.deci.tbt.andro.bonjoursearch
[bsi]: https://itunes.apple.com/us/app/bonjour-search-for-http-web-in-wi-fi/id1097517829?mt=8
[bs-console-qrcode]: https://github.com/stephenfri/bs-console-qrcode

[bonjour]: https://developer.apple.com/bonjour/
[zeroconf]: http://www.zeroconf.org/
[mdns]: https://en.wikipedia.org/wiki/Multicast_DNS
[multicast dns]: http://www.multicastdns.org/
[avahi]: http://www.avahi.org/
[dns-sd]: http://www.dns-sd.org/