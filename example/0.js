(function(){
  var util, Emitting, e, argemit, argon;
  util = require('util');
  Emitting = require('../lib/emitting').Emitting;
  e = new Emitting;
  argemit = function(arg){
    e.emit(arg, arg);
  };
  argon = function(arg, descr){
    e.on(arg, function(ev){
      console.log("event: " + (descr || util.inspect(arg, false, null)) + ": " + util.inspect(ev, false, null));
    });
  };
  argon([0], "any event");
  argon([1], "top-level event");
  argon(['test', 2, 0], "any test-namespace event with at least two sub-components");
  argon(['test'], "test");
  argon(['test', 'a', 'b'], "any test.a.b event");
  argon(['test', 2, 'c'], "any test.2.c event");
  argon([0, 'test']);
  argon(['test', 0, 'b']);
  argon([0, 'a', 'b', 'c']);
  argon([0, 'a', 0, 'b', 'c']);
  console.log("--------------------------------------------------------------");
  argemit(['top']);
  console.log("--------------------------------------------------------------");
  argemit(['test']);
  console.log("--------------------------------------------------------------");
  argemit(['test', 'a']);
  console.log("--------------------------------------------------------------");
  argemit(['test', 'a', 'b']);
  console.log("--------------------------------------------------------------");
  argemit(['test', 'a', 'b', 'c']);
  console.log("--------------------------------------------------------------");
  argemit(['a', 'b', 'a', 'b', 'c']);
  console.log("--------------------------------------------------------------");
}).call(this);
