import React, { useState } from 'react';
import axios from 'axios';

const CoinCalculator = () => {
  const [inputValue, setInputValue] = useState('');
  const [calculatedCoins, setCalculatedCoins] = useState(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/calculate-coins', { amount: inputValue });
      setCalculatedCoins(response.data.coins);
    } catch (error) {
      console.error('Error calculating coins:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Amount:
          <input type="number" value={inputValue} onChange={handleChange} />
        </label>
        <button type="submit">Calculate Coins</button>
      </form>
      {calculatedCoins && <p>Calculated Coins: {calculatedCoins}</p>}
    </div>
  );
};

export default CoinCalculator;
