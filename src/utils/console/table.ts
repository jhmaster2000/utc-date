import nativeInspect from './inspect.js';
import { loopAndModifyArray, loopAndModifyObject } from './loopAndModify.js';
const UTCDateCallerStr = `function UTCDateCaller\\(\\.\\.\\.ctorParams\\) {(.|\n|\r)*if \\(this === undefined\\) return new UTCDate\\(\\)\\.toString\\(\\);(.|\n|\r)*let aUTCDate = new UTCDate\\(\\.\\.\\.ctorParams\\);(.|\n|\r)*aUTCDate\\.__proto__ = NativeDate\\.prototype;(.|\n|\r)*aUTCDate\\.__proto__\\.constructor = NativeDate\\.prototype;(.|\n|\r)*aUTCDate\\.__proto__\\.__proto__ = this\\.__proto__;(.|\n|\r)*aUTCDate\\.__proto__\\.__proto__\\.constructor = this\\.__proto__;(.|\n|\r)*return aUTCDate;(.|\n|\r)*}`;
const UTCDateCallerRegex = new RegExp(UTCDateCallerStr, 'g');
//@ts-expect-error
Object.isObject = (obj) => { return ({}).toString.apply(obj) === '[object Object]'; }
//@ts-expect-error
function tableCondition(x: any, id: any, main: any) { if (!Array.isArray(x) && !Object.isObject(x)) return true; else return false; }

export default function injectTable(arg: any[], idx: number) {
    let tableModifier = tableModifier0;
    //@ts-expect-error
    if (idx === 1) tableModifier = tableModifier1;
    //@ts-expect-error
    if (Array.isArray(arg)) return loopAndModifyArray(arg, tableCondition, tableModifier);
    //@ts-expect-error
    if (Object.isObject(arg)) return loopAndModifyObject(arg, tableCondition, tableModifier);
    //@ts-expect-error
    if (arg instanceof Date) return {};
    else return arg;
}

function tableModifier0(x: { toISOString: () => any; replace: (arg0: RegExp, arg1: string) => any; }, id: any, main: any) {
    if (Array.isArray(main)) {
        if (x instanceof Date) return x.toISOString();
        //@ts-expect-error
        if (typeof arg !== 'object' && nativeInspect(x).includes('[Function: UTCDateCaller]')) {
            //@ts-expect-error
            if (typeof x === 'string') return x.replace(/\[Function: UTCDateCaller\]/g, '[Function: Date]');
            else return function Date() {};
        }
        //@ts-expect-error
        if (typeof arg !== 'object' && nativeInspect(x).match(UTCDateCallerRegex)) {
            //@ts-expect-error
            if (typeof x === 'string') return x.replace(UTCDateCallerRegex, 'function Date() { [native code] }');
            else return nativeInspect(x).replace(UTCDateCallerRegex, 'function Date() { [native code] }').slice(1, -1);
        }
        return x;
    }
    //@ts-expect-error
    if (Object.isObject(main)) {
        if (x instanceof Date) return {};
        //@ts-expect-error
        if (typeof arg !== 'object' && nativeInspect(x).includes('[Function: UTCDateCaller]')) {
            //@ts-expect-error
            if (typeof x === 'string') return x.replace(/\[Function: UTCDateCaller\]/g, '[Function: Date]');
            else return function Date() {};
        }
        //@ts-expect-error
        if (typeof arg !== 'object' && nativeInspect(x).match(UTCDateCallerRegex)) {
            //@ts-expect-error
            if (typeof x === 'string') return x.replace(UTCDateCallerRegex, 'function Date() { [native code] }');
            else return nativeInspect(x).replace(UTCDateCallerRegex, 'function Date() { [native code] }').slice(1, -1);
        }
        return x;
    }
}

function tableModifier1(x: string, id: any, main: any) {
    //@ts-expect-error
    if (x instanceof Date) return x.toString();
    //@ts-expect-error
    if (typeof arg !== 'object' && nativeInspect(x).includes('[Function: UTCDateCaller]')) {
        if (typeof x === 'string') return x.replace(/\[Function: UTCDateCaller\]/g, '[Function: Date]');
        else return 'function Date() { [native code] }';
    }
    //@ts-expect-error
    if (typeof arg !== 'object' && nativeInspect(x).match(UTCDateCallerRegex)) {
        if (typeof x === 'string') return x.replace(UTCDateCallerRegex, 'function Date() { [native code] }');
        else return nativeInspect(x).replace(UTCDateCallerRegex, 'function Date() { [native code] }').slice(1, -1);
    }
    return x;
}