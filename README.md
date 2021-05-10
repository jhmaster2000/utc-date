# utc-date
Experimental Date object overwrite for always using UTC dates by default.

**Tested on:** Node.js 14.x with ESM

## Why?
On MacOS and Linux, if you wanted to achieve this, all you need to do is set `process.env.TZ` to `Etc/GMT`, however Windows does not respect this, forcing you to either change your entire system's timezone with a package like `set-tz`, which personally I found vastly inconvenient when trying to selfhost apps on my personal computer, or overwritting the entire `Date` object to force it to output only UTC values, which is what this package does for you.

**This package does work on MacOS and Linux, but it is only truly needed on Windows.*

#### Ok but this code is terrible!
Feel free to improve it and make a PR. Bug reports are always welcome too.

> [**Updates Changelog**](/CHANGELOG.md)

## Installing
```
npm i jhmaster2000/utc-date
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

### Small Caveat
Due to being unable to put the overwritten `Date` functions in the prototype due it also propagating to the `NativeDate` object (maybe there is a way to do it without this happening, but I couldn't figure it out myself), all the overwritten `Date` functions will show up when you print the raw `Date` object directly or util.inspect() it, instead of just showing the ISO string.

However this shouldn't be too big of an issue since you are never meant to interact directly with the `Date` object in this way on your code, if it does present itself as an issue to you or you know a way to fix this without worse side-effects, please do let me know.
