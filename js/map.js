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

  var dataLoadAds = function (data) {
    ads = data;
  };

  window.backend.load(dataLoadAds, window.utils.onErrorRequest);


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

  return {
    showMap: showMap,
    ads: ads,
    map: map,
    onMouseDown: onMouseDown,
  };
})();
