import NativeDate from '../utils/NativeDate.js';

//import UTCDateCalculateTZ from './CalculateTZ.js';
import UTCDateToString from './to/String.js';
import UTCDateToTimeString from './to/TimeString.js';
import UTCDateToDateString from './to/DateString.js';
import UTCDateToUTCString from './to/UTCString.js';
import UTCDateToISOString from './to/ISOString.js';
import UTCDateToLocaleString from './to/LocaleString.js';
import UTCDateToLocaleTimeString from './to/LocaleTimeString.js';
import UTCDateToLocaleDateString from './to/LocaleDateString.js';

class UTCDate extends NativeDate {
    __proto__!: Date;
    constructor(...ctorParams: [any?]) {
        super(...ctorParams);
                
        /*const UTCDateInternals = {};
        UTCDateInternals.UTCOffsets = {
            ms: (this.getTimezoneOffset() * 60000),
            secs: (this.getTimezoneOffset() * 60),
            mins: this.getTimezoneOffset(),
            hours: (this.getTimezoneOffset() / 60)
        }
        UTCDateInternals.UTCTimezone = UTCDateCalculateTZ(UTCDateInternals.UTCOffsets);*/

        this.getTimezoneOffset = () => { return 0; }
        this.toString = () => { return UTCDateToString(this); }
        this.toTimeString = () => { return UTCDateToTimeString(this); }
        this.toDateString = () => { return UTCDateToDateString(this); }
        this.toUTCString = () => { return UTCDateToUTCString(this); }
        this.toISOString = () => { return UTCDateToISOString(this); }
        this.toJSON = () => { return UTCDateToISOString(this); }
        this.toLocaleString = (...params: []) => { return UTCDateToLocaleString(this, ...params); }
        this.toLocaleTimeString = (...params: []) => { return UTCDateToLocaleTimeString(this, ...params); }
        this.toLocaleDateString = (...params: []) => { return UTCDateToLocaleDateString(this, ...params); }

        this.getFullYear = () => { return this.getUTCFullYear(); }
        this.getMonth = () => { return this.getUTCMonth(); }
        this.getDate = () => { return this.getUTCDate(); }
        this.getDay = () => { return this.getUTCDay(); }
        this.getHours = () => { return this.getUTCHours(); }
        this.getMinutes = () => { return this.getUTCMinutes(); }
        this.getSeconds = () => { return this.getUTCSeconds(); }
        this.getMilliseconds = () => { return this.getUTCMilliseconds(); }
        
        this.setFullYear = (...params) => { return this.setUTCFullYear(...params); }
        this.setMonth = (...params) => { return this.setUTCMonth(...params); }
        this.setDate = (...params) => { return this.setUTCDate(...params); }
        this.setHours = (...params) => { return this.setUTCHours(...params); }
        this.setMinutes = (...params) => { return this.setUTCMinutes(...params); }
        this.setSeconds = (...params) => { return this.setUTCSeconds(...params); }
        this.setMilliseconds = (...params) => { return this.setUTCMilliseconds(...params); }

        return this;
    }
}

export { UTCDate, NativeDate }