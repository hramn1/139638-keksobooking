'use strict';

window.pin = (function () {
  var BUTTON_WIDTH = 40;
  var BUTTON_HEIGHT = 62;
  var formCard = document.querySelector('.notice__form');
  var fieldsets = formCard.querySelectorAll('fieldset');
  var filter = document.querySelector('.map__filters');
  var houseFilter = filter.querySelector('#housing-type');
  var priceFilter = filter.querySelector('#housing-price');
  var roomsFilter = filter.querySelector('#housing-room-number');
  var guestsFilter = filter.querySelector('#housing-guests-number');
  var localAds;

  var generateButton = function (ads) {
    var template = document.querySelector('template').content.querySelector('.map__pin');
    var mapPin = document.querySelector('.map__pins');

    for (var j = 0; j < 4; j++) {
      localAds = ads;
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

  var onChangeFilter = function () {

  }
  houseFilter.addEventListener('change', onChangeFilter)
  

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
