Object.isObject = (obj) => { return ({}).toString.apply(obj) === '[object Object]'; }

function loopAndModifyArray(array, condition, modifier, depth, processed) {
    if (!depth) depth = 0;
    if (!processed) processed = new Set();
    if (processed.has(array)) return array; // Reference to already processed array, abort
    processed.add(array);
    array.forEach((el, i) => {
        if (el === array) return; // Circular array, abort
        if (condition(el, i, [...processed][0])) return array[i] = modifier(el, i, [...processed][0]);
        if (Array.isArray(el)) return array[i] = loopAndModifyArray(el, condition, modifier, depth + 1, processed);
        if (Object.isObject(el)) return array[i] = loopAndModifyObject(el, condition, modifier, depth + 1, processed);
    });
    return array;
}

function loopAndModifyObject(object, condition, modifer, depth, processed) {
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
                if (object[key] === val && Object.isObject(val)) object[key] = loopAndModifyObject(val, condition, modifer, depth + 1, processed);
            }
        }
    }
    return object;
}

export { loopAndModifyArray, loopAndModifyObject }