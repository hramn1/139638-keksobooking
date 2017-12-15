'use strict';

window.form = (function () {
  var OFFER_TYPES = ['flat', 'house', 'bungalo', 'palace'];
  var OFFER_PRICES = ['1000', '5000', '0', '10000'];
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];
  var formCard = document.querySelector('.notice__form');
  var fielsetsForm = formCard.querySelectorAll('.form__element');
  var inputAdress = fielsetsForm[1].querySelector('input');
  var inputPrice = fielsetsForm[3].querySelector('input');
  var inputTitle = fielsetsForm[0].querySelector('input');
  var formSelectTime = fielsetsForm[4].querySelectorAll('select');
  var formSelectTimeIn = formSelectTime[0];
  var formSelectTimeOut = formSelectTime[1];
  var selectRoom = fielsetsForm[5].querySelectorAll('option');
  var selectGuest = fielsetsForm[6].querySelectorAll('option');
  var changeRoom = formCard.querySelector('#room_number');
  var apartmentType = formCard.querySelector('#type');
  var pricePerNight = formCard.querySelector('#price');

  var disableForm = function () {
    inputAdress.setAttribute('required', 'required');
    inputAdress.setAttribute('readonly', 'readonly');
    inputTitle.setAttribute('required', 'required');
    inputTitle.setAttribute('minlength', '30');
    inputTitle.setAttribute('maxlength', '100');
    inputPrice.setAttribute('required', 'required');
    inputPrice.setAttribute('value', '1000');
    inputPrice.setAttribute('max', '1000000');
  };

  disableForm();

  var guestsForRoom = function () {
    fielsetsForm[6].value = fielsetsForm[5].value;
    for (var i = 0; i < 4; i++) {
      if (selectRoom[0].selected) {
        selectGuest[i].style.display = 'none';
        selectGuest[2].style.display = 'block';
        selectGuest[i].removeAttribute('selected', 'selected');
        selectGuest[2].setAttribute('selected', 'selected');
      } else if (selectRoom[1].selected) {
        selectGuest[i].style.display = 'none';
        selectGuest[2].style.display = 'block';
        selectGuest[1].style.display = 'block';
        selectGuest[i].removeAttribute('selected', 'selected');
        selectGuest[1].setAttribute('selected', 'selected');
      } else if (selectRoom[2].selected) {
        selectGuest[i].style.display = 'block';
        selectGuest[3].style.display = 'none';
        selectGuest[i].removeAttribute('selected', 'selected');
        selectGuest[0].setAttribute('selected', 'selected');
      } else {
        selectGuest[i].style.display = 'none';
        selectGuest[3].style.display = 'block';
        selectGuest[i].removeAttribute('selected', 'selected');
        selectGuest[3].setAttribute('selected', 'selected');
      }
    }
  };
  guestsForRoom();

  var syncValues = function (element, value) {
    element.value = value;
  };
  var formSelectTimeInSync = function () {
    window.synchronizeFields.sync(formSelectTimeIn, formSelectTimeOut, OFFER_TIMES, OFFER_TIMES, syncValues);
  };
  var formSelectTimeOutSync = function () {
    window.synchronizeFields.sync(formSelectTimeOut, formSelectTimeIn, OFFER_TIMES, OFFER_TIMES, syncValues);
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };
  var formSelectTypeSync = function () {
    window.synchronizeFields.sync(apartmentType, pricePerNight, OFFER_TYPES, OFFER_PRICES, syncValueWithMin);
  };

  var formAttribute = function () {
    formCard.setAttribute('action', 'https://js.dump.academy/keksobooking');
  };

    var onSuccessRequest = function (successMessage) {
    var node = document.createElement('div');
    node.textContent = successMessage;
    node.classList.add('success-message');
    document.body.insertAdjacentElement('afterbegin', node);
    formCard.reset();
  };

  var formSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formCard), onSuccessRequest, window.utils.onErrorRequest)
  }
  var initForm = function () {
    formSelectTimeOut.addEventListener('change', formSelectTimeOutSync);
    formSelectTimeIn.addEventListener('change', formSelectTimeInSync);
    formCard.addEventListener('change', formSelectTypeSync);
    changeRoom.addEventListener('change', guestsForRoom);
    formCard.addEventListener('change', formAttribute);
    formCard.addEventListener('submit', formSubmit);
  };
  initForm();
  return {
    inputAdress: inputAdress,
  };
})();
