(function(){
  var Emitting, e;
  Emitting = require('../lib/emitting').Emitting;
  e = new Emitting;
  e.on('test', console.log);
  e.emit('test', "it's a test!");
  e.off('test', console.log);
  e.emit('test', "here's a second test.");
}).call(this);
