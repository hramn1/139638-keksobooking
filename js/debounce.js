'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (func) {
    var prevTimer;

    return function () {
      if (prevTimer) {
        window.clearTimeout(prevTimer);
      }

      prevTimer = window.setTimeout(func, DEBOUNCE_INTERVAL);

      return prevTimer;
    };
  };

})(); 
