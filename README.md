UTC Date
========

[![GitHub version][github-image]][github-url]
[![downloads][downloads-image]][npm-url]
[![license][license-image]][license-url]
[![GitHub code size in bytes][size-image]][github-url]

[![npm release][npm-image]][npm-url]
[![node-current][node-image]][node-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

Experimental `Date` object overwrite for always using UTC dates by default.

**Tested on:**
- Windows = Node.js 12.x, 14.x, and 16.x with ESM
- Linux = Node.js 12.x and 14.x with ESM

> **Guaranteed to NOT work on Node.js 11.x and lower, this won't be fixed.**

> **Guaranteed to NOT work with CommonJS aka require(), this won't be fixed either.**

## Why?
On MacOS and Linux, if you wanted to achieve this, all you need to do is set `process.env.TZ` to `Etc/GMT`, however Windows does not respect this, forcing you to either change your entire system's timezone with a package like `set-tz`, which personally I found vastly inconvenient when trying to selfhost apps on my personal computer, or overwritting the entire `Date` object to force it to output only UTC values, which is what this package does for you.

**This package probably does work on MacOS (untested) and Linux, but it is only truly needed on Windows.*

#### Ok but this code is terrible!
Feel free to improve it and make a PR. Bug reports are always welcome too.

> [**Updates Changelog**](https://github.com/jhmaster2000/utc-date/blob/master/CHANGELOG.md)

## Installing
```
npm i utc-date --save
```

## Usage
On your main file:
```js
import 'utc-date';
```
This must be placed as early as possible, prior to even other imports to ensure full **utc-date** usage even within other imports.

All `Date` instances from here on will now be using **utc-date**. This includes sub-files and modules. Does **NOT** include `Date` instances created *before* `utc-date` is loaded.

### Getting the native Date object
If for some reason while using **utc-date** you require using the native Date object, you can import a clone of it from **utc-date** with:
```js
import { NativeDate } from 'utc-date'
```
Keep in mind that unlike the `Date` overwrite, this is not global and `NativeDate` will only be accessible on the file it's imported on.

### Settings
**utc-date** supports a few customization settings through the use of ENV variables:
Setting | Description
-|-
`UTCDATE_NO_OVERWRITE` | When set to any value, does not automatically overwrite the `Date` object with the `UTCDate` one. *(Defaults to overwriting if not set)*
`UTCDATE_PATCH_CONSOLE`| When set to any value, will patch the console methods to make the logged UTC dates match what you expect from logging the native `Date` object. *(Defaults to not patching when not set)*
`UTCDATE_PATCH_INSPECT`| When set to any value, will patch the `util.inspect` method to make the returned values for dates from **utc-date** match the return values of native dates. *(Defaults to not patching when not set)*

> Remember to keep in mind load order of `import`s when using these options, making sure the ENV variables are loaded into `process.env` before **utc-date** is imported.

### Incompatibility
Due to the nature of this package, it is naturally incompatible with any other package or local code that also overwrites/modifies the native `Date` object. Extending the `Date` object is fine as long as it's done *after* **utc-date** is loaded.

[github-url]:https://github.com/jhmaster2000/utc-date
[github-image]:https://img.shields.io/github/package-json/v/jhmaster2000/utc-date.svg
[license-url]:https://github.com/jhmaster2000/utc-date/blob/master/LICENSE.md
[license-image]:https://img.shields.io/npm/l/utc-date.svg
[npm-url]:http://npmjs.org/package/utc-date
[npm-image]:https://img.shields.io/npm/v/utc-date.svg?color=darkred&label=npm%20release
[downloads-image]:https://img.shields.io/npm/dt/utc-date.svg
[node-url]:https://nodejs.org/en/download
[node-image]:https://img.shields.io/node/v/utc-date.svg
[size-image]:https://img.shields.io/github/languages/code-size/jhmaster2000/utc-date.svg
[travis-url]:https://travis-ci.com/jhmaster2000/utc-date
[travis-image]:https://img.shields.io/travis/com/jhmaster2000/utc-date.svg
[coveralls-url]:https://coveralls.io/github/jhmaster2000/utc-date?branch=master
[coveralls-image]:https://coveralls.io/repos/github/jhmaster2000/utc-date/badge.svg?branch=master
