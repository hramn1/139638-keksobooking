'use strict';

window.utils = (function () {
  var ESC_KEYCODE = 27;
  var POPUP_CLASS = '.popup';

  var generateRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var onErrorRequest = function (errorMessage) {
    var message = document.createElement('div');
    message.classList.add('error-message');
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
  };

  var onButtonClick = function () {
    var mapCard = document.querySelector(POPUP_CLASS);
    var mapPins = document.querySelectorAll('.map__pin');
    mapCard.classList.add('hidden');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].classList.remove('map__pin--active');
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      var mapCard = document.querySelector(POPUP_CLASS);
      var mapPins = document.querySelectorAll('.map__pin');
      mapCard.classList.add('hidden');
      for (var i = 0; i < mapPins.length; i++) {
        mapPins[i].classList.remove('map__pin--active');
      }
    }
  };

  return {
    generateRandomNumber: generateRandomNumber,
    onPopupEscPress: onPopupEscPress,
    onButtonClick: onButtonClick,
  };
})();
