'use strict';

// find all elements needed

var inputs = Array.from(document.querySelectorAll('input[type=number]'));
var calculateButton = document.querySelector('#calcButton');
var calculated = document.querySelector('#calculated');

calculateButton.addEventListener('click', calculateValues);
inputs.map(function (input) {
  return input.addEventListener('focus', clearDisplayValues);
});

function getInputValues() {
  var values = inputs.reduce(function (obj, input) {
    obj[input.id] = input.value;
    return obj;
  }, {});
  return values;
}

function calculateValues() {
  clearDisplayValues();

  var _getInputValues = getInputValues(),
      wage = _getInputValues.wage,
      _getInputValues$hours = _getInputValues.hours,
      hours = _getInputValues$hours === undefined ? 0 : _getInputValues$hours,
      _getInputValues$minut = _getInputValues.minutes,
      minutes = _getInputValues$minut === undefined ? 0 : _getInputValues$minut;

  if (!wage) {
    displayValue('Please Enter a Wage', true);
    return;
  }
  var minutesPay = minutes === '' ? 0 : wage / 60 * minutes;
  var calc = wage * hours + minutesPay;
  var rounded = round(calc, 2);
  return displayValue(rounded);
}

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
}

function displayValue(value) {
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var text = document.createElement('p');
  text.textContent = value;
  calculated.classList.add('display');
  if (error) {
    calculated.classList.add('error');
  }
  return calculated.appendChild(text);
}
// function displayValue(value, border) {
//   const text = document.createElement('p');
//   text.textContent = value;
//   calculated.classList.add('display');
//   calculated.classList.add(`${border || ''}`);
//   return calculated.appendChild(text);
// }

function clearDisplayValues() {
  if (calculated.classList.contains('display')) {
    calculated.classList.remove('display');
  }

  if (calculated.classList.contains('error')) {
    calculated.classList.remove('error');
  }

  while (calculated.hasChildNodes()) {
    calculated.removeChild(calculated.firstChild);
  }
}