/*
 * For simplest possible usage (uses default settings)
 */
const cconsole = require("../dist/cconsole.js")

cconsole.time();
cconsole.clear();

cconsole.info('cyan (light blue) color for "info"')
cconsole.warn('yellow/orange color for "warn"')
cconsole.error('red background, yellow text = "error"')

cconsole.log("TEST 55555: 'log'", { testObject: "testObject" });
cconsole.info("TEST 55555: 'info'", { testObject: "testObject" });
cconsole.warn("TEST 55555: 'warn'", { testObject: "testObject" });
cconsole.table([[1, 2, 3, 4, 5], ['a', 'b', 'c', 'd', 'e']]);
cconsole.trace('TEST 55555 log trace');
cconsole.error(new Error('TEST 55555 log error'));
cconsole.log({ one: 1, two: { a: "a", b: "b" } });
cconsole.log([1, 2, 3, { fourth: "isAnObject" }]);
cconsole.log(function () {
  Date.now();
}());

cconsole.timeEnd();
