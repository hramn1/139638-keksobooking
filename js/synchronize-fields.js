'use strict';

window.synchronizeFields = (function () {
  var sync = function (fieldOne, fieldSec, fieldOneValues, fieldSecValues, synchronize) {
    var fieldOneIndex = fieldOneValues.indexOf(fieldOne.value);
    var fieldSecValue = fieldSecValues[fieldOneIndex];

    synchronize(fieldSec, fieldSecValue);
  };
  return {
    sync: sync
  };

})();
