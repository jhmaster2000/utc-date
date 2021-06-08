export default function UTCDatePadMs(ms) {
    ms = ms.toString();
    if (ms.length === 1) ms = '00' + ms;
    if (ms.length === 2) ms = '0' + ms;
    return ms;
}