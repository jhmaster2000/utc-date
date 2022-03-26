export default function padDigit(num: number): string {
    if (String(num).length === 1) return '0' + String(num);
    else return String(num);
}
