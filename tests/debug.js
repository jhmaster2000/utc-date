import util from 'util';
import { NativeDate, UTCDate } from '../load.js';

function compareCtorMethod(method) {
    return console.log(`${method}: ${new Date()[method]()} vs ${new NativeDate()[method]()}`);
}
function compareMethod(method) {
    return console.log(`.${method}: ${Date[method]()} vs ${NativeDate[method]()}`);
}
function compareInstances(thing) {
    let func = thing instanceof Function
    let objc = thing instanceof Object
    let strg = thing instanceof String
    let date = thing instanceof Date
    let natd = thing instanceof NativeDate
    let utcd = thing instanceof UTCDate
    console.log('instanceof\'s:', func, objc, strg, date, natd, utcd);
}

compareInstances(new Date());
compareInstances(new UTCDate());
compareInstances(new NativeDate());
console.log('========[UTCDate vs NativeDate]========');
console.log('Method: UTCDate vs NativeDate\n');
compareCtorMethod('getUTCFullYear');
compareCtorMethod('getUTCMonth');
compareCtorMethod('getUTCDate');
compareCtorMethod('getUTCDay');
compareCtorMethod('getUTCHours');
compareCtorMethod('getUTCMinutes');
compareCtorMethod('getUTCSeconds');
compareCtorMethod('getUTCMilliseconds');
compareCtorMethod('getFullYear');
compareCtorMethod('getMonth');
compareCtorMethod('getDate');
compareCtorMethod('getDay');
compareCtorMethod('getHours');
compareCtorMethod('getMinutes');
compareCtorMethod('getSeconds');
compareCtorMethod('getMilliseconds');
compareCtorMethod('getTimezoneOffset');
compareCtorMethod('getTime');
compareCtorMethod('toISOString');
compareCtorMethod('toUTCString');
compareCtorMethod('toJSON');
compareCtorMethod('toString');
compareCtorMethod('toLocaleString');
compareCtorMethod('toLocaleDateString');
compareCtorMethod('toLocaleTimeString');
compareCtorMethod('toDateString');
compareCtorMethod('toTimeString');
compareCtorMethod('valueOf');
console.log('Number():', Number(new Date()), 'vs', Number(new NativeDate()));
console.log('BigInt():', BigInt(new Date()), 'vs', BigInt(new NativeDate()));
console.log('parseInt():', parseInt(new Date()), 'vs', parseInt(new NativeDate()));
console.log('parseFloat():', parseFloat(new Date()), 'vs', parseFloat(new NativeDate()));
console.log('String():', String(new Date()), 'vs', String(new NativeDate()));
console.log('Array():', Array(new Date()), 'vs', Array(new NativeDate()));
console.log('Object():', Object(new Date()), 'vs', Object(new NativeDate()));
console.log('util.inspect():', util.inspect(Date), 'vs', util.inspect(NativeDate));
console.log('util.inspect():', util.inspect(Date()), 'vs', util.inspect(NativeDate()));
console.log('util.inspect():', util.inspect(new Date()), 'vs', util.inspect(new NativeDate()));
console.log('util.inspect():', util.inspect(Date.toString()), 'vs', util.inspect(NativeDate.toString()));
console.log('Date:', Date, 'vs', NativeDate);
console.log('Date():', Date(), 'vs', NativeDate());
console.log('new Date:', new Date, 'vs', new NativeDate);
console.log('new Date():', new Date(), 'vs', new NativeDate());
console.log('new Date(x):', new Date(162013481432).toString(), 'vs', new NativeDate(162013481432).toString());
compareMethod('now');
compareMethod('UTC');
compareMethod('parse');
console.log('.UTC(x):', Date.UTC(1971, 1, 2, 20, 37, 9, 666), 'vs', NativeDate.UTC(1971, 1, 2, 20, 37, 9, 666));
console.log('.parse(x):', Date.parse('Tue May 04 2021 11:08:32'), 'vs', NativeDate.parse('Tue May 04 2021 11:08:32'));
console.log(`[Symbol.toPrimitive]('string'):`, new Date(1590757517834)[Symbol.toPrimitive]('string'), 'vs', new NativeDate(1590757517834)[Symbol.toPrimitive]('string'));
console.log(`[Symbol.toPrimitive]('number'):`, new Date(1590757517834)[Symbol.toPrimitive]('number'), 'vs', new NativeDate(1590757517834)[Symbol.toPrimitive]('number'));
console.log(`[Symbol.toPrimitive]('default'):`, new Date(1590757517834)[Symbol.toPrimitive]('default'), 'vs', new NativeDate(1590757517834)[Symbol.toPrimitive]('default'));
