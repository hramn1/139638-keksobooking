'use strict';

window.showCard = (function () {
  var listFeatures = window.data.listFeatures;
  var showMapCard = function (ad, callback) {
    while (listFeatures.firstChild) {
      listFeatures.removeChild(listFeatures.firstChild);
    }
    for (var j = 0; j < ad.offer.features.length; j++) {
      var newFeatures = document.createElement('li');
      newFeatures.className = 'feature feature--' + ad.offer.features[j];
      listFeatures.appendChild(newFeatures);
    }

    window.data.dataPopup(ad);

    if (typeof callback === 'function') {
      callback();
    }
  };
  return {
    showMapCard: showMapCard,
  };
})();
