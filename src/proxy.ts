import UTCDateParse from './UTCDate/Parse.js';
import UTCDateToString from './UTCDate/toString.js';
import UTCDateToDateString from './UTCDate/toDateString.js';
import UTCDateToTimeString from './UTCDate/toTimeString.js';
import UTCDateToLocaleString from './UTCDate/toLocaleString.js';
import UTCDateToLocaleDateString from './UTCDate/toLocaleDateString.js';
import UTCDateToLocaleTimeString from './UTCDate/toLocaleTimeString.js';
import { comparisonTable, TableEntryFactory } from './comparisonTable.js';
import { ProxyFn } from './utils/ProxyFn.js';
import { bindFn } from './utils/bindFn.js';

export const UTCDateSymbol = Symbol('UTCDate');
export const NativeDateSymbol = Symbol('NativeDate');

const DateProxy = new Proxy(Date, {
    get(DateCtor: DateConstructor, prop: keyof DateConstructor) {
        if (prop === 'toString' as keyof DateConstructor) return ProxyFn(DateCtor.toString, { apply: () => DateCtor.toString() });
        if (prop === 'parse' as keyof DateConstructor) return ProxyFn(DateCtor.parse, { apply: (_, __, args) => UTCDateParse(args, DateCtor) });
        if (<unknown>prop === UTCDateSymbol) return true;
        if (<unknown>prop === NativeDateSymbol) return DateCtor;
        else return DateCtor[prop];
    },
    apply(DateCtor: DateConstructor): string {
        return UTCDateToString(new DateCtor());
    },
    construct(DateCtor: DateConstructor, args: ConstructorParameters<DateConstructor>): Date {
        return new Proxy(new DateCtor(...args), {
            get(date: Date, prop: keyof Date) {
                switch (prop) {
                    case 'getTimezoneOffset':  return ProxyFn(date[prop], { apply: () => 0 as const });
                    case 'getFullYear':        return ProxyFn(date[prop], { apply: () => date.getUTCFullYear() });
                    case 'getMonth':           return ProxyFn(date[prop], { apply: () => date.getUTCMonth() });
                    case 'getDate':            return ProxyFn(date[prop], { apply: () => date.getUTCDate() });
                    case 'getDay':             return ProxyFn(date[prop], { apply: () => date.getUTCDay() });
                    case 'getHours':           return ProxyFn(date[prop], { apply: () => date.getUTCHours() });
                    case 'getMinutes':         return ProxyFn(date[prop], { apply: () => date.getUTCMinutes() });
                    case 'getSeconds':         return ProxyFn(date[prop], { apply: () => date.getUTCSeconds() });
                    case 'getMilliseconds':    return ProxyFn(date[prop], { apply: () => date.getUTCMilliseconds() });
                    case 'setFullYear':        return ProxyFn(date[prop], { apply: (_, __, args) => date.setUTCFullYear(...args) });
                    case 'setMonth':           return ProxyFn(date[prop], { apply: (_, __, args) => date.setUTCMonth(...args) });
                    case 'setDate':            return ProxyFn(date[prop], { apply: (_, __, args) => date.setUTCDate(...args) });
                    case 'setHours':           return ProxyFn(date[prop], { apply: (_, __, args) => date.setUTCHours(...args) });
                    case 'setMinutes':         return ProxyFn(date[prop], { apply: (_, __, args) => date.setUTCMinutes(...args) });
                    case 'setSeconds':         return ProxyFn(date[prop], { apply: (_, __, args) => date.setUTCSeconds(...args) });
                    case 'setMilliseconds':    return ProxyFn(date[prop], { apply: (_, __, args) => date.setUTCMilliseconds(...args) });
                    case 'toString':           return ProxyFn(date[prop], { apply: (_, thiz) => UTCDateToString(thiz) });
                    case 'toTimeString':       return ProxyFn(date[prop], { apply: (_, thiz) => UTCDateToTimeString(thiz) });
                    case 'toDateString':       return ProxyFn(date[prop], { apply: (_, thiz) => UTCDateToDateString(thiz) });
                    case 'toLocaleString':     return ProxyFn(date[prop], { apply: (_, thiz, args) => UTCDateToLocaleString(thiz, args, DateCtor) });
                    case 'toLocaleTimeString': return ProxyFn(date[prop], { apply: (_, thiz, args) => UTCDateToLocaleTimeString(thiz, args, DateCtor) });
                    case 'toLocaleDateString': return ProxyFn(date[prop], { apply: (_, thiz, args) => UTCDateToLocaleDateString(thiz, args, DateCtor) });
                }
                if (typeof date[prop] === 'function' && prop !== 'constructor' as any) return bindFn(date[prop], date);
                if (<unknown>prop === UTCDateSymbol) return true;
                else return date[prop];
            },
        });
    }
});

const TableEntry = TableEntryFactory('Date', 'DateProxy');
//comparisonTable(new Date(), new DateProxy(), TableEntry, false);
//comparisonTable(new Date(), new DateProxy(), TableEntry, true);

export default DateProxy;
