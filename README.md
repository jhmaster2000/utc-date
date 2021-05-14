# utc-date

[![GitHub package.json version](https://img.shields.io/github/package-json/v/jhmaster2000/utc-date)][github-url]
[![npm package](https://img.shields.io/npm/v/utc-date?color=darkred&label=latest%20npm%20release)][npm-url]
[![npm downloads](https://img.shields.io/npm/dw/utc-date)][npm-url]
[![license](https://img.shields.io/npm/l/utc-date)][github-url]
[![node-current](https://img.shields.io/node/v/utc-date)][npm-url]
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/jhmaster2000/utc-date)][github-url]
[![Build Status](https://travis-ci.com/jhmaster2000/utc-date.svg?branch=master)](https://travis-ci.com/jhmaster2000/utc-date)
[![Coverage Status](https://coveralls.io/repos/github/jhmaster2000/utc-date/badge.svg?branch=master)](https://coveralls.io/github/jhmaster2000/utc-date?branch=master)

Experimental Date object overwrite for always using UTC dates by default.

**Tested on:**
- Windows = Node.js 12.x, 13.x, 14.x, 15.x and 16.x with ESM
- Linux = Node.js 12.x and 14.x with ESM

> **Guaranteed to NOT work on Node.js 11.x and lower, this won't be fixed.**

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

### Using without overwriting the native Date object
If for some reason you prefer to use the `UTCDate` class directly instead of overwriting the native `Date`, you can simply revert the overwrite after importing by using the code below:
```js
import { NativeDate, UTCDate } from 'utc-date'
Date = NativeDate
```
- Both `Date` and `NativeDate` will now be accessible as the native `Date` object.
- The **utc-date** object will now be accessible through `UTCDate` with the same syntax used on the normal `Date` object.
- You can import and use `UTCDate` without reverting `Date` back to native, but there isn't really a point in doing so.

### Small Caveats
Due to being unable to put the overwritten `Date` functions in the prototype due it also propagating to the `NativeDate` object (maybe there is a way to do it without this happening, but I couldn't figure it out myself), all the overwritten `Date` functions will show up when you print the raw `Date` object directly or util.inspect() it, instead of just showing the ISO string.

The ISO string is also lost from the raw object, even the `NativeDate` one, which prints just a visually empty object instead: `{}`

However these shouldn't be too big of an issue since you are never meant to interact directly with the `Date` object in this way on your code, if these do represent an issue to you or you know a way to fix these without worse side-effects, please do let me know.

[github-url]:https://github.com/jhmaster2000/utc-date
[npm-url]:https://www.npmjs.com/package/utc-date