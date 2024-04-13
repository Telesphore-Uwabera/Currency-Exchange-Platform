// Function to fetch available currencies and their exchange rates
async function fetchExchangeRates() {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await response.json();
  return data;
}

// Function to populate currency dropdowns
async function populateCurrencyDropdowns() {
  const data = await fetchExchangeRates();
  const currencies = Object.keys(data.rates);

  const fromSelect = document.getElementById('from');
  const toSelect = document.getElementById('to');

  currencies.forEach(currency => {
    const option = document.createElement('option');
    option.value = currency;
    option.textContent = currency;
    fromSelect.appendChild(option.cloneNode(true));
    toSelect.appendChild(option);
  });
}

// Function to convert currency
async function convert() {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('from').value;
  const toCurrency = document.getElementById('to').value;
  
  if (isNaN(amount)) {
    alert('Please enter a valid amount.');
    return;
  }

  if (fromCurrency === toCurrency) {
    alert('Please select different currencies for conversion.');
    return;
  }

  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
  const data = await response.json();
  const exchangeRate = data.rates[toCurrency];
  
  if (!exchangeRate) {
    alert('Exchange rate not available for selected currencies.');
    return;
  }

  const result = amount * exchangeRate;

  // Display the result after the conversion button
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}

// Add event listener to the convert button
const convertBtn = document.getElementById('convertBtn');
convertBtn.addEventListener('click', convert);

// Populate currency dropdowns on page load
window.onload = populateCurrencyDropdowns;
