import util from 'util';
import { loopAndModifyArray, loopAndModifyObject } from './loopAndModify.js';
const UTCDateCallerStr = `function UTCDateCaller\\(\\.\\.\\.ctorParams\\) {(.|\n|\r)*if \\(this === undefined\\) return new UTCDate\\(\\)\\.toString\\(\\);(.|\n|\r)*let aUTCDate = new UTCDate\\(\\.\\.\\.ctorParams\\);(.|\n|\r)*aUTCDate\\.__proto__ = NativeDate\\.prototype;(.|\n|\r)*aUTCDate\\.__proto__\\.constructor = NativeDate\\.prototype;(.|\n|\r)*aUTCDate\\.__proto__\\.__proto__ = this\\.__proto__;(.|\n|\r)*aUTCDate\\.__proto__\\.__proto__\\.constructor = this\\.__proto__;(.|\n|\r)*return aUTCDate;(.|\n|\r)*}`;
const UTCDateCallerRegex = new RegExp(UTCDateCallerStr, 'g');
//@ts-expect-error
Object.isObject = (obj) => { return ({}).toString.apply(obj) === '[object Object]'; }

const original = util.inspect;
const origkeys = {
    custom: original.custom,
    colors: original.colors,
    styles: original.styles,
    defaultOptions: original.defaultOptions
}
export function patchInspect() {
    //@ts-expect-error
    util['inspect'] = function inspect(...a) { return injectInspect(a); }
}

for (const okey in origkeys) {
    if (Object.hasOwnProperty.call(origkeys, okey)) {
        //@ts-expect-error
        util['inspect'][okey] = origkeys[okey];
    }
}

let isISODate = false;
function injectInspect(args: [any]) {
    [...args].forEach((arg, idx) => {
        if (typeof arg === 'symbol') return; // Symbols are not supported.
        //@ts-expect-error
        if (Array.isArray(arg)) return args[idx] = loopAndModifyArray(arg, loopCondition, loopModifier);
        //@ts-expect-error
        if (Object.isObject(arg)) return args[idx] = loopAndModifyObject(arg, loopCondition, loopModifier);
        args[idx] = loopModifier(arg, 0, args);
        return;
    });
    let returnValue = original.apply(util, args);
    if (returnValue === `'[Function: Date]'`) returnValue = returnValue.slice(1, -1);
    if (isISODate) returnValue = returnValue.slice(1, -1);
    return returnValue;
}

function loopCondition(x: any, id: any, main: any) { if (x instanceof Date) return true; else return false; }
function loopModifier(x: { toISOString: () => any; replace: (arg0: RegExp, arg1: string) => any; }, id: number, main: any) {
    if (x instanceof Date) {
        isISODate = true;
        return x.toISOString();
    }
    if (typeof x !== 'object' && String(x).includes('[Function: UTCDateCaller]')) {
        //@ts-expect-error
        if (typeof x === 'string') return x.replace(/\[Function: UTCDateCaller\]/g, '[Function: Date]');
        else return String(x).replace(/\[Function: UTCDateCaller\]/g, '[Function: Date]');
    }
    if (typeof x !== 'object' && String(x).match(UTCDateCallerRegex)) {
        //@ts-expect-error
        if (typeof x === 'string') return x.replace(UTCDateCallerRegex, `'function Date() { [native code] }'`);
        else return String(x).replace(UTCDateCallerRegex, '[Function: Date]');
    }
    return x;
}

export default original;