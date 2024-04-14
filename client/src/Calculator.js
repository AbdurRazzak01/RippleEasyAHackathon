import React, { useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';

import './Calculator.css'; // Import CSS file for styling

const Calculator = () => {
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');
  const [amount3, setAmount3] = useState('');

  const [coins, setCoins] = useState(null);
  const [error, setError] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5001/calculate-coins',
        { amount: parseInt(amount1) + parseInt(amount2)+ parseInt(amount2) },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setCoins(response.data.coins);
      setError(null);

      // Transfer the calculated coins
      if (response.data.coins > 0) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const senderAddress = accounts[0];
        const receiverAddress = '0x1234567890123456789012345678901234567890'; // Replace with the recipient's address
        const amountToSend = web3.utils.toWei(response.data.coins.toString(), 'ether');

        const tx = await web3.eth.sendTransaction({
          from: senderAddress,
          to: receiverAddress,
          value: amountToSend,
        });

        setTransactionStatus(`Transaction successful`);
      } else {
        setTransactionStatus('No coins to transfer.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error calculating coins. Please try again later.');
      setCoins(null);
    }
  };

  return (
    <div className="calculator-container">
      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="form-group">
          <label htmlFor="amount1">Amount Spent:</label>
          <input
            type="number"
            id="amount1"
            value={amount1}
            onChange={(e) => setAmount1(e.target.value)}
            required
          />
          <label htmlFor="amount2">Buying Returning Ticket:</label>
          <input
            type="number"
            id="amount2"
            value={amount2}
            onChange={(e) => setAmount2(e.target.value)}
            required
          />
          <label htmlFor="amount3">10th Time Bonus:</label>
          <input
            type="number"
            id="amount3"
            value={amount3}
            onChange={(e) => setAmount3(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="calculate-button">Calculate Your Royalty</button>
      </form>
      {error && <div className="error-message">Error: {error}</div>}
      {!error && coins !== null && 
        <div className="result">
          <span>You Earned :</span>
          <span>{coins}</span>
        </div>
      }
      {transactionStatus && <div className="transaction-status">{transactionStatus}</div>}
    </div>
  );
};

export default Calculator;
