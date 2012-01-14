(function(){
  var Emitting, e;
  Emitting = require('../lib/emitting').Emitting;
  e = new Emitting;
  e.one('test', function(){
    console.log("you should only see me once");
  });
  e.emit('test');
  e.emit('test');
}).call(this);
