import padDigit from '../padDigit.js';

export default function UTCDateToTimeString(UTC: Date) {
    const UTCHour = padDigit(UTC.getUTCHours());
    const UTCMins = padDigit(UTC.getUTCMinutes());
    const UTCSecs = padDigit(UTC.getUTCSeconds());
    return `${UTCHour}:${UTCMins}:${UTCSecs} GMT+0000 (Coordinated Universal Time)`;
}
