export default function UTCDatePadMs(ms: number): string {
    let msStr = ms.toString();
    if (msStr.length === 1) msStr = '00' + msStr;
    if (msStr.length === 2) msStr = '0' + msStr;
    return msStr;
}
