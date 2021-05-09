import UTCDatePadNumbers from '../PadNumbers.js';

export default function UTCDateToISOString(UTC) {
    let UTCMonth = UTCDatePadNumbers(UTC.getUTCMonth() + 1);
    let UTCDotM = UTCDatePadNumbers(UTC.getUTCDate());
    let UTCYear = UTC.getUTCFullYear();
    let UTCHour = UTCDatePadNumbers(UTC.getUTCHours());
    let UTCMins = UTCDatePadNumbers(UTC.getUTCMinutes());
    let UTCSecs = UTCDatePadNumbers(UTC.getUTCSeconds());
    let UTCMs = UTCDatePadMs(UTC.getUTCMilliseconds());
    return `${UTCYear}-${UTCMonth}-${UTCDotM}T${UTCHour}:${UTCMins}:${UTCSecs}.${UTCMs}Z`;
}

function UTCDatePadMs(ms) {
    ms = String(ms);
    if (ms.length === 1) return '00' + ms;
    if (ms.length === 2) return '0' + ms;
    else return ms;
}