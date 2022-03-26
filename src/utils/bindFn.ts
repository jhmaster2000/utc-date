type AnyFunction = (...args: any[]) => any;

export function bindFn<T extends AnyFunction, R = ReturnType<T>>(fn: T, bindTo: any, thisArg?: any, ...args: any[]): (...args: Parameters<T>) => R {
    const bound = fn.bind(bindTo, ...[...arguments].slice(2));
    Object.defineProperty(bound, 'name', { value: bound.name.replace(/^bound /, ''), configurable: true });
    Object.defineProperty(bound, 'toString', { value: bound.toString.bind(fn), writable: true, configurable: true });
    Object.defineProperty(bound.toString, 'name', { value: bound.toString.name.replace(/^bound /, ''), configurable: true });
    return bound;
}
