'use strict';

var formCard = document.querySelector('.notice__form');
var fielsetsForm = formCard.querySelectorAll('.form__element');
var inputAdress = fielsetsForm[1].querySelector('input');
var inputPrice = fielsetsForm[3].querySelector('input');
var inputType = fielsetsForm[2].querySelectorAll('option');
var inputTitle = fielsetsForm[0].querySelector('input');
var formSelectTime = fielsetsForm[4].querySelectorAll('select');
var formSelectTimeIn = formSelectTime[0];
var formSelectTimeOut = formSelectTime[1];
var selectRoom = fielsetsForm[5].querySelectorAll('option');
var selectGuest = fielsetsForm[6].querySelectorAll('option');

var formDisable = function () {
  inputAdress.setAttribute('required', 'required');
  inputAdress.setAttribute('readonly', 'readonly');
  inputTitle.setAttribute('required', 'required');
  inputTitle.setAttribute('minlength', '30');
  inputTitle.setAttribute('maxlength', '100');
  inputPrice.setAttribute('required', 'required');
  inputPrice.setAttribute('value', '1000');
  inputPrice.setAttribute('max', '1000000');
};

formDisable();

var minPrice = function () {
  if (inputType[1].selected === true) {
    inputPrice.setAttribute('min', '0');
  } else if (inputType[0].selected === true) {
    inputPrice.setAttribute('min', '1000');
  } else if (inputType[2].selected === true) {
    inputPrice.setAttribute('min', '5000');
  } else {
    inputPrice.setAttribute('min', '10000');
  }
};

var guestsForRoom = function () {
  fielsetsForm[6].value = fielsetsForm[5].value;
  for (var i = 0; i < 4; i++) {
    if (selectRoom[0].selected === true) {
      selectGuest[i].style.display = 'none';
      selectGuest[2].style.display = 'block';
      selectGuest[i].removeAttribute('selected', 'selected');
      selectGuest[2].setAttribute('selected', 'selected');
    } else if (selectRoom[1].selected === true) {
      selectGuest[i].style.display = 'none';
      selectGuest[2].style.display = 'block';
      selectGuest[1].style.display = 'block';
      selectGuest[i].removeAttribute('selected', 'selected');
      selectGuest[1].setAttribute('selected', 'selected');
    } else if (selectRoom[2].selected === true) {
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
var sincroniseTimeOutWithTimeIn = function () {
  formSelectTimeOut.value = formSelectTimeIn.value;
};
var sincroniseTimeInWithTimeOut = function () {
  formSelectTimeIn.value = formSelectTimeOut.value;
};
var formSubmit = function () {
  formCard.setAttribute('action', 'https://js.dump.academy/keksobooking');
};

formSelectTimeIn.addEventListener('change', sincroniseTimeOutWithTimeIn);
formSelectTimeOut.addEventListener('change', sincroniseTimeInWithTimeOut);
formCard.addEventListener('change', minPrice);
formCard.addEventListener('change', guestsForRoom);
formCard.addEventListener('change', formSubmit);
