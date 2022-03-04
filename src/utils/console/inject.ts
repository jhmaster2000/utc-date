import { loopAndModifyArray, loopAndModifyObject } from './loopAndModify.js';
import injectTable from './table.js';
import nativeInspect from './inspect.js';
const UTCDateCallerStr = `function UTCDateCaller\\(\\.\\.\\.ctorParams\\) {(.|\n|\r)*if \\(this === undefined\\) return new UTCDate\\(\\)\\.toString\\(\\);(.|\n|\r)*let aUTCDate = new UTCDate\\(\\.\\.\\.ctorParams\\);(.|\n|\r)*aUTCDate\\.__proto__ = NativeDate\\.prototype;(.|\n|\r)*aUTCDate\\.__proto__\\.constructor = NativeDate\\.prototype;(.|\n|\r)*aUTCDate\\.__proto__\\.__proto__ = this\\.__proto__;(.|\n|\r)*aUTCDate\\.__proto__\\.__proto__\\.constructor = this\\.__proto__;(.|\n|\r)*return aUTCDate;(.|\n|\r)*}`;
const UTCDateCallerRegex = new RegExp(UTCDateCallerStr, 'g');
//@ts-expect-error
Object.isObject = (obj) => { return ({}).toString.apply(obj) === '[object Object]'; }

const originals = {
    log: console.log,
    dir: console.dir,
    info: console.info,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
    table: console.table,
    trace: console.trace,
    dirxml: console.dirxml
}

export default function inject(method: string, args: any[]) {
    [...args].forEach((arg, idx) => {
        if (typeof arg === 'symbol') return; // Symbols are not supported.
        if (method === 'table' && (idx === 0 || idx === 1)) return args[idx] = injectTable(arg, idx);
        //@ts-expect-error
        if (Array.isArray(arg)) return args[idx] = loopAndModifyArray(arg, loopCondition, loopModifier);
        //@ts-expect-error
        if (Object.isObject(arg)) return args[idx] = loopAndModifyObject(arg, loopCondition, loopModifier);
        args[idx] = loopModifier(arg, 0, args);
        return;
    });
    //@ts-expect-error
    originals[method].apply(console, args);
}

//@ts-expect-error
function loopCondition(x: any, id: any, main: any) { if (!Array.isArray(x) && !Object.isObject(x)) return true; else return false; }
function loopModifier(x: { toISOString: () => any; replace: (arg0: RegExp, arg1: string) => any; }, id: number, main: any) {
    if (x instanceof Date) return x.toISOString();
    if (typeof x !== 'object' && nativeInspect(x).includes('[Function: UTCDateCaller]')) {
        //@ts-expect-error
        if (typeof x === 'string') return x.replace(/\[Function: UTCDateCaller\]/g, '[Function: Date]');
        else return nativeInspect(x).replace(/\[Function: UTCDateCaller\]/g, '[Function: Date]');
    }
    if (typeof x !== 'object' && nativeInspect(x).match(UTCDateCallerRegex)) {
        //@ts-expect-error
        if (typeof x === 'string') return x.replace(UTCDateCallerRegex, 'function Date() { [native code] }');
        else return nativeInspect(x).replace(UTCDateCallerRegex, 'function Date() { [native code] }').slice(1, -1);
    }
    return x;
}
