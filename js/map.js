'use strict';

window.map = (function () {
  var MIN_HEIGHT_Y = 100;
  var MAX_HEIGHT_Y = 500;
  var map = document.querySelector('.map');
  var ads = [];
  var mapActivate = document.querySelector('.map__pin--main');

  var mapFadded = function () {
    map.classList.remove('map--faded');
  };

  var onMouseDown = function (event) {
    event.preventDefault();
    mapActivate.style.zIndex = '10';

    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var cordsY = mapActivate.offsetTop - shift.y;
      var cordsX = mapActivate.offsetLeft - shift.x;
      mapActivate.style.left = cordsX + 'px';

      if (mapActivate.offsetTop < MIN_HEIGHT_Y) {
        cordsY = MIN_HEIGHT_Y;
      } else if (mapActivate.offsetTop > MAX_HEIGHT_Y) {
        cordsY = MAX_HEIGHT_Y;
      }

      mapActivate.style.top = cordsY + 'px';
      window.form.inputAdress.value = 'x: ' + cordsX + ' y: ' + cordsY;
    };

    var onMouseUp = function () {
      map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var showMap = function () {
    mapActivate.removeEventListener('mouseup', window.pin.onButtonMouseup);
    mapFadded();
    mapActivate.addEventListener('mousedown', onMouseDown);
    window.pin.generateButton(ads);
  };

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
    var filteredAds = ads.filter(filterAds);
    window.pin.generateButton(filteredAds);
  };

  var deleteAllPins = (function () {
    var pins = window.map.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  });
  var dataLoadAds = function (data) {
    ads = data;
  };

  window.backend.load(dataLoadAds, window.utils.onErrorRequest);

  return {
    showMap: showMap,
    ads: ads,
    map: map,
    onMouseDown: onMouseDown,
  };
})();
