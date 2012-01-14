(function(){
  var Emitting, e;
  Emitting = require('../lib/emitting').Emitting;
  e = new Emitting;
  e.many('test', 2, function(){
    console.log("you should only see me twice");
  });
  e.emit('test');
  e.emit('test');
  e.emit('test');
}).call(this);
