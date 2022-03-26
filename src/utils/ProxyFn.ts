import { bindFn } from './bindFn.js';

type AnyFunction = (...args: any[]) => any;

interface ProxyFnHandler<T extends AnyFunction> extends ProxyHandler<T> {
    apply?(target: T, thisArg: any, argArray: Parameters<T>): any;
}

export function ProxyFn<T extends AnyFunction>(fn: T, hooks: Omit<ProxyFnHandler<T>, 'get'> = {}): T {
    return new Proxy(fn, {
        get(fn: T, prop: keyof Function) {
            if (prop === 'toString') return bindFn(Function.prototype.toString, fn);
            else return fn[prop];
        }, ...hooks
    });
}
