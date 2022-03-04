import { UTCDate, NativeDate } from './src/UTCDate/Class.js';
import UTCDateParse from './src/UTCDate/Parse.js';
import patchConsole from './src/UTCDate/Console.js';
import { patchInspect } from './src/utils/console/inspect.js';
if (process.env.UTCDATE_PATCH_INSPECT) patchInspect();
if (process.env.UTCDATE_PATCH_CONSOLE) patchConsole();

function UTCDateCaller(this: any, ...ctorParams: [any]) {
    if (this === undefined) return new UTCDate().toString();
    let aUTCDate = new UTCDate(...ctorParams);
    aUTCDate.__proto__ = NativeDate.prototype;
    //@ts-expect-error
    aUTCDate.__proto__.constructor = NativeDate.prototype;
    //@ts-expect-error
    aUTCDate.__proto__.__proto__ = this.__proto__;
    //@ts-expect-error
    aUTCDate.__proto__.__proto__.constructor = this.__proto__;
    return aUTCDate;
}
//@ts-expect-error
UTCDateCaller.__proto__.now = () => { return NativeDate.now(); }
//@ts-expect-error
UTCDateCaller.__proto__.UTC = (...params) => { return NativeDate.UTC(...params); }
//@ts-expect-error
UTCDateCaller.__proto__.parse = (...params) => { return UTCDateParse(...params); }

//@ts-expect-error
if (!process.env.UTCDATE_NO_OVERWRITE) Date = UTCDateCaller;

export { NativeDate, UTCDateCaller as UTCDate }