const currencyEl_One = document.getElementById('currency-one');
const amountEl_One = document.getElementById('amount-one');
const currencyEl_Two = document.getElementById('currency-two');
const amountEl_Two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');

const swapEl = document.getElementById('swap');

// Functions

// Fetch exchange rates and update the DOM
function calculate() {
    const currency_One = currencyEl_One.value;
    const currency_Two = currencyEl_Two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_One}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.rates);
            let rate = data.rates[currency_Two];
            
            rateEl.innerText = `1 ${currency_One} = ${rate} ${currency_Two}`;

            amountEl_Two.value = (amountEl_One.value * rate).toFixed(2);
        });
}

calculate();

// Event Listeners
currencyEl_One.addEventListener('change', calculate);
amountEl_One.addEventListener('input', calculate);
currencyEl_Two.addEventListener('change', calculate);
amountEl_Two.addEventListener('input', calculate);

swapEl.addEventListener('click', () => {
    const temp = currencyEl_One.value;
    currencyEl_One.value = currencyEl_Two.value;
    currencyEl_Two.value = temp;
    calculate();
})