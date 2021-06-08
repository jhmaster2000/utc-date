export default function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    let temp = obj.constructor();
    for (let key in obj) {
        temp[key] = cloneObject(obj[key]);
    }
    return temp;
}