
var util = require('util');
var events = require('events');

var emit = events.EventEmitter.prototype.emit;

function EmitterPoint(transport) {
  if (!(this instanceof EmitterPoint)) return new EmitterPoint(transport);
  events.EventEmitter.call(this);
  var self = this;

  this._transport = transport;
  this._transport.on('data', function (args) {
    emit.apply(self, args);
  });
}
module.exports = EmitterPoint;
util.inherits(EmitterPoint, events.EventEmitter);

EmitterPoint.prototype.emit = function () {
  var args = [];
  for (var i = 0, l = arguments.length; i < l; i++) args.push(arguments[i]);
  this._transport.write(args);

  return emit.apply(this, args);
};
