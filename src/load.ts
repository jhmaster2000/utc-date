import DateProxy, { NativeDateSymbol, UTCDateSymbol } from './proxy.js';

const NativeDate = DateProxy[<keyof DateConstructor><unknown>NativeDateSymbol] as unknown as DateConstructor;

function isUTCDate(date: any): boolean {
    if (date === null || date === undefined) return false;
    else return date[UTCDateSymbol] as true | undefined ?? false;
}

export { DateProxy as UTCDate, NativeDate, isUTCDate };
