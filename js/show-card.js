'use strict';

window.showCard = (function () {
  var templateCard = document.querySelector('template').content.querySelector('.map__card');
  var popupTemplate = templateCard.cloneNode(true);
  var mapCard = document.querySelector('.map');
  var listFeatures = popupTemplate.querySelector('.popup__features');
  var fragmentMap = document.createDocumentFragment();
  var typeLive = popupTemplate.querySelector('h4').textContent;
  var paragraphs = popupTemplate.querySelectorAll('p');
  var fragmentPhotos = document.createDocumentFragment();
  var fragmentLink = document.createDocumentFragment();
  var photoConteiner = popupTemplate.querySelector('.popup__pictures li');

  var dataPopup = function (ad) {
    while (listFeatures.firstChild) {
      listFeatures.removeChild(listFeatures.firstChild);
    }
    for (var i = 0; i < ad.offer.features.length; i++) {
      var newFeatures = document.createElement('li');
      newFeatures.className = 'feature feature--' + ad.offer.features[i];
      listFeatures.appendChild(newFeatures);
    }

    while (photoConteiner.firstChild) {
      photoConteiner.removeChild(photoConteiner.firstChild);
    }
    for (var j = 0; j < ad.offer.photos.length; j++) {
      var photoLink = document.createElement('a');
      var newPhoto = document.createElement('img');
      newPhoto.setAttribute('src', ad.offer.photos[j]);
      photoLink.setAttribute('href', ad.offer.photos[j]);
      newPhoto.style.width = '45px';
      newPhoto.style.height = '45px';
      newPhoto.style.border = '1px solid black';
      newPhoto.style.margin = '2px';
      fragmentLink.appendChild(photoLink);
      fragmentLink.appendChild(photoLink).appendChild(newPhoto);
    }
    popupTemplate.querySelector('h3').textContent = ad.offer.title;
    popupTemplate.querySelector('p small').textContent = ad.offer.address;
    popupTemplate.querySelector('.popup__price').textContent = ad.offer.price + ' \u20BD' + '/ночь';
    typeLive = ad.offer.type;
    paragraphs[2].textContent = ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей';
    paragraphs[3].textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    paragraphs[4].textContent = ad.offer.description;
    popupTemplate.querySelector('.popup__avatar').setAttribute('src', ad.author.avatar);
    photoConteiner.appendChild(fragmentLink);
    photoConteiner.appendChild(fragmentPhotos);

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
    dataPopup: dataPopup
  };
})();
