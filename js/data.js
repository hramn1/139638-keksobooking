'use strict';

window.data = (function () {
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
  return {
    showMapCard: showMapCard,
  };
})();
