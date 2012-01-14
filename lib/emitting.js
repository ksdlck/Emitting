(function(){
  var ex, Emitting, util, e, argemit, argon, __slice = [].slice;
  ex = (typeof exports != 'undefined' && exports !== null) && exports || window;
  ex.Emitting = Emitting = (function(){
    Emitting.displayName = 'Emitting';
    var prototype = Emitting.prototype, constructor = Emitting;
    prototype.on = function(ev, proc){
      var spec, c, next, _i, _len, _ref;
      if (typeof ev === 'string') {
        ev = [ev];
      }
      spec = this.evs || (this.evs = {});
      for (_i = 0, _len = ev.length; _i < _len; ++_i) {
        c = ev[_i];
        switch (typeof c) {
        case 'string':
          next = (_ref = spec.s || (spec.s = {}))[c] || (_ref[c] = {});
          break;
        case 'number':
          next = (_ref = spec.n || (spec.n = {}))[c] || (_ref[c] = {});
        }
        spec = next;
      }
      (spec.p || (spec.p = [])).push(proc);
      return this;
    };
    prototype.off = function(ev, proc){
      if (typeof ev === 'string') {
        ev = [ev];
      }
      return this;
    };
    prototype._emit = function(ev, idx, spec, args){
      var proc, next, num, i;
      if (ev.length - idx === 0) {
        spec.p && (function(){
          var _i, _ref, _len;
          for (_i = 0, _len = (_ref = spec.p).length; _i < _len; ++_i) {
            proc = _ref[_i];
            proc.apply(null, args);
          }
        }());
      }
      spec.s && (next = spec.s[ev[idx]]) && this._emit(ev, idx + 1, next, args);
      spec.n && (function(){
        var _to;
        for (num in spec.n) {
          next = spec.n[num];
          num = parseInt(num);
          if (num === 0) {
            for (i = idx, _to = ev.length; i <= _to; ++i) {
              this._emit(ev, i, next, args);
            }
          } else if (idx + num <= ev.length) {
            this._emit(ev, idx + num, next, args);
          }
        }
      }.call(this));
    };
    prototype.emit = function(ev){
      var args;
      args = __slice.call(arguments, 1);
      if (typeof ev === 'string') {
        ev = [ev];
      }
      this._emit(ev, 0, this.evs || (this.evs = {}), args);
      return this;
    };
    prototype.many = function(ev, times, proc){
      var _proc, _this = this;
      _proc = function(){
        proc.apply(_this, arguments);
        if (--times === 0) {
          _this.off(ev(_proc));
        }
      };
      return this.on(ev(_proc));
    };
    prototype.one = function(ev, proc){
      var _proc, _this = this;
      _proc = function(){
        proc.apply(_this, arguments);
        _this.off(ev(_proc));
      };
      this.on(ev(_proc));
    };
    function Emitting(){}
    return Emitting;
  }());
  util = require('util');
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
  console.log(util.inspect(e, false, null));
  console.log("--------------------------------------------------------------");
  argemit(['rofl']);
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
