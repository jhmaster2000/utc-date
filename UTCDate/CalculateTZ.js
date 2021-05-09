import UTCDatePadNumbers from './PadNumbers.js';

export default function UTCDateCalculateTZ(offs) {
    let h = offs.hours;
    let m = offs.mins;
    let mabs = Math.abs(m);
    let habs = Math.abs(h);
    let hstr = UTCDatePadNumbers(habs);
    if (h === 0 && m === 0) return 'GMT+0000';

    let dir = '-';
    if (h < 0) dir = '+';

    if (!hstr.includes('.')) return `GMT${dir}${hstr}00`;

    let mstr = UTCDatePadNumbers(mabs - (Math.floor((mabs - 1) / 60) * 60));
    hstr = String(Math.floor(Number(hstr)));
    hstr = UTCDatePadNumbers(hstr);
    return `GMT${dir}${hstr}${mstr}`;
}