;(function (gS) {
  // A boolean library to create new booleans
  var bool = {
    showErrors: true,
  },

  // Inspired by OmegaNum

  // prototype
  P = {},
    // Booleans [custom]
  B = {},
    // Constants
  Q = {};

  B.Maybe = 0.5;
  B.almostNever = 0.1;
  B.notSure = 0.6;
  B.almost = 0.8;
  B.almostAlways = 0.9;

  P.compareTo = P.cmp = function (otherBool) {
    if (!(otherBool instanceof bool)) otherBool=new bool(otherBool);
    if(Number.isNaN(this.val)||Number.isNaN(otherBool)) return NaN;
    
    var thisVal = this.val;
    var otherVal = otherBool.val;

    if (thisVal < otherVal) return -1;
    if (thisVal > otherVal) return 1;
    if (thisVal === otherVal) return 0;
  };

  Q.compareTo = Q.cmp = function (thisbool, otherbool) {
    return new bool(thisbool).cmp(otherbool);
  };

  P.lessThan = P.lt = function (y) {
    return this.cmp(y) < 0;
  };

  Q.lessThan = Q.lt = function (x, y) {
    return new bool(x).lt(y);
  };

  P.greatherThan = P.gt = function (y) {
    return this.cmp(y) > 0;
  };

  Q.greatherThan = Q.gt = function (x,y) {
    return new bool(x).gt(y);
  };

  P.greatherThanOrEqualTo = P.gte = function (y) {
    return this.cmp(y) >= 0;
  };

  Q.greatherThanOrEqualTo = Q.gte = function (x,y) {
    return new bool(x).gte(y)
  };

  P.lessThanOrEqualTo = P.lte = function (y) {
    return this.cmp(y) <= 0
  };

  Q.lessThanOrEqualTo = Q.lte = function (x,y) {
    return new bool(x).lte(y)
  };

  P.equalsTo = P.eq = function (y) {
    return this.cmp(y) === 0
  }

  Q.equalsTo = Q.eq = function (x,y) {
    return new bool(x).eq(y)
  }

  function clone(x) {
    var i, k
    function bool(inp) {
      var x=this;
      if(!(x instanceof bool)) return new bool(x);
      x.constructor = bool
        
      if (inp === null || inp === undefined) {
        this.val = NaN;
        return;
      }

      if (inp >= 1) {
        this.val = true
      } else if (inp <= 0) {
        this.val = false
      }

      if (inp > 0 && inp < 1) {
        this.val = Math.random() <= inp;

        if (this.val === true) {
          return true
        } else {
          return false
        }
      }
    }

    bool.prototype = P;
    bool.clone = clone;

    if (x === void 0) x = {};

    var t = ['showErrors'];
    for (i = 0; i < t.length; i++) {
      k = t[i];
      if (x.hasOwnProperty(k)) {
        bool[k] = x[k]; // Safely copies the setting onto your new constructor function
      }
    }

    return bool
  };

  bool=clone(bool);

  if (typeof module != 'undefined' && module.exports) {
    module.exports = bool;
  } else {
    var globalTarget = gS || (typeof window !== 'undefined' ? window : globalThis);
    globalTarget.bool = bool;
  }

})(this);