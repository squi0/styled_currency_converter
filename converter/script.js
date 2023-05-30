document.addEventListener('DOMContentLoaded', () => {
    const exchangeRateElement = document.querySelector('.exchange-rate span'); // Изменяем селектор для элемента с информацией о курсе валют
    const amount1Element = document.getElementById('amount1');
    const currency1Element = document.getElementById('currency1');
    const amount2Element = document.getElementById('amount2');
    const currency2Element = document.getElementById('currency2');
  
    // Обновление курса валют
    const updateExchangeRate = () => {
      const currency1 = currency1Element.value;
      const currency2 = currency2Element.value;
  
      fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
        .then(response => response.json())
        .then(data => {
          const rates = data.rates;
          const exchangeRate = rates[currency2];
          const baseCurrency = data.base;
  
          exchangeRateElement.textContent = `Exchange Rate: 1 ${currency1} = ${exchangeRate} ${currency2}`;
  
          convertCurrency(); // Вызываем функцию для автоматической конвертации при обновлении курса валют
        })
        .catch(error => {
          console.error('Error:', error);
          exchangeRateElement.textContent = 'Error retrieving exchange rate.';
        });
    };
  
    // Конвертация валюты
    const convertCurrency = () => {
      const amount1 = parseFloat(amount1Element.value);
      const currency1 = currency1Element.value;
      const amount2 = parseFloat(amount2Element.value);
      const currency2 = currency2Element.value;
  
      fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
        .then(response => response.json())
        .then(data => {
          const rates = data.rates;
          const exchangeRate = rates[currency2];
  
          if (!isNaN(amount1)) {
            amount2Element.value = (amount1 * exchangeRate).toFixed(2);
          } else if (!isNaN(amount2)) {
            amount1Element.value = (amount2 / exchangeRate).toFixed(2);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          exchangeRateElement.textContent = 'Error retrieving exchange rate.';
        });
    };
  
    // События изменения валют и ввода суммы
    currency1Element.addEventListener('change', updateExchangeRate);
    currency2Element.addEventListener('change', updateExchangeRate);
    amount1Element.addEventListener('input', convertCurrency);
    amount2Element.addEventListener('input', convertCurrency);
  
    // Инициализация: получение курса валют и автоматическая конвертация
    updateExchangeRate();
  });
  