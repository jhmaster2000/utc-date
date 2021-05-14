import UTCDatePadNumbers from '../PadNumbers.js';
import UTCDatePadMs from '../PadMs.js';

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