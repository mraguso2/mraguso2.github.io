// find all elements needed

const inputs = Array.from(document.querySelectorAll('input[type=number]'));
const calcButton = document.querySelector('#calcButton');
const calculated = document.querySelector('#calculated');

calcButton.addEventListener('click', calculateValues);
inputs.map(input => input.addEventListener('focus', clearDisplayValues));

function getInputValues() {
  const values = inputs.reduce((obj, input) => {
    obj[input.id] = input.value;
    return obj;
  }, {});
  return values;
}

function calculateValues() {
  clearDisplayValues();
  const { wage, hours = 0, minutes = 0 } = getInputValues();
  if (!wage) {
    displayValue('Please Enter a Wage', true);
    return;
  }
  const minutesPay = minutes === '' ? 0 : (wage / 60) * minutes;
  const calc = (wage * hours) + minutesPay;
  const rounded = round(calc, 2);
  return displayValue(rounded);
}

function round(value, decimals) {
  return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
}

function displayValue(value, error = null) {
  const text = document.createElement('p');
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