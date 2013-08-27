
var test = require('tap').test;
var stream = require('stream');

var emitterpoint = require('./emitterpoint.js');

var A = new stream.PassThrough({objectMode: true});
var B = new stream.PassThrough({objectMode: true});
    A.pipe(B);

var eeA = emitterpoint(A);
var eeB = emitterpoint(B);

test('emitting on objects emits on it self', function (t) {
  eeA.once('foo', function (bar) {
    t.equal(bar, 'bar');
    t.end();
  });
  eeA.emit('foo', 'bar');
});

test('emits get written to the stream', function (t) {
  eeB.once('foo', function (bar) {
    t.equal(bar, 'bar');
    t.end();
  });
  eeA.emit('foo', 'bar');
});
