'use strict';

var BUTTON_WIDTH = 40;
var BUTTON_HEIGHT = 62;
var ESC_KEYCODE = 27;
// var ENTER_KEYCODE = 13; пока не использую чтобы не было ошибок Вообще нахер не нужна так как батон в любом случае реагирует на enter?
var formCard = document.querySelector('.notice__form');
var fieldsets = formCard.querySelectorAll('fieldset');
var map = document.querySelector('.map');

var mapFadded = function () {
  map.classList.remove('map--faded');
};

var generateRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var renderAdsArray = function () {
  var ads = [];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира',
    'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
    'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  var types = ['flat', 'house', 'bungalo'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var times = ['12:00', '13:00', '14:00'];
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

var generateButton = function (ads) {
  var template = document.querySelector('template').content.querySelector('.map__pin');
  var mapPin = document.querySelector('.map__pins');

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

var showMapCard = function (ad) {
  var templateCard = document.querySelector('template').content.querySelector('.map__card');
  var popupTemplate = templateCard.cloneNode(true);
  var mapCard = document.querySelector('.map');
  var listFeatures = popupTemplate.querySelector('.popup__features');
  while (listFeatures.firstChild) {
    listFeatures.removeChild(listFeatures.firstChild);
  }
  for (var j = 0; j < ad.offer.features.length; j++) {
    var newFeatures = document.createElement('li');
    newFeatures.className = 'feature feature--' + ad.offer.features[j];
    listFeatures.appendChild(newFeatures);
  }
  var paragraphs = popupTemplate.querySelectorAll('p');
  popupTemplate.querySelector('h3').textContent = ad.offer.title;
  popupTemplate.querySelector('p small').textContent = ad.offer.address;
  popupTemplate.querySelector('.popup__price').textContent = ad.offer.price + ' \u20BD' + '/ночь';
  popupTemplate.querySelector('h4').textContent = ad.offer.type;
  paragraphs[2].textContent = ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей';
  paragraphs[3].textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  paragraphs[4].textContent = ad.offer.description;
  popupTemplate.querySelector('.popup__avatar').setAttribute('src', ad.author.avatar);

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

var onButtonMouseup = function () {
  formCard.classList.remove('notice__form--disabled');
  showMap();
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled', 'disabled');
  }
  var mapPins = document.querySelector('.map__pins');
  mapPins.addEventListener('click', showMapPins);
};


var showMapPins = function (event) {
  var targetElement = event.target.closest('button');
  var mapPins = document.querySelectorAll('.map__pin');
  var mapCard = document.querySelector('.popup');
  for (var i = 0; i < mapPins.length; i++) {
    mapPins[i].classList.remove('map__pin--active');
  }
  targetElement.classList.add('map__pin--active');

  var currentTablindex = targetElement.getAttribute('tabindex');
  if (mapCard) {
    map.removeChild(mapCard);
  }
  showMapCard(ads[currentTablindex]);
  var onButtonClick = function () {
    var mapCard = document.querySelector('.popup');
    mapCard.classList.add('hidden');
  };
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      var mapCard = document.querySelector('.popup');
      mapCard.classList.add('hidden');
    }
  };
  var popupClose = document.querySelector('.popup__close');
  popupClose.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onPopupEscPress);
};


var initMap = function () {
  var mapActivate = document.querySelector('.map__pin--main');
  for (var k = 0; k < fieldsets.length; k++) {
    fieldsets[k].setAttribute('disabled', 'disabled');
  }
  mapActivate.addEventListener('mouseup', onButtonMouseup);
};
initMap();
var ads = [];
var showMap = function () {
  var mapActivate = document.querySelector('.map__pin--main');
  mapActivate.removeEventListener('mouseup', onButtonMouseup);
  mapFadded();
  ads = renderAdsArray();
  generateButton(ads);
};


// module4-task2
/*
var fielsetsForm = formCard.querySelectorAll('.form__element');
var inputAdress = fielsetsForm[1].querySelector('input');
var inputPrice = fielsetsForm[3].querySelector('input');
var inputType = fielsetsForm[2].querySelectorAll('option');
var inputTitle = fielsetsForm[0].querySelector('input');
var formSelectTime = fielsetsForm[4].querySelectorAll('select');
var formSelectTimeIn = formSelectTime[0];
var formSelectTimeOut = formSelectTime[1];
var selectRoom =  fielsetsForm[5].querySelectorAll('option');
var selectGuest = fielsetsForm[6].querySelectorAll('option');
var parentGuest = fielsetsForm[6].querySelector('select')

var formDisable = function () {
  inputAdress.setAttribute('required', 'required');
  inputAdress.setAttribute('readonly', 'readonly');
  inputTitle.setAttribute('required', 'required');
  inputTitle.setAttribute('minlength', '30');
  inputTitle.setAttribute('maxlength', '100');
  inputPrice.setAttribute('required', 'required');
  inputPrice.setAttribute('value', '1000');
  inputPrice.setAttribute('max', '1000000');
}
formDisable();

var minPrice = function(){
  if(inputType[1].selected===true){
      inputPrice.setAttribute('min', '0');
  } 
  else if (inputType[0].selected===true){
    inputPrice.setAttribute('min', '1000');
  } else if (inputType[2].selected===true){
    inputPrice.setAttribute('min', '5000');
  } else{
   inputPrice.setAttribute('min', '10000');
  }
}

var guestsForRoom = function (){
	fielsetsForm[6].value = fielsetsForm[5].value;
  for(var i = 0; i < 4; i++){
  if(selectRoom[0].selected === true){
    selectGuest[i].style.display ='none';
    selectGuest[2].style.display ='block';

  } 
  else if (selectRoom[1].selected===true){
    selectGuest[i].style.display ='none';
    selectGuest[2].style.display ='block';
    selectGuest[1].style.display ='block';

  } 
  else if (selectRoom[2].selected===true){
    selectGuest[i].style.display ='block';
    selectGuest[3].style.display ='none';

  } 
else {
    selectGuest[i].style.display ='none';
     selectGuest[3].style.display ='block';
    }
  }
}
var sincroniseTimeOutWithTimeIn = function () {
  formSelectTimeOut.value = formSelectTimeIn.value;
};
var sincroniseTimeInWithTimeOut = function () {
  formSelectTimeIn.value = formSelectTimeOut.value;
};

var formSubmit = function () {
  formCard.setAttribute('action', 'https://js.dump.academy/keksobooking')
}

formSelectTimeIn.addEventListener('change', sincroniseTimeOutWithTimeIn);
formSelectTimeOut.addEventListener('change', sincroniseTimeInWithTimeOut);
formCard.addEventListener('change', minPrice);
formCard.addEventListener('change', guestsForRoom);
formCard.addEventListener('change', formSubmit);
*/
