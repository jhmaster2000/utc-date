export default function UTCDateParse([str]: Parameters<DateConstructor['parse']>, NativeDate: DateConstructor): number {
    if (typeof str !== 'string') return NativeDate.parse(str);
    return NativeDate.parse(str.trimEnd() + ' UTC');
}
