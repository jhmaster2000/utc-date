import DateProxy from './proxy.js';

// the .prototype property cannot be proxied, so polluting the prototype is the only way to do this for now.
// doesn't really matter since the only side effect would be the original Date object's prototype being polluted,
// but the entire original Date object will be overriden by the DateProxy object anyway.
// However, this does also affect the provided NativeDate export, unfortunately.
DateProxy.prototype.constructor = DateProxy;
Date = DateProxy;
