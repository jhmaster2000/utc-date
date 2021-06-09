import util from 'util';
Object.isObject = (obj) => { return ({}).toString.apply(obj) === '[object Object]'; }

const original = util.inspect;
const origkeys = {
    custom: original.custom,
    colors: original.colors,
    styles: original.styles,
    defaultOptions: original.defaultOptions
}
util['inspect'] = function inspect(...a) { return injectInspect(a); }

for (const okey in origkeys) {
    if (Object.hasOwnProperty.call(origkeys, okey)) {
        util['inspect'][okey] = origkeys[okey];
    }
}

function injectInspect(args) {
    [...args].forEach((arg, idx) => {
        if (typeof arg === 'symbol') return; // Symbols are not supported.
        if (Array.isArray(arg)) return args[idx] = loopAndModifyArray(arg, loopCondition, loopModifier);
        if (Object.isObject(arg)) return args[idx] = loopAndModifyObject(arg, loopCondition, loopModifier);
        args[idx] = loopModifier(arg, 0, args);
    });
    return original.apply(util, args);
}

function loopCondition(x, id, main) { if (x instanceof Date) return true; }
function loopModifier(x, id, main) {
    if (x instanceof Date) return x.toISOString();
    else return x;
}