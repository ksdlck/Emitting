(function(){
  var ex, Emitting, util, e, argemit, argon, __slice = [].slice;
  ex = (typeof exports != 'undefined' && exports !== null) && exports || window;
  ex.Emitting = Emitting = (function(){
    Emitting.displayName = 'Emitting';
    var prototype = Emitting.prototype, constructor = Emitting;
    prototype.on = function(ev, proc){
      var spec, c, next, _i, _len;
      if (typeof ev === 'string') {
        ev = [ev];
      }
      spec = this.evs || (this.evs = {});
      for (_i = 0, _len = ev.length; _i < _len; ++_i) {
        c = ev[_i];
        switch (typeof c) {
        case 'string':
          (spec.s || (spec.s = {}))[c] = next = {};
          break;
        case 'number':
          (spec.n || (spec.n = [])).push([c, next = {}]);
        }
        spec = next;
      }
      spec.p = proc;
      return this;
    };
    prototype.off = function(ev, proc){
      if (typeof ev === 'string') {
        ev = [ev];
      }
      return this;
    };
    prototype._emit = function(ev, idx, spec, args){
      var next, num;
      if (ev.length - idx === 0) {
        if (spec.p) {
          spec.p.apply(spec, args);
        }
      } else {
        spec.s && (next = spec.s[ev[idx]]) && this._emit(ev, idx + 1, next, args);
        spec.n && (function(){
          var _i, _ref, _len, _ref2;
          for (_i = 0, _len = (_ref = spec.n).length; _i < _len; ++_i) {
            _ref2 = _ref[_i], num = _ref2[0], next = _ref2[1];
            if (num + idx <= ev.length) {
              this._emit(ev, num === 0
                ? ev.length
                : idx + num, next, args);
            }
          }
        }.call(this));
      }
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
  argon([0], "event: any event");
  argon([1], "event: top-level event");
  argon(['test', 2, 0], "event: any test-namespace event with at least two sub-components");
  argon(['test'], "event: test");
  argon(['test', 'a', 'b'], "event: any test.a.b event");
  argon(['test', 2, 'c'], "event: any test.2.c event");
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
}).call(this);
