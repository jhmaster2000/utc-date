# utc-date

[![GitHub package.json version](https://img.shields.io/github/package-json/v/jhmaster2000/utc-date)](#)
[![npm Release](https://img.shields.io/npm/v/utc-date?color=darkred&label=latest%20npm%20release)](https://www.npmjs.com/package/utc-date)
[![npm Downloads](https://img.shields.io/npm/dw/utc-date)](https://www.npmjs.com/package/utc-date)
[![License](https://img.shields.io/npm/l/utc-date)](#)
[![Build Status](https://travis-ci.com/jhmaster2000/utc-date.svg?branch=master)](https://travis-ci.com/jhmaster2000/utc-date)
[![node-current](https://img.shields.io/node/v/utc-date)](#)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/jhmaster2000/utc-date)](https://github.com/jhmaster2000/utc-date)

Experimental Date object overwrite for always using UTC dates by default.

**Tested on:**
- Windows = Node.js 12.x, 13.x, 14.x, 15.x and 16.x with ESM
- Linux = Node.js 12.x and 14.x with ESM

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
import 'utc-date'
```
This must be placed as early as possible, prior to even other imports to ensure full **utc-date** usage even within other imports.

All `Date` instances from here on will now be using **utc-date**. This includes sub-files and modules.

### Getting the native Date object
If for some reason while using **utc-date** you require using the native Date object, you can import a clone of it from **utc-date** with:
```js
import { NativeDate } from 'utc-date'
```
Keep in mind that unlike the `Date` overwrite, this is not global and `NativeDate` will only be accessible on the file it's imported on.

### Small Caveats
Due to being unable to put the overwritten `Date` functions in the prototype due it also propagating to the `NativeDate` object (maybe there is a way to do it without this happening, but I couldn't figure it out myself), all the overwritten `Date` functions will show up when you print the raw `Date` object directly or util.inspect() it, instead of just showing the ISO string.

The ISO string is also lost from the raw object, even the `NativeDate` one, which prints just a visually empty object instead: `{}`

However these shouldn't be too big of an issue since you are never meant to interact directly with the `Date` object in this way on your code, if these do represent an issue to you or you know a way to fix these without worse side-effects, please do let me know.
