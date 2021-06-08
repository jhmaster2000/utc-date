import NativeDate from '../../utils/NativeDate.js'

export default function UTCDateToLocaleDateString(UTC, locale, opts) {
    if (!locale) locale = 'en-GB';
    if (!opts) opts = {};
    if (!opts.dateStyle) opts.dateStyle = undefined;
    if (!opts.timeStyle) opts.timeStyle = undefined;
    if (!opts.weekday) opts.weekday = undefined;
    if (!opts.year) opts.year = 'numeric';
    if (!opts.month) opts.month = 'numeric';
    if (!opts.day) opts.day = 'numeric';
    if (!opts.timeZone) opts.timeZone = 'UTC';
    if (!opts.timeZoneName) opts.timeZoneName = undefined;

    let UTCCopy = new NativeDate(UTC.valueOf());
    return UTCCopy.toLocaleDateString(locale, opts);
}