'use strict';

window.pin = (function () {
  var BUTTON_WIDTH = 40;
  var BUTTON_HEIGHT = 62;
  var formCard = document.querySelector('.notice__form');
  var fieldsets = formCard.querySelectorAll('fieldset');
  var filter = document.querySelector('.map__filters');
  var houseFilter = filter.querySelector('#housing-type');
  var priceFilter = filter.querySelector('#housing-price');
  var roomsFilter = filter.querySelector('#housing-rooms');
  var guestsFilter = filter.querySelector('#housing-guests');
  var featyresFilter = filter.querySelector('#housing-features');
  var localAds = [];

  var generateButton = function (ads) {
    var template = document.querySelector('template').content.querySelector('.map__pin');
    var mapPin = document.querySelector('.map__pins');
    for (var j = 0; j < 4; j++) {
      localAds = ads;
      var templateButton = template.cloneNode(true);
      templateButton.style.left = (localAds[j].location.x - BUTTON_WIDTH / 2) + 'px';
      templateButton.style.top = (localAds[j].location.y - BUTTON_HEIGHT / 2) + 'px';
      templateButton.className = 'map__pin';
      templateButton.setAttribute('tabindex', j);
      templateButton.innerHTML = '<img src=" ' + localAds[j].author.avatar + ' " width="40" height="40" draggable="false">';
      var fragment = document.createDocumentFragment();
      fragment.appendChild(templateButton);
      mapPin.appendChild(fragment);
    }
  };

  var deleteAllPins = (function () {
    var pins = window.map.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  });

  var updatePins = function () {
    var filterAds = localAds;
    deleteAllPins();

    var onChangeFilterType = function () {
      var updateFilterFlat = filterAds.filter(function (type) {
        return type.offer.type === 'flat';
      });
      var updateFilterBungalo = filterAds.filter(function (type) {
        return type.offer.type === 'bungalo';
      });
      var updateFilterHouse = localAds.filter(function (type) {
        return type.offer.type === 'house';
      });

      switch (houseFilter.value) {
        case 'house':
          filterAds = updateFilterHouse;

          break;

        case 'flat':
          filterAds = updateFilterFlat;

          break;

        case 'bungalo':
          filterAds = updateFilterBungalo;

          break;

        default:
          filterAds = localAds;
      }
      return filterAds;

    };

    var onChangeFilterPrice = function () {
      var updateFilterCheap = filterAds.filter(function (price) {
        return price.offer.price <= 10000;
      });
      var updateFilterMiddle = filterAds.filter(function (price) {
        return price.offer.price > 10000 && price.offer.price < 50000;
      });
      var updateFilterReach = filterAds.filter(function (price) {
        return price.offer.price >= 50000;
      });


      switch (priceFilter.value) {
        case 'low':
          filterAds = updateFilterCheap;
          break;

        case 'middle':
          filterAds = updateFilterMiddle;
          break;

        case 'hight':
          filterAds = updateFilterReach;
          break;

        default:
          filterAds = localAds;
      }
      return filterAds;
    };

    var onChangeFilterRoom = function () {
      var updateFilterOneRoom = filterAds.filter(function (rooms) {
        return rooms.offer.rooms === 1;
      });
      var updateFilterTwoRoom = filterAds.filter(function (rooms) {
        return rooms.offer.rooms === 2;
      });
      var updateFilterThreeRoom = filterAds.filter(function (rooms) {
        return rooms.offer.rooms === 3;
      });

      switch (roomsFilter.value) {
        case '1':
          filterAds = updateFilterOneRoom;
          break;

        case '2':
          filterAds = updateFilterTwoRoom;
          break;
        case '3':
          filterAds = updateFilterThreeRoom;
          break;
        default:
          filterAds = localAds;
      }
      return filterAds;
    };

    var onChangeFilterGuest = function () {
      var updateFilterOneGuest = filterAds.filter(function (guests) {
        return guests.offer.guests === 1;
      });
      var updateFilterTwoGuest = filterAds.filter(function (guests) {
        return guests.offer.guests === 2;
      });
      deleteAllPins();

      switch (guestsFilter.value) {
        case '1':
          filterAds = updateFilterOneGuest;
          break;

        case '2':
          filterAds = updateFilterTwoGuest;
          break;
        default:
          filterAds = localAds;
      }
      return filterAds;
    };

    var onChangeFilterFeatures = function () {
      var featuresFilters = featyresFilter.querySelectorAll('#housing-features [type="checkbox"]:checked');
      [].forEach.call(featuresFilters, function (item) {
        filterAds = filterAds.filter(function (offerData) {
          return offerData.offer.features.indexOf(item.value) >= 0;
        });
      });
      return filterAds;
    };

    houseFilter.addEventListener('change', onChangeFilterType());
    priceFilter.addEventListener('change', onChangeFilterPrice());
    roomsFilter.addEventListener('change', onChangeFilterRoom());
    guestsFilter.addEventListener('change', onChangeFilterGuest());
    featyresFilter.addEventListener('change', onChangeFilterFeatures());
    // onChangeFilterFeatures()
    // onChangeFilterType()
    // onChangeFilterPrice()
    // onChangeFilterGuest()
    // onChangeFilterRoom()

    generateButton(filterAds);
  };

  filter.addEventListener('change', updatePins);

  var onButtonMouseup = function () {
    formCard.classList.remove('notice__form--disabled');
    window.map.showMap();
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled', 'disabled');
    }
    var mapPins = document.querySelector('.map__pins');
    mapPins.addEventListener('click', showMapPins);
  };


  var showMapPins = function (event) {
    var targetElement = event.target.closest('button');
    if (targetElement && !targetElement.classList.contains('map__pin--main')) {
      var mapPins = document.querySelectorAll('.map__pin');
      var mapCard = document.querySelector('.popup');
      for (var i = 0; i < mapPins.length; i++) {
        mapPins[i].classList.remove('map__pin--active');
      }
      targetElement.classList.add('map__pin--active');
      var currentTablindex = targetElement.getAttribute('tabindex');
      if (mapCard) {
        window.map.map.removeChild(mapCard);
        if (mapCard.classList.contains('popup')) {
          mapCard.classList.remove('hidden');
        }
      }
      window.showCard.showMapCard(localAds[currentTablindex]);

      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', window.utils.onButtonClick);
      document.addEventListener('keydown', window.utils.onPopupEscPress);
    }
  };

  var initMap = function () {
    var mapActivate = document.querySelector('.map__pin--main');
    for (var k = 0; k < fieldsets.length; k++) {
      fieldsets[k].setAttribute('disabled', 'disabled');
    }
    mapActivate.addEventListener('mousedown', onButtonMouseup);
  };

  initMap();

  return {
    onButtonMouseup: onButtonMouseup,
    generateButton: generateButton,
    BUTTON_WIDTH: BUTTON_WIDTH,
    BUTTON_HEIGHT: BUTTON_HEIGHT,
  };
})();
