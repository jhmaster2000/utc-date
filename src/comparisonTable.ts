export type TableEntryFn = (a: any, b: any, equalOverride?: any) => ({ [label: string]: any; Equal: any | boolean; });
export function TableEntryFactory<A extends string, B extends string>(labelA: A, labelB: B) {
    return (a: any, b: any, equalOverride?: any) => ({ [labelA]: a, [labelB]: b, Equal: equalOverride ?? ((Number.isNaN(a) && Number.isNaN(b)) || (a === b)) });
}

export function comparisonTable(A: any, B: any, tableEntry: TableEntryFn = TableEntryFactory('A', 'B'), presetEntries = {} as Record<string, object> | boolean, equalOverrides = {} as Record<string, any>) {
    let callFns = false;
    if (typeof presetEntries === 'boolean') {
        callFns = presetEntries;
        presetEntries = {};
    }
    const entries: Record<string, object> = { '* SELF': tableEntry(A, B, (A === B) || 'PROXY'), ...presetEntries };
    const allKeysA = getAllKeys(A);
    const allKeysB = getAllKeys(B);
    entries['* ALLKEYS'] = tableEntry('* ALLKEYS_A', '* ALLKEYS_B', arrayEqual(allKeysA, allKeysB));
    if (!callFns)
        allKeysA.forEach((key: string | symbol) => entries[String(key)] = tableEntry(tryString(A[key as keyof typeof A]), tryString(B[key as keyof typeof B])));
    else
        allKeysA.forEach((key: string | symbol) => {
            try {
                const _a = A.constructor.name === 'Date' ? new Date() : Function.constructor === A.constructor ? A : new A.constructor();
                const _b = Function.constructor === B.constructor ? B : new B.constructor();
                entries[String(key)] = tableEntry(
                    typeof _a[key as keyof typeof A] === 'function' ? _a[key as keyof typeof A].bind(_a)() : A[key as keyof typeof A],
                    typeof _b[key as keyof typeof B] === 'function' ? _b[key as keyof typeof B].bind(_b)() : B[key as keyof typeof B]
                );
            } catch (e: any) {
                const err: Error = e;
                console.error(key, err.message);
                entries[String(key)] = tableEntry(`! ${err.name}`, `! ${err.name}`, 'ERROR');
            }
        });
    for (const [key, override] of Object.entries(equalOverrides)) {
        if (!Object.keys(entries).includes(key))
            continue;
        (<any>entries[key]).Equal = override;
    }
    console.table(entries);
}

function getAllKeys<T>(obj: T, strict = true): (string | symbol)[] {
    const strictBannedKeys = ['caller', 'callee', 'arguments'];
    let keys: (string | symbol)[] = [];
    do {
        for (const key of [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)]) {
            if (!keys.includes(key)) {
                if (!strict) keys.push(key);
                else if (!strictBannedKeys.includes(<string>key)) keys.push(key);
            }
        };
    } while (obj = Object.getPrototypeOf(obj));
    return keys.sort(a => typeof a === 'symbol' ? 1 : -1);
}

function arrayEqual(a: any[], b: any[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
}

function tryString(obj: any): string {
    try {
        return String(obj);
    } catch (e: any) {
        return `! STRINGFAIL: ${e.name}`;
    }
}
