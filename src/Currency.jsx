import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCurrencyExchange } from 'react-icons/bs';
import { BiFontSize } from 'react-icons/bi';

const App = () => {
    const [amount, setAmount] = useState(1);
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('https://v6.exchangerate-api.com/v6/27d2430baf9dccc44578d8c5/latest/USD');
                setCurrencies(Object.keys(response.data.conversion_rates));
            } catch (error) {
                console.error('Error fetching currency list:', error);
            }
        };

        fetchCurrencies();
    }, []);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await axios.get(`https://v6.exchangerate-api.com/v6/27d2430baf9dccc44578d8c5/latest/${baseCurrency}`);
                setExchangeRate(response.data.conversion_rates[targetCurrency]);
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
            }
        };

        fetchExchangeRate();
    }, [baseCurrency, targetCurrency]);

    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleBaseCurrencyChange = (e) => setBaseCurrency(e.target.value);
    const handleTargetCurrencyChange = (e) => setTargetCurrency(e.target.value);

    return (
        <div className="App">
            <header>
                <div className='currency-icon'>
                <BsCurrencyExchange/>
                </div>
                <h1>Currency Converter</h1>
            </header>
            <br />
            <div>
                <input type="number" value={amount} onChange={handleAmountChange} />
                <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
                    {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                to
                <select value={targetCurrency} onChange={handleTargetCurrencyChange}>
                    {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>
            <div>
                {amount} {baseCurrency} = {(amount * exchangeRate).toFixed(2)} {targetCurrency}
            </div>
        </div>
    );
};

export default App;
