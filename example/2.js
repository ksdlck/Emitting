(function(){
  var Emitting, e, l1;
  Emitting = require('../lib/emitting').Emitting;
  e = new Emitting;
  e.on('test', l1 = function(){
    console.log("i'm the first test listener, you should only see me once");
  });
  e.on('test', function(){
    console.log("i'm the second test listener, you should see me twice");
  });
  e.emit('test');
  e.off('test', l1);
  e.emit('test');
}).call(this);
