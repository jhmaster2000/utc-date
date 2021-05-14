import util from 'util';
import {
    NativeDate,
    UTCDate
} from '../load.js';
import assert from 'assert';
import { jest } from '@jest/globals';

let t_msoffset = Date.parse(Date()) - NativeDate.parse(NativeDate());
const msoffset = Math.round(Math.abs(t_msoffset) / 10);

const testDate = new Date();
const testNativeDate = new NativeDate(testDate.valueOf());

function compareCtorMethod(method, roundStamp) {
    if (roundStamp) return roundTimestamp(testDate[method]()) === roundTimestamp(testNativeDate[method]());
    return testDate[method]() === testNativeDate[method]();
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
function roundTimestamp(stamp) {
    return Math.round(Number(stamp) / 100);
}

describe('instanceof tests:', function () {
    it('new Date() instanceof', function () {
        assert(compareInstances(new Date()) === 'false true false true true true');
    });
    it('new UTCDate() instanceof', function () {
        assert(compareInstances(new UTCDate()) === 'false true false true true true');
    });
    it('new NativeDate() instanceof', function () {
        assert(compareInstances(new NativeDate()) === 'false true false true true true');
    });
});

describe('UTCDate vs NativeDate - constructor method tests:', function () {
    it('getUTCFullYear', function () {
        assert(compareCtorMethod('getUTCFullYear'));
    });
    it('getUTCMonth', function () {
        assert(compareCtorMethod('getUTCMonth'));
    });
    it('getUTCDate', function () {
        assert(compareCtorMethod('getUTCDate'));
    });
    it('getUTCDay', function () {
        assert(compareCtorMethod('getUTCDay'));
    });
    it('getUTCHours', function () {
        assert(compareCtorMethod('getUTCHours'));
    });
    it('getUTCMinutes', function () {
        assert(compareCtorMethod('getUTCMinutes'));
    });
    it('getUTCSeconds', function () {
        assert(compareCtorMethod('getUTCSeconds'));
    });
    it('getUTCMilliseconds', function () {
        assert(compareCtorMethod('getUTCMilliseconds', true));
    });
    it('getFullYear', function () {
        assert(compareCtorMethod('getFullYear') || !msoffset);
    });
    it('getMonth', function () {
        assert(compareCtorMethod('getMonth') || !msoffset);
    });
    it('getDate', function () {
        assert(compareCtorMethod('getDate') || !msoffset);
    });
    it('getDay', function () {
        assert(compareCtorMethod('getDay') || !msoffset);
    });
    it('getHours', function () {
        assert(!compareCtorMethod('getHours') || !msoffset);
    });
    it('getMinutes', function () {
        assert(!compareCtorMethod('getMinutes') || !msoffset);
    });
    it('getSeconds', function () {
        assert(compareCtorMethod('getSeconds') || !msoffset);
    });
    it('getMilliseconds', function () {
        assert(compareCtorMethod('getMilliseconds', true) || !msoffset);
    });
    it('getTimezoneOffset', function () {
        assert(!compareCtorMethod('getTimezoneOffset') || !msoffset);
    });
    it('getTime', function () {
        assert(compareCtorMethod('getTime', true));
    });
    it('toISOString', function () {
        assert(compareCtorMethod('toISOString'));
    });
    it('toUTCString', function () {
        assert(compareCtorMethod('toUTCString'));
    });
    it('toJSON', function () {
        assert(compareCtorMethod('toJSON'));
    });
    it('toString', function () {
        assert(!compareCtorMethod('toString') || !msoffset);
    });
    it('toLocaleString', function () {
        assert(!compareCtorMethod('toLocaleString') || !msoffset);
    });
    it('toLocaleDateString', function () {
        assert(!compareCtorMethod('toLocaleDateString') || !msoffset);
    });
    it('toLocaleTimeString', function () {
        assert(!compareCtorMethod('toLocaleTimeString') || !msoffset);
    });
    it('toDateString', function () {
        assert(compareCtorMethod('toDateString') || !msoffset);
    });
    it('toTimeString', function () {
        assert(!compareCtorMethod('toTimeString') || !msoffset);
    });
    it('valueOf', function () {
        assert(compareCtorMethod('valueOf', true));
    });
    it('[Symbol.toPrimitive](\'string\')', function () {
        assert((testDate[Symbol.toPrimitive]('string') !== testNativeDate[Symbol.toPrimitive]('string')) || !msoffset);
    });
    it('[Symbol.toPrimitive](\'number\')', function () {
        assert(roundTimestamp(testDate[Symbol.toPrimitive]('number')) === roundTimestamp(testNativeDate[Symbol.toPrimitive]('number')));
    });
    it('[Symbol.toPrimitive](\'default\')', function () {
        assert((testDate[Symbol.toPrimitive]('default') !== testNativeDate[Symbol.toPrimitive]('default')) || !msoffset);
    });
});

describe('UTCDate vs NativeDate - datatype tests:', function () {
    it('Number()', function () {
        assert(roundTimestamp(Number(testDate)) === roundTimestamp(Number(testNativeDate)));
    });
    it('BigInt()', function () {
        assert(roundTimestamp(BigInt(testDate)) === roundTimestamp(BigInt(testNativeDate)));
    });
    it('parseInt()', function () {
        assert(isNaN(parseInt(testDate)) === isNaN(parseInt(testNativeDate)));
    });
    it('parseFloat()', function () {
        assert(isNaN(parseFloat(testDate)) === isNaN(parseFloat(testNativeDate)));
    });
    it('String()', function () {
        assert((String(testDate) !== String(testNativeDate)) || !msoffset);
    });
    it('util.inspect()', function () {
        assert(util.inspect(testDate) !== util.inspect(testNativeDate));
    });
});

describe('UTCDate vs NativeDate - misc tests:', function () {
    it('Date', function () {
        assert(Date !== NativeDate);
    });
    it('Date()', function () {
        assert((Date() !== NativeDate()) || !msoffset);
    });
    it('new Date(x).toString()', function () {
        assert((new Date(162013481432).toString() !== new NativeDate(162013481432).toString()) || !msoffset);
    });
    it('Date.now()', function () {
        assert(roundTimestamp(Date.now()) === roundTimestamp(NativeDate.now()));
    });
    it('Date.UTC()', function () {
        assert(isNaN(Date.UTC()) === isNaN(NativeDate.UTC()));
    });
    it('Date.parse()', function () {
        assert(isNaN(Date.parse()) === isNaN(NativeDate.parse()));
    });
    it('Date.UTC(x)', function () {
        assert(roundTimestamp(Date.UTC(1971, 1, 2, 20, 37, 9, 666)) === roundTimestamp(NativeDate.UTC(1971, 1, 2, 20, 37, 9, 666)));
    });
    it('Date.parse(x)', function () {
        assert((roundTimestamp(Date.parse('Tue May 04 2021 11:08:32')) !== roundTimestamp(NativeDate.parse('Tue May 04 2021 11:08:32'))) || !msoffset);
    });
});

//describe('extra tests:', function () {

//});