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

  // var renderAdsArray = function () {
  //   var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира',
  //     'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
  //     'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  //   var types = ['flat', 'house', 'bungalo'];
  //   var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  //   var times = ['12:00', '13:00', '14:00'];
  //   for (var i = 1; i <= 8; i++) {
  //     var locationX = window.utils.generateRandomNumber(300, 900);
  //     var locationY = window.utils.generateRandomNumber(100, 500);
  //     ads.push({
  //       'author': {
  //         'avatar': 'img/avatars/user0' + i + '.png'
  //       },
  //       'offer': {
  //         'title': titles[window.utils.generateRandomNumber(0, 7)],
  //         'address': locationX + ', ' + locationY,
  //         'price': window.utils.generateRandomNumber(1000, 1000000),
  //         'type': types[window.utils.generateRandomNumber(0, 2)],
  //         'rooms': window.utils.generateRandomNumber(1, 5),
  //         'guests': window.utils.generateRandomNumber(1, 10),
  //         'checkin': times[window.utils.generateRandomNumber(0, 2)],
  //         'checkout': times[window.utils.generateRandomNumber(0, 2)],
  //         'features': features.slice(0, window.utils.generateRandomNumber(1, 5)),
  //         'description': '',
  //         'photos': []
  //       },
  //       'location': {
  //         'x': locationX,
  //         'y': locationY
  //       }
  //     });
  //   }
  //   return ads;
  // };

  var dataLoadAds = function(data){
    ads = data;
  }

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
