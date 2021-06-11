import inject from '../utils/console/inject.js';
import '../utils/console/inspect.js';

export default function patchConsole() {
    console['log'] = function log(...a) { inject('log', a); }
    console['dir'] = function dir(...a) { inject('dir', a); }
    console['info'] = function info(...a) { inject('info', a); }
    console['warn'] = function warn(...a) { inject('warn', a); }
    console['error'] = function error(...a) { inject('error', a); }
    console['debug'] = function debug(...a) { inject('debug', a); }
    console['table'] = function table(...a) { inject('table', a); }
    console['trace'] = function trace(...a) { inject('trace', a); }
    console['dirxml'] = function dirxml(...a) { inject('dirxml', a); }
}