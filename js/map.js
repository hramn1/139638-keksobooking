'use strict';

var BUTTON_WIDTH = 40;
var BUTTON_HEIGHT = 62;

var mapFadded = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира',
  'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
  'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var types = ['flat', 'house', 'bungalo'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var times = ['12:00', '13:00', '14:00'];

function generateRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

var ads = [];
var renderAdsArray = function () {
  for (var i = 1; i <= 8; i++) {
    var locationX = generateRandomNumber(300, 900);
    var locationY = generateRandomNumber(100, 500);
    ads.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'title': titles[generateRandomNumber(0, 7)],
        'address': locationX + ', ' + locationY,
        'price': generateRandomNumber(1000, 1000000),
        'type': types[generateRandomNumber(0, 2)],
        'rooms': generateRandomNumber(1, 5),
        'guests': generateRandomNumber(1, 10),
        'checkin': times[generateRandomNumber(0, 2)],
        'checkout': times[generateRandomNumber(0, 2)],
        'features': features.slice(0, generateRandomNumber(1, 5)),
        'description': '',
        'photos': []
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    });
  }
  return ads;
};
var generateButton = function () {
  var template = document.querySelector('template').content.querySelector('.map__pin');
  var mapPin = document.querySelector('.map__pins');

  for (var j = 0; j < ads.length; j++) {
    var templateButton = template.cloneNode(true);
    templateButton.style.left = (ads[j].location.x - BUTTON_WIDTH / 2) + 'px';
    templateButton.style.top = (ads[j].location.y - BUTTON_HEIGHT / 2) + 'px';
    templateButton.className = 'map__pin';
    templateButton.innerHTML = '<img src=" ' + ads[j].author.avatar + ' " width="40" height="40" draggable="false" >';
    var fragment = document.createDocumentFragment();
    fragment.appendChild(templateButton);
    mapPin.appendChild(fragment);
  }
};

var showMapCard = function () {
  var templateCard = document.querySelector('template').content.querySelector('.map__card');
  var popupTemplate = templateCard.cloneNode(true);
  var mapCard = document.querySelector('.map');
  var popupAdress = popupTemplate.querySelector('p:first-of-type');
  popupTemplate.querySelector('h3').textContent = ads[0].offer.title;
  popupAdress.querySelector('small').textContent = ads[0].offer.address;
  popupTemplate.querySelector('.popup__price').textContent = ads[0].offer.price + '&#x20bd;/ночь';
  popupTemplate.querySelector('h4').textContent = ads[0].offer.type;
  popupTemplate.querySelector('h4 + p').textContent = ads[0].offer.rooms + ' для ' + ads[0].offer.guests + ' гостей';
  popupTemplate.querySelector('p + p').textContent = 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout;
  popupTemplate.querySelector('.popup__features').textContent = ads[0].offer.features;
  popupTemplate.querySelector('p').textContent = ads[0].offer.description;
  popupTemplate.querySelector('.popup__avatar').setAttribute('src', ads[0].author.avatar);
  //var features = popupTemplate.querySelector('.popup__features').textContent;
  //for(var l = 0; l < ads[0].offer.features.length; l++) {
    //var element = features.createElement(li);
  //}
  var typeLive = popupTemplate.querySelector('h4').textContent;
  if (typeLive === 'house') {
    typeLive = 'Дом';
  } else if (typeLive === 'flat') {
    typeLive = 'Квартира';
  } else {
    typeLive = 'Бунгало';
  }
  popupTemplate.querySelector('h4').textContent = typeLive;
  var fragmentMap = document.createDocumentFragment();
  fragmentMap.appendChild(popupTemplate);
  mapCard.appendChild(fragmentMap);
};
var initMap = function () {
  mapFadded();
  ads = renderAdsArray();
  showMapCard();
  generateButton();
};
initMap();
console.log(features);
console.log(ads);