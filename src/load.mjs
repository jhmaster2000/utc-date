import DateProxy, { NativeDateSymbol, UTCDateSymbol } from './proxy.js';
Date = DateProxy;
const NativeDate = DateProxy[NativeDateSymbol];
function isUTCDate(date) {
    return date[UTCDateSymbol] ?? false;
}
export { DateProxy as UTCDate, NativeDate, isUTCDate };
