import { NativeDate } from './Class.js';

const TZList = ['UTC', 'GMT', 'CDT', 'EDT', 'MDT', 'PDT', 'CST', 'EST', 'MST', 'PST'];

export default function UTCDateParse(...params: [any]) {
    if (typeof params[0] !== 'string') return UTCParser(...params);

    let str = params.join(' ').trim();
    str = str.replace(/\(.+\)/g, '').trim();

    let TZHits = 0;
    TZList.forEach(TZ => {
        if (str.includes(TZ)) TZHits++;
    });
    if (TZHits === 0) return UTCParser(str + ' UTC');
    else return UTCParser(...params);
}

function UTCParser(...p: [string]) {
    return NativeDate.parse(...p);
}