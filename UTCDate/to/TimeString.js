import UTCDatePadNumbers from '../PadNumbers.js';

export default function UTCDateToTimeString(UTC) {
    let UTCHour = UTCDatePadNumbers(UTC.getUTCHours());
    let UTCMins = UTCDatePadNumbers(UTC.getUTCMinutes());
    let UTCSecs = UTCDatePadNumbers(UTC.getUTCSeconds());
    return `${UTCHour}:${UTCMins}:${UTCSecs} GMT+0000 (Coordinated Universal Time)`;
}