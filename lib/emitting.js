(function(){
  var ex, Emitting, __slice = [].slice;
  ex = (typeof exports != 'undefined' && exports !== null) && exports || window;
  ex.Emitting = Emitting = (function(){
    Emitting.displayName = 'Emitting';
    var prototype = Emitting.prototype, constructor = Emitting;
    prototype.on = function(ev, proc){
      var spec, c, next, _i, _len, _ref;
      if (typeof ev === 'number' || typeof ev === 'string') {
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
      var spec, c, ctype, dobj, dprop, ref, p, i, _i, _len, _ref;
      if (typeof ev === 'string') {
        ev = [ev];
      }
      spec = this.evs || (this.evs = {});
      for (_i = 0, _len = ev.length; _i < _len; ++_i) {
        c = ev[_i];
        ctype = typeof c === 'string' && 's' || 'n';
        (typeof dobj != 'undefined' && dobj !== null) || (_ref = [spec, ctype], dobj = _ref[0], dprop = _ref[1]);
        spec = (ref = spec[ctype]) && ref[c];
        if (!spec) {
          dobj = null;
          break;
        }
        if ((_fn()).length !== 1) {
          dobj = null;
        }
        dobj != null || (_ref = [ref, c], dobj = _ref[0], dprop = _ref[1]);
      }
      spec.p && (function(){
        var _to;
        for (i = 0, _to = spec.p.length; i < _to; ++i) {
          if (spec.p[i] === proc) {
            spec.p.splice(i--, 1);
          }
        }
      }());
      if (spec.p.length !== 0) {
        dobj = null;
      }
      if (dobj) {
        delete dobj[dprop];
      }
      return this;
      function _fn(){
        var _results = [];
        for (p in ref) {
          _results.push(p);
        }
        return _results;
      }
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
          } else {
            break;
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
          _this.off(ev, _proc);
        }
      };
      return this.on(ev, _proc);
    };
    prototype.one = function(ev, proc){
      var _proc, _this = this;
      _proc = function(){
        proc.apply(_this, arguments);
        _this.off(ev, _proc);
      };
      this.on(ev, _proc);
    };
    function Emitting(){}
    return Emitting;
  }());
}).call(this);
