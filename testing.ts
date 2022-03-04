class UTCDate extends Date {
    constructor();
    constructor(value: string | number);
    constructor(value: string | number | Date);
    constructor(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number);
    constructor(arg?: string | number | Date, ...rest: [number?, number?, number?, number?, number?, number?]) {
        super(arg as any, ...rest as [number, number?, number?, number?, number?, number?]);
    }

    override getTimezoneOffset  = () => { return 0; }
    //override toString           = () => { return UTCDateToString(this); }
    //override toTimeString       = () => { return UTCDateToTimeString(this); }
    //override toDateString       = () => { return UTCDateToDateString(this); }
    //override toUTCString        = () => { return UTCDateToUTCString(this); }
    //override toISOString        = () => { return UTCDateToISOString(this); }
    //override toJSON             = () => { return UTCDateToISOString(this); }
    //override toLocaleString     = (...params: any[]) => { return UTCDateToLocaleString(this, ...params); }
    //override toLocaleTimeString = (...params: any[]) => { return UTCDateToLocaleTimeString(this, ...params); }
    //override toLocaleDateString = (...params: any[]) => { return UTCDateToLocaleDateString(this, ...params); }
 
    override getFullYear = () => { return this.getUTCFullYear(); }
    override getMonth = () => { return this.getUTCMonth(); }
    override getDate = () => { return this.getUTCDate(); }
    override getDay = () => { return this.getUTCDay(); }
    override getHours = () => { return this.getUTCHours(); }
    override getMinutes = () => { return this.getUTCMinutes(); }
    override getSeconds = () => { return this.getUTCSeconds(); }
    override getMilliseconds = () => { return this.getUTCMilliseconds(); }
 
    override setFullYear = (...params: [number, number?, number?]) => { return this.setUTCFullYear(...params); }
    override setMonth = (...params: [number, number?]) => { return this.setUTCMonth(...params); }
    override setDate = (...params: [number]) => { return this.setUTCDate(...params); }
    override setHours = (...params: [number, number?, number?, number?]) => { return this.setUTCHours(...params); }
    override setMinutes = (...params: [number, number?, number?]) => { return this.setUTCMinutes(...params); }
    override setSeconds = (...params: [number, number?]) => { return this.setUTCSeconds(...params); }
    override setMilliseconds = (...params: [number]) => { return this.setUTCMilliseconds(...params); }
}

new UTCDate()
new Date()
