const API_KEY = "YOUR_API_KEY";
const BASE_URL = `https://api.apilayer.com/exchangerates_data`;

window.onload = function () {
  fetch(`${BASE_URL}/symbols`, {
    method: "GET",
    headers: {
      "apikey": API_KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      const currencies = data.symbols;

      const fromDropdown = document.getElementById("fromCurrency");
      const toDropdown = document.getElementById("toCurrency");

      for (let key in currencies) {
        let option1 = document.createElement("option");
        option1.value = key;              // Key = currency code
        option1.textContent = currencies[key]; // Value = name

        let option2 = option1.cloneNode(true);

        fromDropdown.appendChild(option1);
        toDropdown.appendChild(option2);
      }
    })
    .catch(error => console.error("Error loading currencies:", error));
};

// Conversio
document.getElementById("currencyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const amount = document.getElementById("amount").value;

  // Error
  if (from === to) {
    alert("You cannot convert the same currencies!");
    return;
  }

  fetch(`${BASE_URL}/latest?base=${from}&symbols=${to}`, {
    method: "GET",
    headers: {
      "apikey": API_KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[to];
      const converted = (amount * rate).toFixed(2);

      // Display result 
      document.getElementById("result").textContent =
        `${amount} ${from} = ${converted} ${to}`;
    })
    .catch(error => console.error("Conversion error:", error));
});