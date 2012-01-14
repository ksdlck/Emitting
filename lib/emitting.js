(function(){
  var ex, Emitting, ExtendedEmitting, e, __slice = [].slice;
  ex = typeof exports === 'undefined' && window || {};
  ex.Emitting = Emitting = (function(){
    Emitting.displayName = 'Emitting';
    var prototype = Emitting.prototype, constructor = Emitting;
    prototype._divargs = function(){
      var args, arg, ev, proc, _res;
      args = __slice.call(arguments);
      if (args[0] instanceof Array && args[0].length === 1 && typeof args[0][0] === 'number') {
        console.log("EM: first choice");
        return [[args[0]], args[1]];
      } else if (args[0] instanceof Array && args[0].length > 0) {
        console.log("EM: second choice");
        return [args[0], args[1]];
      } else {
        console.log("EM: third choice");
        _res = [];
        do {
          _res.push(arg = args.shift());
        } while (typeof arg !== 'function');
        ev = _res;
        proc = args.shift();
        return [ev, proc];
      }
    };
    prototype.on = function(){
      var ev, proc, _ref;
      _ref = this._divargs.apply(this, arguments), ev = _ref[0], proc = _ref[1];
      console.log("on:\n  ev: " + JSON.stringify(ev) + "\n  proc: " + proc);
      return this;
    };
    prototype.off = function(){
      var ev, proc, _ref;
      _ref = this._divargs.apply(this, arguments), ev = _ref[0], proc = _ref[1];
      console.log("off:\n  ev: " + ev + "\n  proc: " + proc);
      return this;
    };
    function Emitting(){}
    return Emitting;
  }());
  ex.ExtendedEmitting = ExtendedEmitting = (function(superclass){
    ExtendedEmitting.displayName = 'ExtendedEmitting';
    var prototype = __extend(ExtendedEmitting, superclass).prototype, constructor = ExtendedEmitting;
    prototype.many = function(ev, times, proc){
      var _proc, _this = this;
      _proc = function(){
        proc.apply(_this, arguments);
        if (--times === 0) {
          _this.off(_proc);
        }
      };
      this.on(ev(_proc));
    };
    prototype.once = function(ev, proc){
      var _proc, _this = this;
      _proc = function(){
        proc.apply(_this, arguments);
        _this.off(_proc);
      };
      this.on(ev(_proc));
    };
    function ExtendedEmitting(){}
    return ExtendedEmitting;
  }(Emitting));
  e = new Emitting;
  e.on([[1]], function(){
    console.log("ANY TOP-LEVEL EVENT");
  });
  e.on([1], function(){
    console.log("ANY TOP-LEVEL EVENT");
  });
  e.on([[]], function(){
    console.log("ANY EVENT");
  });
  e.on([], function(){
    console.log("ANY EVENT");
  });
  e.on([[], 'test'], function(){
    console.log("TEST EVENT IN ANY NAMESPACE");
  });
  e.on([], 'test', function(){
    console.log("TEST EVENT IN ANY NAMESPACE");
  });
  e.on(['test', []], function(){
    console.log("ANY EVENT IN THE TEST TOP-LEVEL NAMESPACE");
  });
  e.on('test', [], function(){
    console.log("ANY EVENT IN THE TEST TOP-LEVEL NAMESPACE");
  });
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
