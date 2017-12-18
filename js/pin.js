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
  var localAds;
  var filterAds = [];

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

  var onChangeFilterType = function (evt) {
    var updateFilterFlat = localAds.filter(function (type) {
      return type.offer.type === 'flat';
    });
    var updateFilterBungalo = localAds.filter(function (type) {
      return type.offer.type === 'bungalo';
    });
    var updateFilterHouse = localAds.filter(function (type) {
      return type.offer.type === 'house';
    });

    deleteAllPins();
    switch (evt.target.value) {
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
    generateButton(filterAds);
  };
  var onChangeFilterPrice = function (evt) {
    var updateFilterCheap = localAds.filter(function (price) {
      return price.offer.price <= 10000;
    });
    var updateFilterMiddle = localAds.filter(function (price) {
      return price.offer.price > 10000 && price.offer.price < 50000;
    });
    var updateFilterReach = localAds.filter(function (price) {
      return price.offer.price >= 50000;
    });
    deleteAllPins();

    switch (evt.target.value) {
      case 'low':
        localAds = updateFilterCheap;
        generateButton(localAds);
        break;

      case 'middle':
        localAds = updateFilterMiddle;
        generateButton(localAds);
        break;

      case 'hight':
        localAds = updateFilterReach;
        generateButton(localAds);
        break;

      default:
        generateButton(localAds);
    }
  };

  var onChangeFilterRoom = function (evt) {
    var updateFilterOneRoom = localAds.filter(function (rooms) {
      return rooms.offer.rooms === 1;
    });
    var updateFilterTwoRoom = localAds.filter(function (rooms) {
      return rooms.offer.rooms === 2;
    });
    var updateFilterThreeRoom = localAds.filter(function (rooms) {
      return rooms.offer.rooms === 3;
    });
    deleteAllPins();

    switch (evt.target.value) {
      case '1':
        localAds = updateFilterOneRoom;
        generateButton(localAds);
        break;

      case '2':
        localAds = updateFilterTwoRoom;
        generateButton(localAds);
        break;
      case '3':
        localAds = updateFilterThreeRoom;
        generateButton(localAds);
        break;
      default:
        generateButton(localAds);
    }
  };

  var onChangeFilterGuest = function (evt) {
    var updateFilterOneGuest = localAds.filter(function (guests) {
      return guests.offer.guests === 1;
    });
    var updateFilterTwoGuest = localAds.filter(function (guests) {
      return guests.offer.guests === 2;
    });
    deleteAllPins();

    switch (evt.target.value) {
      case '1':
        localAds = updateFilterOneGuest;
        generateButton(localAds);
        break;

      case '2':
        localAds = updateFilterTwoGuest;
        generateButton(localAds);
        break;
      default:
        generateButton(localAds);
    }
  };

  var onChangeFilterFeatures = function () {

		  }
		}
		


  houseFilter.addEventListener('change', onChangeFilterType);
  priceFilter.addEventListener('change', onChangeFilterPrice);
  roomsFilter.addEventListener('change', onChangeFilterRoom);
  guestsFilter.addEventListener('change', onChangeFilterGuest);
  featyresFilter.addEventListener('change', onChangeFilterFeatures);

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
    mapActivate.addEventListener('mouseup', onButtonMouseup);
  };

  initMap();

  return {
    onButtonMouseup: onButtonMouseup,
    generateButton: generateButton,
    BUTTON_WIDTH: BUTTON_WIDTH,
    BUTTON_HEIGHT: BUTTON_HEIGHT,
  };
})();
