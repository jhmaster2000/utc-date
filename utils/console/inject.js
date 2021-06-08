import util from 'util';
import injectTable from './table.js';
const UTCDateCallerStr = `function UTCDateCaller\\(\\.\\.\\.ctorParams\\) {(.|\n|\r)*if \\(this === undefined\\) return new UTCDate\\(\\)\\.toString\\(\\);(.|\n|\r)*let aUTCDate = new UTCDate\\(\\.\\.\\.ctorParams\\);(.|\n|\r)*aUTCDate\\.__proto__ = NativeDate\\.prototype;(.|\n|\r)*aUTCDate\\.__proto__\\.constructor = NativeDate\\.prototype;(.|\n|\r)*aUTCDate\\.__proto__\\.__proto__ = this\\.__proto__;(.|\n|\r)*aUTCDate\\.__proto__\\.__proto__\\.constructor = this\\.__proto__;(.|\n|\r)*return aUTCDate;(.|\n|\r)*}`;
const UTCDateCallerRegex = new RegExp(UTCDateCallerStr, 'g');

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

export default function inject(method, args) {
    [...args].forEach((arg, idx) => {
        if (typeof arg === 'symbol') return; // Symbols are not supported.
        if (method === 'table' && (idx === 0 || idx === 1)) return args[idx] = injectTable(arg, idx);
        if (arg instanceof Date) return args[idx] = arg.toISOString();
        if (typeof arg !== 'object' && util.inspect(arg).includes('[Function: UTCDateCaller]')) {
            if (typeof arg === 'string') return arg.replace(/\[Function: UTCDateCaller\]/g, '[Function: Date]');
            else return args[idx] = util.inspect(arg).replace(/\[Function: UTCDateCaller\]/g, '[Function: Date]');
        }
        if (typeof arg !== 'object' && util.inspect(arg).match(UTCDateCallerRegex)) {
            if (typeof arg === 'string') return args[idx] = arg.replace(UTCDateCallerRegex, 'function Date() { [native code] }');
            else return args[idx] = util.inspect(arg).replace(UTCDateCallerRegex, 'function Date() { [native code] }').slice(1, -1);
        }
    });
    originals[method].apply(console, args);
}