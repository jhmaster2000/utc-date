import UTCDateToDateString from './src/UTCDate/to/DateString.js';
import UTCDateToISOString from './src/UTCDate/to/ISOString.js';
import UTCDateToLocaleDateString from './src/UTCDate/to/LocaleDateString.js';
import UTCDateToLocaleString from './src/UTCDate/to/LocaleString.js';
import UTCDateToLocaleTimeString from './src/UTCDate/to/LocaleTimeString.js';
import UTCDateToTimeString from './src/UTCDate/to/TimeString.js';
import UTCDateToUTCString from './src/UTCDate/to/UTCString.js';
import UTCDateToString from './src/UTCDate/to/String.js';
import util from 'util';

class UTCDate extends Date {
    declare private __proto__: any;
    constructor();
    constructor(value: string | number);
    constructor(value: string | number | Date);
    constructor(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number);
    constructor(_arg?: string | number | Date, ..._rest: [number?, number?, number?, number?, number?, number?]) {
        if (!arguments.length) super();
        else super(...arguments as unknown as [any, number, number?, number?, number?, number?, number?]);
        delete this.__proto__.constructor.name;
    }

    override getTimezoneOffset (): 0 { return 0; }
    override toString          (): string { return UTCDateToString(this); }
    override toTimeString      (): string { return UTCDateToTimeString(this); }
    override toDateString      (): string { return UTCDateToDateString(this); }
    override toUTCString       (): string { return UTCDateToUTCString(this); }
    override toISOString       (): string { return UTCDateToISOString(this); }
    override toJSON            (): string { return UTCDateToISOString(this); }
    override toLocaleString    (...params: any[]): string { return UTCDateToLocaleString(this, ...params); }
    override toLocaleTimeString(...params: any[]): string { return UTCDateToLocaleTimeString(this, ...params); }
    override toLocaleDateString(...params: any[]): string { return UTCDateToLocaleDateString(this, ...params); }
 
    override getFullYear() { return this.getUTCFullYear(); }
    override getMonth() { return this.getUTCMonth(); }
    override getDate() { return this.getUTCDate(); }
    override getDay() { return this.getUTCDay(); }
    override getHours() { return this.getUTCHours(); }
    override getMinutes() { return this.getUTCMinutes(); }
    override getSeconds() { return this.getUTCSeconds(); }
    override getMilliseconds() { return this.getUTCMilliseconds(); }

    override setFullYear(...params: [number, number?, number?]) { return this.setUTCFullYear(...params); }
    override setMonth(...params: [number, number?]) { return this.setUTCMonth(...params); }
    override setDate(...params: [number]) { return this.setUTCDate(...params); }
    override setHours(...params: [number, number?, number?, number?]) { return this.setUTCHours(...params); }
    override setMinutes(...params: [number, number?, number?]) { return this.setUTCMinutes(...params); }
    override setSeconds(...params: [number, number?]) { return this.setUTCSeconds(...params); }
    override setMilliseconds(...params: [number]) { return this.setUTCMilliseconds(...params); }
}

/*const DateProxy = new Proxy(Date, {
    construct: (target: any, args: any[]) => {
        return new UTCDate(...args);
    }
});*/

//@ts-ignore
console.log(new UTCDate(undefined), new Date(undefined));
console.log(new UTCDate(), new Date());
console.log(UTCDate, Date);
console.log(new UTCDate instanceof UTCDate, new Date instanceof Date);
console.log(new UTCDate instanceof Date, new Date instanceof UTCDate);
console.log(
    util.inspect(new UTCDate, { showHidden: false, depth: null, showProxy: true }),
    util.inspect(new Date, { showHidden: false, depth: null, showProxy: true })
);
console.log(
    util.inspect(new UTCDate, { showHidden: true, depth: null, showProxy: true }),
    util.inspect(new Date, { showHidden: true, depth: null, showProxy: true })
);
console.log(
    util.inspect(UTCDate.prototype, { showHidden: false, depth: null, showProxy: true }),
    util.inspect(Date.prototype, { showHidden: false, depth: null, showProxy: true })
);
console.log(
    util.inspect(UTCDate.prototype, { showHidden: true, depth: null, showProxy: true }),
    util.inspect(Date.prototype, { showHidden: true, depth: null, showProxy: true })
);
