import UTCDatePadNumbers from '../PadNumbers.js';

export default function UTCDateToDateString(UTC) {
    let UTCDay = String(UTC.getUTCDay()).replace('0','Sun')
                .replace('1','Mon').replace('2','Tue').replace('3','Wed')
                .replace('4','Thu').replace('5','Fri').replace('6','Sat');
    let UTCMonth = String(UTC.getUTCMonth()).replace('11','Dec').replace('10','Nov')
                .replace('9','Oct').replace('8','Sep').replace('7','Aug').replace('6','Jul').replace('5','Jun')
                .replace('4','May').replace('3','Apr').replace('2','Mar').replace('1','Feb').replace('0','Jan');
    let UTCDotM = UTCDatePadNumbers(UTC.getUTCDate());
    let UTCYear = UTC.getUTCFullYear();
    return `${UTCDay} ${UTCMonth} ${UTCDotM} ${UTCYear}`;
}