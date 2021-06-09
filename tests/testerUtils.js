import { NativeDate, UTCDate } from '../load.js';

const testDate = new Date();
const testNativeDate = new NativeDate(testDate.valueOf());
const msoffset = new NativeDate().getTimezoneOffset();
console.info('Detected TZ offset in minutes: ' + msoffset);

function roundTimestamp(stamp) { return Math.round(Number(stamp) / 100); }

function compareCtorMethod(method, roundStamp) {
    if (roundStamp) return roundTimestamp(testDate[method]()) === roundTimestamp(testNativeDate[method]());
    return testDate[method]() === testNativeDate[method]();
}
function matchCtorMethod(method, target, roundStamp) {
    if (roundStamp) return roundTimestamp(testDate[method]()) === roundTimestamp(target);
    return testDate[method]() === target;
}

function compareInstances(thing) {
    let func = thing instanceof Function
    let objc = thing instanceof Object
    let strg = thing instanceof String
    let date = thing instanceof Date
    let natd = thing instanceof NativeDate
    let utcd = thing instanceof UTCDate
    return func + ' ' + objc + ' ' + strg + ' ' + date + ' ' + natd + ' ' + utcd;
}

export { testDate, testNativeDate, msoffset, roundTimestamp, compareCtorMethod, compareInstances, matchCtorMethod }