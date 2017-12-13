'use strict';

window.synchronizeFields = (function () {
  var sync = function (firstInput, secInput, firstInputValues, secInputValues, syncFunction) {
    var firstInputIndex = firstInputValues.indexOf(firstInput.value);
    var secInputValue = secInputValues[firstInputIndex];
    console.log(firstInput.value)
    console.log(firstInputValues)
    console.log(firstInputIndex)
    console.log(secInputValue)

    syncFunction(secInput, secInputValue);
};
  return {
    sync: sync
  };

})();