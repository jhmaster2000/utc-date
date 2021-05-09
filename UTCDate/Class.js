import cloneObject from '../cloneObject.js';
const NativeDate = cloneObject(Date);

import UTCDateCalculateTZ from './CalculateTZ.js';
import UTCDateToString from './to/String.js';
import UTCDateToTimeString from './to/TimeString.js';
import UTCDateToDateString from './to/DateString.js';
import UTCDateToUTCString from './to/UTCString.js';
import UTCDateToISOString from './to/ISOString.js';
import UTCDateToLocaleString from './to/LocaleString.js';
import UTCDateToLocaleTimeString from './to/LocaleTimeString.js';
import UTCDateToLocaleDateString from './to/LocaleDateString.js';

class UTCDate extends Date {
    constructor(...ctorParams) {
        super(...ctorParams);
        let NewUTCDate = new NativeDate(...ctorParams);
        
        const UTCDateInternals = {};
        UTCDateInternals.UTCOffsets = {
            ms: (NewUTCDate.getTimezoneOffset() * 60000),
            secs: (NewUTCDate.getTimezoneOffset() * 60),
            mins: NewUTCDate.getTimezoneOffset(),
            hours: (NewUTCDate.getTimezoneOffset() / 60)
        }
        UTCDateInternals.UTCTimezone = UTCDateCalculateTZ(UTCDateInternals.UTCOffsets);

        NewUTCDate.getTimezoneOffset = () => { return 0; }
        NewUTCDate.toString = () => { return UTCDateToString(this); }
        NewUTCDate.toTimeString = () => { return UTCDateToTimeString(this); }
        NewUTCDate.toDateString = () => { return UTCDateToDateString(this); }
        NewUTCDate.toUTCString = () => { return UTCDateToUTCString(this); }
        NewUTCDate.toISOString = () => { return UTCDateToISOString(this); }
        NewUTCDate.toJSON = () => { return UTCDateToISOString(this); }
        NewUTCDate.toLocaleString = (...params) => { return UTCDateToLocaleString(this, ...params); }
        NewUTCDate.toLocaleTimeString = (...params) => { return UTCDateToLocaleTimeString(this, ...params); }
        NewUTCDate.toLocaleDateString = (...params) => { return UTCDateToLocaleDateString(this, ...params); }

        NewUTCDate.getFullYear = () => { return this.getUTCFullYear(); }
        NewUTCDate.getMonth = () => { return this.getUTCMonth(); }
        NewUTCDate.getDate = () => { return this.getUTCDate(); }
        NewUTCDate.getDay = () => { return this.getUTCDay(); }
        NewUTCDate.getHours = () => { return this.getUTCHours(); }
        NewUTCDate.getMinutes = () => { return this.getUTCMinutes(); }
        NewUTCDate.getSeconds = () => { return this.getUTCSeconds(); }
        NewUTCDate.getMilliseconds = () => { return this.getUTCMilliseconds(); }
        
        NewUTCDate.setFullYear = (...params) => { return this.setUTCFullYear(...params); }
        NewUTCDate.setMonth = (...params) => { return this.setUTCMonth(...params); }
        NewUTCDate.setDate = (...params) => { return this.setUTCDate(...params); }
        NewUTCDate.setHours = (...params) => { return this.setUTCHours(...params); }
        NewUTCDate.setMinutes = (...params) => { return this.setUTCMinutes(...params); }
        NewUTCDate.setSeconds = (...params) => { return this.setUTCSeconds(...params); }
        NewUTCDate.setMilliseconds = (...params) => { return this.setUTCMilliseconds(...params); }

        return NewUTCDate;
    }
}

export { UTCDate, NativeDate }