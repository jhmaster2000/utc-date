import UTCDateToString from './UTCDate/toString.js';
import UTCDateToDateString from './UTCDate/toDateString.js';
import UTCDateToTimeString from './UTCDate/toTimeString.js';
import UTCDateToLocaleDateString from './UTCDate/toLocaleDateString.js';
import UTCDateToLocaleString from './UTCDate/toLocaleString.js';
import UTCDateToLocaleTimeString from './UTCDate/toLocaleTimeString.js';
import UTCDateParse from './UTCDate/Parse.js';

export const UTCDateSymbol = Symbol('UTCDate');

const DateProxy = new Proxy(Date, {
    get(DateCtor: DateConstructor, prop: keyof DateConstructor) {
        if (<unknown>prop === UTCDateSymbol) return true;
        if (prop === 'toString' as keyof DateConstructor) return ProxyFn(DateCtor.toString, { apply: () => DateCtor.toString() });
        if (prop === 'parse' as keyof DateConstructor) return ProxyFn(DateCtor.parse, { apply: (_, __, args) => UTCDateParse(args, DateCtor) });
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
                else return date[prop];
            },
        });
    }
});
// the .prototype property cannot be proxied, so polluting the prototype is the only way to do this for now.
// doesn't really matter since the only side effect would be the original Date object's prototype being polluted,
// but the entire original Date object will be overriden by the DateProxy object anyway.
DateProxy.prototype.constructor = DateProxy;

const TableEntry = TableEntryFactory('Date', 'DateProxy');
comparisonTable(new Date(), new DateProxy(), TableEntry, false);
comparisonTable(new Date(), new DateProxy(), TableEntry, true);

///=================================================================================================================///

type AnyFunction = (...args: any[]) => any;
function bindFn<T extends AnyFunction, R = ReturnType<T>>(fn: T, bindTo: any, thisArg?: any, ...args: any[]): (...args: Parameters<T>) => R {
    const bound = fn.bind(bindTo, ...[...arguments].slice(2));
    Object.defineProperty(bound, 'name', { value: bound.name.replace(/^bound /, ''), configurable: true });
    Object.defineProperty(bound, 'toString', { value: bound.toString.bind(fn), writable: true, configurable: true });
    Object.defineProperty(bound.toString, 'name', { value: bound.toString.name.replace(/^bound /, ''), configurable: true });
    return bound;
}

interface ProxyFnHandler<T extends AnyFunction> extends ProxyHandler<T> {
    apply?(target: T, thisArg: any, argArray: Parameters<T>): any;
}
function ProxyFn<T extends AnyFunction>(fn: T, hooks: Omit<ProxyFnHandler<T>, 'get'> = {}): T {
    return new Proxy(fn, {
        get(fn: T, prop: keyof Function) {
            if (prop === 'toString') return bindFn(Function.prototype.toString, fn);
            else return fn[prop];
        }, ...hooks
    });
}

///=================================================================================================================///

function comparisonTable(A: any, B: any, tableEntry: TableEntryFn = TableEntryFactory('A', 'B'), presetEntries = {} as Record<string, object> | boolean, equalOverrides = {} as Record<string, any>) {
    let callFns = false;
    if (typeof presetEntries === 'boolean') {
        callFns = presetEntries;
        presetEntries = {};
    }
    const entries: Record<string, object> = { '* SELF': tableEntry(A, B, (A === B) || 'PROXY'), ...presetEntries };
    const allKeysA = getAllKeys(A);
    const allKeysB = getAllKeys(B);
    entries['* ALLKEYS'] = tableEntry('* ALLKEYS_A', '* ALLKEYS_B', arrayEqual(allKeysA, allKeysB));
    if (!callFns) allKeysA.forEach((key: string | symbol) => entries[String(key)] = tableEntry(tryString(A[key as keyof typeof A]), tryString(B[key as keyof typeof B])));
    else allKeysA.forEach((key: string | symbol) => {
        try {
            const _a = A.constructor.name === 'Date' ? new Date() : Function.constructor === A.constructor ? A : new A.constructor();
            const _b = Function.constructor === B.constructor ? B : new B.constructor();
            entries[String(key)] = tableEntry(
                typeof _a[key as keyof typeof A] === 'function' ? _a[key as keyof typeof A].bind(_a)() : A[key as keyof typeof A],
                typeof _b[key as keyof typeof B] === 'function' ? _b[key as keyof typeof B].bind(_b)() : B[key as keyof typeof B]
            );
        } catch (e: any) {
            const err: Error = e;
            console.error(key, err.message);
            entries[String(key)] = tableEntry(`! ${err.name}`, `! ${err.name}`, 'ERROR');
        }
    });
    for (const [key, override] of Object.entries(equalOverrides)) {
        if (!Object.keys(entries).includes(key)) continue;
        (<any>entries[key]).Equal = override;
    }
    console.table(entries);
}

type TableEntryFn = (a: any, b: any, equalOverride?: any) => ({ [label: string]: any; Equal: any | boolean; });
function TableEntryFactory<A extends string, B extends string>(labelA: A, labelB: B) {
    return (a: any, b: any, equalOverride?: any) => ({ [labelA]: a, [labelB]: b, Equal: equalOverride ?? ((Number.isNaN(a) && Number.isNaN(b)) || (a === b)) });
}

function getAllKeys<T>(obj: T, strict = true): (string | symbol)[] {
    const strictBannedKeys = ['caller', 'callee', 'arguments'];
    let keys: (string | symbol)[] = [];
    do {
        for (const key of [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)]) {
            if (!keys.includes(key)) {
                if (!strict) keys.push(key);
                else if (!strictBannedKeys.includes(<string>key)) keys.push(key);
            }
        };
    } while (obj = Object.getPrototypeOf(obj));
    return keys.sort(a => typeof a === 'symbol' ? 1 : -1);
}

function arrayEqual(a: any[], b: any[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
}

function tryString(obj: any): string {
    try {
        return String(obj);
    } catch (e: any) {
        return `! STRINGFAIL: ${e.name}`;
    }
}

        /*const UTCDateInternals = {};
        UTCDateInternals.UTCOffsets = {
            ms: (this.getTimezoneOffset() * 60000),
            secs: (this.getTimezoneOffset() * 60),
            mins: this.getTimezoneOffset(),
            hours: (this.getTimezoneOffset() / 60)
        }
        UTCDateInternals.UTCTimezone = UTCDateCalculateTZ(UTCDateInternals.UTCOffsets);*/

export default DateProxy;
