export default function UTCDatePadNumbers(num) {
    if (String(num).length === 1) return '0' + String(num);
    else return String(num);
}