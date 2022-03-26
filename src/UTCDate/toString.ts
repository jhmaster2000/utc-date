import padDigit from '../utils/padDigit.js';

export default function UTCDateToString(UTC: Date) {
    const UTCDay = String(UTC.getUTCDay()).replace('0', 'Sun')
                .replace('1', 'Mon').replace('2', 'Tue').replace('3', 'Wed')
                .replace('4', 'Thu').replace('5', 'Fri').replace('6', 'Sat');
    const UTCMonth = String(UTC.getUTCMonth()).replace('11', 'Dec').replace('10', 'Nov')
                .replace('9', 'Oct').replace('8', 'Sep').replace('7', 'Aug').replace('6', 'Jul').replace('5', 'Jun')
                .replace('4', 'May').replace('3', 'Apr').replace('2', 'Mar').replace('1', 'Feb').replace('0', 'Jan');
    const UTCDotM = padDigit(UTC.getUTCDate());
    const UTCYear = UTC.getUTCFullYear();
    const UTCHour = padDigit(UTC.getUTCHours());
    const UTCMins = padDigit(UTC.getUTCMinutes());
    const UTCSecs = padDigit(UTC.getUTCSeconds());
    return `${UTCDay} ${UTCMonth} ${UTCDotM} ${UTCYear} ${UTCHour}:${UTCMins}:${UTCSecs} GMT+0000 (Coordinated Universal Time)`;
}
