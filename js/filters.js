'use strict';

window.filter = (function () {
  var BUTTON_WIDTH = 40;
  var BUTTON_HEIGHT = 62;

  var filterType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterGuestsNumber = document.querySelector('#housing-guests');
  var filterFeatures = document.querySelector('#housing-features');


  var filterTypeValue = 'any';
  var filterPriceValue = 'any';
  var filterRoomsValue = 'any';
  var filterGuestsNumberValue = 'any';
  var filterFeaturesValue = 'any';

  filterType.addEventListener('change', function (evt) {
    filterTypeValue = evt.target.value;
    window.debounce(updatePins);
  });

  filterPrice.addEventListener('change', function (evt) {
    filterPriceValue = evt.target.value;
    window.debounce(updatePins);
  });

  filterRooms.addEventListener('change', function (evt) {
    filterRoomsValue = evt.target.value;
    window.debounce(updatePins);
  });

  filterGuestsNumber.addEventListener('change', function (evt) {
    filterGuestsNumberValue = evt.target.value;
    window.debounce(updatePins);
  });

  filterFeatures.addEventListener('change', function (evt) {
    filterFeaturesValue = evt.target.value;
    window.debounce(updatePins);
  });

  var filterAds = function (ad) {
    var adOffer = ad.offer;
    var adPrice = adOffer.price;

    if (filterTypeValue !== 'any' && adOffer.type !== filterTypeValue) {
      return false;
    }
    if (filterPriceValue !== 'any' &&
      (filterPriceValue === 'low' && adPrice >= 10000
      || filterPriceValue === 'middle' && (adPrice <= 10000 || adPrice >= 50000)
      || filterPriceValue === 'high' && adPrice <= 50000)) {
      return false;
    }

    if (filterRoomsValue !== 'any' && adOffer.rooms !== +filterRoomsValue) {
      return false;
    }

    if (filterGuestsNumberValue !== 'any' && adOffer.guests !== +filterGuestsNumberValue) {
      return false;
    }

    if (filterFeaturesValue !== 'any' && adOffer.features[0] !== filterFeaturesValue && adOffer.features[1] !== filterFeaturesValue &&
       adOffer.features[2] !== filterFeaturesValue && adOffer.features[3] !== filterFeaturesValue && adOffer.features[4] !== filterFeaturesValue &&
      adOffer.features[5] !== filterFeaturesValue) {
      return false;
    }

    return true;
  };

  var updatePins = function () {
    deleteAllPins();
    var filteredAds = window.ads.filter(filterAds);
    generateAds(filteredAds);
    // window.pin.generateButton(filteredAds);
  };

  var deleteAllPins = (function () {
    var pins = window.map.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  });

  var generateAds = function (ads) {
    var template = document.querySelector('template').content.querySelector('.map__pin');
    var mapPin = document.querySelector('.map__pins');
    if (ads.length > 5) {
      ads.length = 5;
    }
    for (var j = 0; j < ads.length; j++) {
      var templateButton = template.cloneNode(true);
      templateButton.style.left = (ads[j].location.x - BUTTON_WIDTH / 2) + 'px';
      templateButton.style.top = (ads[j].location.y - BUTTON_HEIGHT / 2) + 'px';
      templateButton.className = 'map__pin';
      templateButton.setAttribute('tabindex', j);
      templateButton.innerHTML = '<img src=" ' + ads[j].author.avatar + ' " width="40" height="40" draggable="false">';
      var fragment = document.createDocumentFragment();
      fragment.appendChild(templateButton);
      mapPin.appendChild(fragment);
    }
  };
})();
