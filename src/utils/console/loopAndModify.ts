//@ts-expect-error
Object.isObject = (obj) => { return ({}).toString.apply(obj) === '[object Object]'; }

function loopAndModifyArray(array: any[], condition: { (x: any, id: any, main: any): boolean; (x: any, id: any, main: any): true | undefined; (x: any, id: any, main: any): boolean; (arg0: any, arg1: any, arg2: any): any; }, modifier: { (x: { toISOString: () => any; replace: (arg0: RegExp, arg1: string) => any; }, id: number, main: any): any; (x: any, id: any, main: any): any; (x: { toISOString: () => any; replace: (arg0: RegExp, arg1: string) => any; }, id: number, main: any): any; (arg0: any, arg1: any, arg2: any): any; }, depth: number | undefined, processed: Set<unknown> | undefined) {
    if (!depth) depth = 0;
    if (!processed) processed = new Set();
    if (processed.has(array)) return array; // Reference to already processed array, abort
    processed.add(array);
    array.forEach((el: any, i: number) => {
        if (el === array) return; // Circular array, abort
        if (condition(el, i, [...processed!][0])) return array[i] = modifier(el, i, [...processed!][0]);
        if (Array.isArray(el)) return array[i] = loopAndModifyArray(el, condition, modifier, depth! + 1, processed);
        //@ts-expect-error
        if (Object.isObject(el)) return array[i] = loopAndModifyObject(el, condition, modifier, depth! + 1, processed);
    });
    return array;
}

function loopAndModifyObject(object: { [x: string]: any; __proto__: undefined; hasOwnProperty: (arg0: string) => any; }, condition: { (x: any, id: any, main: any): boolean; (x: any, id: any, main: any): true | undefined; (x: any, id: any, main: any): boolean; (arg0: any, arg1: string, arg2: any): any; }, modifer: { (x: { toISOString: () => any; replace: (arg0: RegExp, arg1: string) => any; }, id: number, main: any): any; (x: any, id: any, main: any): any; (x: { toISOString: () => any; replace: (arg0: RegExp, arg1: string) => any; }, id: number, main: any): any; (arg0: any, arg1: string, arg2: any): any; }, depth: number | undefined, processed: Set<unknown> | undefined) {
    if (!depth) depth = 0;
    if (!processed) processed = new Set();
    if (processed.has(object)) return object; // Reference to already processed object, abort
    processed.add(object);
    for (const key in object) {
        if (object.__proto__ !== undefined && object.hasOwnProperty(key)) {
            let circular = false;
            const val = object[key];
            if (val === object) circular = true; // Circular object, abort
            if (!circular) {
                if (condition(val, key, [...processed][0])) object[key] = modifer(val, key, [...processed][0]);
                if (object[key] === val && Array.isArray(val)) object[key] = loopAndModifyArray(val, condition, modifer, depth + 1, processed);
                //@ts-expect-error
                if (object[key] === val && Object.isObject(val)) object[key] = loopAndModifyObject(val, condition, modifer, depth + 1, processed);
            }
        }
    }
    return object;
}

export { loopAndModifyArray, loopAndModifyObject }