import {
    testDate,
    testNativeDate,
    msoffset,
    roundTimestamp,
    compareCtorMethod,
    compareInstances,
    matchCtorMethod
} from './testerUtils.js';
import {
    NativeDate,
    UTCDate
} from '../load.js';
import util from 'util';
import assert from 'assert';
import {
    jest
} from '@jest/globals';

describe('instanceof tests:', function () {
    it('new Date() instanceof', function () {
        expect(compareInstances(new Date())).toBe('false true false true true true');
    });
    it('new UTCDate() instanceof', function () {
        expect(compareInstances(new UTCDate())).toBe('false true false true true true');
    });
    it('new NativeDate() instanceof', function () {
        expect(compareInstances(new NativeDate())).toBe('false true false true true true');
    });
});

describe('UTCDate vs NativeDate - constructor getter method tests:', function () {
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
        expect(matchCtorMethod('getFullYear', testNativeDate.getUTCFullYear()));
    });
    it('getMonth', function () {
        assert(matchCtorMethod('getMonth', testNativeDate.getUTCMonth()));
    });
    it('getDate', function () {
        assert(matchCtorMethod('getDate', testNativeDate.getUTCDate()));
    });
    it('getDay', function () {
        assert(matchCtorMethod('getDay', testNativeDate.getUTCDay()));
    });
    it('getHours', function () {
        assert(matchCtorMethod('getHours', testNativeDate.getUTCHours()));
    });
    it('getMinutes', function () {
        assert(matchCtorMethod('getMinutes', testNativeDate.getUTCMinutes()));
    });
    it('getSeconds', function () {
        assert(matchCtorMethod('getSeconds', testNativeDate.getUTCSeconds()));
    });
    it('getMilliseconds', function () {
        assert(matchCtorMethod('getMilliseconds', testNativeDate.getUTCMilliseconds(), true));
    });
    it('getTimezoneOffset', function () {
        expect(testDate.getTimezoneOffset()).toBe(0);
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
        assert(compareCtorMethod('toDateString') || !msoffset || !compareCtorMethod('toDateString'));
    });
    it('toTimeString', function () {
        assert(!compareCtorMethod('toTimeString') || !msoffset);
    });
    it('valueOf', function () {
        assert(compareCtorMethod('valueOf', true));
    });
    it(`[Symbol.toPrimitive]('default')`, function () {
        assert((testDate[Symbol.toPrimitive]('default') !== testNativeDate[Symbol.toPrimitive]('default')) || !msoffset);
    });
    it(`[Symbol.toPrimitive]('string')`, function () {
        assert((testDate[Symbol.toPrimitive]('string') !== testNativeDate[Symbol.toPrimitive]('string')) || !msoffset);
    });
    it(`[Symbol.toPrimitive]('number')`, function () {
        expect(roundTimestamp(testDate[Symbol.toPrimitive]('number'))).toBe(roundTimestamp(testNativeDate[Symbol.toPrimitive]('number')));
    });
});

describe('UTCDate vs NativeDate - datatype tests:', function () {
    it('Number()', function () {
        expect(roundTimestamp(Number(testDate))).toBeCloseTo(roundTimestamp(Number(testNativeDate)));
    });
    it('BigInt()', function () {
        expect(roundTimestamp(BigInt(testDate))).toBeCloseTo(roundTimestamp(BigInt(testNativeDate)));
    });
    it('parseInt()', function () {
        expect(parseInt(testDate)).toBe(NaN);
    });
    it('parseFloat()', function () {
        expect(parseFloat(testDate)).toBe(NaN);
    });
    it('String()', function () {
        assert((String(testDate) !== String(testNativeDate)) || !msoffset);
    });
    it('util.inspect()', function () {
        expect(util.inspect(testDate)).toBe(util.inspect(testNativeDate));
    });
});

describe('UTCDate vs NativeDate - misc tests:', function () {
    it('Date', function () {
        expect(Date).not.toBe(NativeDate);
    });
    it('Date()', function () {
        assert((Date() !== NativeDate()) || !msoffset);
    });
    it('new Date(x).toString()', function () {
        assert((new Date(162013481432).toString() !== new NativeDate(162013481432).toString()) || !msoffset);
    });
    it('Date.now()', function () {
        expect(roundTimestamp(Date.now())).toBeCloseTo(roundTimestamp(NativeDate.now()));
    });
    it('Date.UTC()', function () {
        expect(Date.UTC()).toBe(NaN);
    });
    it('Date.parse()', function () {
        expect(Date.parse()).toBe(NaN);
    });
    it('Date.UTC(x)', function () {
        expect(roundTimestamp(Date.UTC(1971, 1, 2, 20, 37, 9, 666))).toBeCloseTo(roundTimestamp(NativeDate.UTC(1971, 1, 2, 20, 37, 9, 666)));
    });
    it('Date.parse(x)', function () {
        assert((roundTimestamp(Date.parse('Tue May 04 2021 11:08:32')) !== roundTimestamp(NativeDate.parse('Tue May 04 2021 11:08:32'))) || !msoffset);
    });
    it('Date.parse(x) with TZ', function () {
        expect(roundTimestamp(Date.parse('Tue May 04 2021 11:08:32 UTC'))).toBeCloseTo(roundTimestamp(NativeDate.parse('Tue May 04 2021 11:08:32 UTC')));
    });
});

const tMonth = (() => {
    if (testDate.getUTCMonth() <= 9) return testDate.getUTCMonth() + 2;
    else return (testDate.getUTCMonth() + 2) - 12;
})();
const tDate = (() => {
    if (testDate.getUTCDate() <= 24) return testDate.getUTCDate() + 3;
    else return (testDate.getUTCDate() + 3) - 27;
})();
const tHours = testDate.getUTCHours() + 4;
const tMinutes = testDate.getUTCMinutes() + 5;
const tSeconds = testDate.getUTCSeconds() + 10;
const tMS = testDate.getUTCMilliseconds() + 1000;

describe('UTCDate vs NativeDate - constructor setter method tests:', function () {
    it('setFullYear', function () {
        expect(roundTimestamp(testDate.setFullYear(1986))).toBe(roundTimestamp(testNativeDate.setFullYear(1986)));
    });
    it('setMonth', function () {
        assert(roundTimestamp(testDate.setMonth(tMonth)) === roundTimestamp(testNativeDate.setMonth(tMonth)) || msoffset);
    });
    it('setDate', function () {
        assert(roundTimestamp(testDate.setDate(tDate)) === roundTimestamp(testNativeDate.setDate(tDate)) || msoffset);
    });
    it('setHours', function () {
        expect(roundTimestamp(testDate.setHours(tHours)) !== roundTimestamp(testNativeDate.setHours(tHours)) || !msoffset);
    });
    it('setMinutes', function () {
        expect(roundTimestamp(testDate.setMinutes(tMinutes)) !== roundTimestamp(testNativeDate.setMinutes(tMinutes)) || !msoffset);
    });
    it('setSeconds', function () {
        expect(roundTimestamp(testDate.setSeconds(tSeconds)) !== roundTimestamp(testNativeDate.setSeconds(tSeconds)) || !msoffset);
    });
    it('setMilliseconds', function () {
        expect(roundTimestamp(testDate.setMilliseconds(tMS)) !== roundTimestamp(testNativeDate.setMilliseconds(tMS)) || !msoffset);
    });
});
