// This is not a *.test.js file because it is pointless, since testing frameworks can't test console output
// Instead this file is for manual human verification of the console outputs
import './utcdate-env.js';
import '../load.js'; // utc-date
import util from 'util';
const fixdate = Date();
const fixdate_ctor = new Date;
const tests = [
    'log', 'dir', 'info', 'warn', 'error',
    'debug', 'dirxml', 'table', 'trace', 'time',
    'timeLog', 'timeEnd', 'group', 'groupCollapsed'
];

tests.forEach(t => {
    console[t]('test: ' + t);
    console[t](Date);
    console[t](fixdate);
    console[t](fixdate_ctor);
    console[t](Date.toString());
    console[t]();
});

for (let i = 0; i < 12; i++) { console.groupEnd(); }

console.log('test: assert');
console.assert(0 == 1, Date);
console.assert(0 == 1, fixdate);
console.assert(0 == 1, fixdate_ctor);
console.assert(0 == 1, Date.toString());

console.log('test: table (2)');
console.table({ val: Date });
console.table({ val: fixdate });
console.table({ val: fixdate_ctor });
console.table({ val: Date.toString() });
console.table([{ val: Date }]);
console.table([{ val: fixdate }]);
console.table([{ val: fixdate_ctor }]);
console.table([{ val: Date.toString() }]);
console.table({ val: 'foo' }, [Date]);
console.table({ val: 'foo' }, [fixdate]);
console.table({ val: 'foo' }, [fixdate_ctor]);
console.table({ val: 'foo' }, [Date.toString()]);

console.log('test: console object');
console.log(console);
console.log('console tests finished');

process.stdout.write(util.inspect(Date) + '\n');
process.stdout.write(util.inspect(Date()) + '\n');
process.stdout.write(util.inspect(new Date) + '\n');
process.stdout.write(util.inspect(Date.toString()) + '\n');