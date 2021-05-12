import { UTCDate, NativeDate } from './UTCDate/Class.js';
import UTCDateParse from './UTCDate/Parse.js';

function UTCDateCaller(...ctorParams) {
    if (this === undefined) return new UTCDate().toString();
    let aUTCDate = new UTCDate(...ctorParams);
    aUTCDate.__proto__ = NativeDate.prototype;
    aUTCDate.__proto__.constructor = NativeDate.prototype;
    aUTCDate.__proto__.__proto__ = this.__proto__;
    aUTCDate.__proto__.__proto__.constructor = this.__proto__;
    return aUTCDate;
}
UTCDateCaller.__proto__.now = () => { return NativeDate.now(); }
UTCDateCaller.__proto__.UTC = (...params) => { return NativeDate.UTC(...params); }
UTCDateCaller.__proto__.parse = (...params) => { return UTCDateParse(...params); }

Date = UTCDateCaller;

export { NativeDate, UTCDateCaller as UTCDate }