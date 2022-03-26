export default function UTCDateToLocaleTimeString(UTC: Date, [locale, opts]: Parameters<Date['toLocaleTimeString']>, NativeDate: DateConstructor): string {
    if (!locale) locale = 'en-GB';
    if (!opts) opts = {};
    if (!opts.dateStyle) opts.dateStyle = undefined;
    if (!opts.timeStyle) opts.timeStyle = undefined;
    if (!opts.hour12) opts.hour12 = false;
    if (!opts.hourCycle) opts.hourCycle = 'h24';
    if (!opts.hour) opts.hour = '2-digit';
    if (!opts.minute) opts.minute = '2-digit'
    if (!opts.second) opts.second = '2-digit';
    if (!opts.timeZone) opts.timeZone = 'UTC';
    if (!opts.timeZoneName) opts.timeZoneName = undefined;

    const UTCCopy = new NativeDate(UTC.valueOf());
    return UTCCopy.toLocaleTimeString(locale, opts);
}