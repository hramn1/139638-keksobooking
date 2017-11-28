'use strict';

var BUTTON_WIDTH = 40;
var BUTTON_HEIGHT = 62;


var map = document.querySelector('.map');
map.classList.remove('map--faded');


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


for (var i = 1; i <= 8; i++) {
  var locationX = generateRandomNumber(300, 900);
	var locationY = generateRandomNumber(100, 500);
ads.push({
	"author": {
		avatar: 'img/avatars/user0' + i + '.png'
	},
	"offer": {
		"title": titles[generateRandomNumber(0, 7)],
		"address": locationX + ', ' + locationY,
		"price": generateRandomNumber(1000, 1000000),
		"type": types[generateRandomNumber(0, 2)],
		"rooms": generateRandomNumber(1, 5),
		"guests": generateRandomNumber(1, 10),
		"checkin": times[generateRandomNumber(0, 2)],
		"checkout": times[generateRandomNumber(0, 2)],
		"features": features.slice(0, generateRandomNumber(1, 5)),
		"description": "",
		"photos": []
	},
	"location": {
		"x": locationX,
		"y": locationY
	}
	});
	}
	console.log(ads);
	var template = document.querySelector('template').content.querySelector('.map__pin');
	var mapPin = document.querySelector('.map__pins');
	for (var j = 1; j<=8; j++){
	var templateButton = template.cloneNode(true);
	templateButton.style.left = ads[j].location.x - BUTTON_WIDTH / 2 + 'px';
	templateButton.style.top = ads[j].location.y - BUTTON_HEIGHT / 2 + 'px';
	templateButton.className = 'map__pin';
	templateButton.innerHTML = '<img src=" ' + ads[j].author.avatar + ' " width="40" height="40" draggable="false">'
	var fragment = document.createDocumentFragment()
	fragment.appendChild(templateButton);
	mapPin.appendChild(fragment);

}