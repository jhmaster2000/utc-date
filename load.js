import { UTCDate, NativeDate } from './UTCDate/Class.js';

function UTCDateFunc(...ctorParams) {
    if (this === undefined) return new UTCDate().toString();
    return new UTCDate(...ctorParams);
}
UTCDateFunc.__proto__.now = () => { return UTCDate.now(); }
UTCDateFunc.__proto__.UTC = (...params) => { return UTCDate.UTC(...params); }
UTCDateFunc.__proto__.parse = (...params) => { return UTCDate.parse(...params); }
Date = UTCDateFunc;

export { NativeDate, UTCDateFunc as UTCDate }
export default NativeDate