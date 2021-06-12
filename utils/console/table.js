import nativeInspect from './inspect.js';
import { loopAndModifyArray, loopAndModifyObject } from './loopAndModify.js';
const UTCDateCallerStr = `function UTCDateCaller\\(\\.\\.\\.ctorParams\\) {(.|\n|\r)*if \\(this === undefined\\) return new UTCDate\\(\\)\\.toString\\(\\);(.|\n|\r)*let aUTCDate = new UTCDate\\(\\.\\.\\.ctorParams\\);(.|\n|\r)*aUTCDate\\.__proto__ = NativeDate\\.prototype;(.|\n|\r)*aUTCDate\\.__proto__\\.constructor = NativeDate\\.prototype;(.|\n|\r)*aUTCDate\\.__proto__\\.__proto__ = this\\.__proto__;(.|\n|\r)*aUTCDate\\.__proto__\\.__proto__\\.constructor = this\\.__proto__;(.|\n|\r)*return aUTCDate;(.|\n|\r)*}`;
const UTCDateCallerRegex = new RegExp(UTCDateCallerStr, 'g');
Object.isObject = (obj) => { return ({}).toString.apply(obj) === '[object Object]'; }
function tableCondition(x, id, main) { if (!Array.isArray(x) && !Object.isObject(x)) return true; }

export default function injectTable(arg, idx) {
    let tableModifier = tableModifier0;
    if (idx === 1) tableModifier = tableModifier1;
    if (Array.isArray(arg)) return loopAndModifyArray(arg, tableCondition, tableModifier);
    if (Object.isObject(arg)) return loopAndModifyObject(arg, tableCondition, tableModifier);
    if (arg instanceof Date) return {};
    else return arg;
}

function tableModifier0(x, id, main) {
    if (Array.isArray(main)) {
        if (x instanceof Date) return x.toISOString();
        if (typeof arg !== 'object' && nativeInspect(x).includes('[Function: UTCDateCaller]')) {
            if (typeof x === 'string') return x.replace(/\[Function: UTCDateCaller\]/g, '[Function: Date]');
            else return function Date() {};
        }
        if (typeof arg !== 'object' && nativeInspect(x).match(UTCDateCallerRegex)) {
            if (typeof x === 'string') return x.replace(UTCDateCallerRegex, 'function Date() { [native code] }');
            else return nativeInspect(x).replace(UTCDateCallerRegex, 'function Date() { [native code] }').slice(1, -1);
        }
        return x;
    }
    if (Object.isObject(main)) {
        if (x instanceof Date) return {};
        if (typeof arg !== 'object' && nativeInspect(x).includes('[Function: UTCDateCaller]')) {
            if (typeof x === 'string') return x.replace(/\[Function: UTCDateCaller\]/g, '[Function: Date]');
            else return function Date() {};
        }
        if (typeof arg !== 'object' && nativeInspect(x).match(UTCDateCallerRegex)) {
            if (typeof x === 'string') return x.replace(UTCDateCallerRegex, 'function Date() { [native code] }');
            else return nativeInspect(x).replace(UTCDateCallerRegex, 'function Date() { [native code] }').slice(1, -1);
        }
        return x;
    }
}

function tableModifier1(x, id, main) {
    if (x instanceof Date) return x.toString();
    if (typeof arg !== 'object' && nativeInspect(x).includes('[Function: UTCDateCaller]')) {
        if (typeof x === 'string') return x.replace(/\[Function: UTCDateCaller\]/g, '[Function: Date]');
        else return 'function Date() { [native code] }';
    }
    if (typeof arg !== 'object' && nativeInspect(x).match(UTCDateCallerRegex)) {
        if (typeof x === 'string') return x.replace(UTCDateCallerRegex, 'function Date() { [native code] }');
        else return nativeInspect(x).replace(UTCDateCallerRegex, 'function Date() { [native code] }').slice(1, -1);
    }
    return x;
}