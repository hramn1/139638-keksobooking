'use strict';

window.data = (function () {
  var templateCard = document.querySelector('template').content.querySelector('.map__card');
  var popupTemplate = templateCard.cloneNode(true);
  var mapCard = document.querySelector('.map');
  var listFeatures = popupTemplate.querySelector('.popup__features');
  var fragmentMap = document.createDocumentFragment();
  var typeLive = popupTemplate.querySelector('h4').textContent;
  var paragraphs = popupTemplate.querySelectorAll('p');
  var dataPopup = function (ad) {
    popupTemplate.querySelector('h3').textContent = ad.offer.title;
    popupTemplate.querySelector('p small').textContent = ad.offer.address;
    popupTemplate.querySelector('.popup__price').textContent = ad.offer.price + ' \u20BD' + '/ночь';
    popupTemplate.querySelector('h4').textContent = ad.offer.type;
    paragraphs[2].textContent = ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей';
    paragraphs[3].textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    paragraphs[4].textContent = ad.offer.description;
    popupTemplate.querySelector('.popup__avatar').setAttribute('src', ad.author.avatar);

    if (typeLive === 'house') {
      typeLive = 'Дом';
    } else if (typeLive === 'flat') {
      typeLive = 'Квартира';
    } else {
      typeLive = 'Бунгало';
    }
    popupTemplate.querySelector('h4').textContent = typeLive;
    fragmentMap.appendChild(popupTemplate);
    mapCard.appendChild(fragmentMap);
  };
  return {
    dataPopup: dataPopup,
    listFeatures: listFeatures,
  };
})();
