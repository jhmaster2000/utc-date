# Changelog

## Version 0.0.11
- Added customization options through env variables
    - `UTCDATE_NO_OVERWRITE`: When set to any value, does not automatically overwrite the `Date` object with the `UTCDate` one. (Defaults to overwriting if not set)
    - `UTCDATE_PATCH_CONSOLE`: When set to any value, will patch the console methods to make the logged dates from **utc-date** match how native dates are logged. (Defaults to not patching when not set)
    - `UTCDATE_PATCH_INSPECT`: When set to any value, will patch the `util.inspect` method to make the returned values for dates from **utc-date** match the return values of native dates. (Defaults to not patching when not set)
## Version 0.0.10
- Implemented fixes for inconsistent console logging compared to the native Date object.
- Optimized some chunks of the code.
- Completed tests.
## Versions 0.0.6 + 0.0.7 + 0.0.8 + 0.0.9
- No user-side changes, only repository / npm optimizations and fixes.

## Version 0.0.5
- No user-side changes, only repository optimizations.

## Version 0.0.4
- More code cleanup and optimizations.
- Fixed all the date objects' instances not returning `true` when matched against `Date` with `instanceof`.
- Fixed `Date.parse()` not being UTC.
## Version 0.0.3
- Obsolete version, skip.
## Version 0.0.2
- Code cleanup.
- Fixed bug where some month numbers weren't properly converted to the month names.

## Version 0.0.1
- Initial release.
