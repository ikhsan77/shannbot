var test = require('tape');
var isNaN = require('.');

test('isNaN(value)', function (t) {
  t.ok(isNaN("foo" / 1));
  t.end();
});
