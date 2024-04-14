import React, { useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';

const BuyTicket = ({ ticketId, ticketPrice, discounted, onPurchase }) => {
  const [error, setError] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState('');

  const handleBuyTicket = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5001/calculate-coins',
        { amount: ticketPrice },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.coins > 0) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const senderAddress = accounts[0];
        const receiverAddress = '0x1234567890123456789012345678901234567890'; // Replace with the desired recipient's address
        const amountToSend = web3.utils.toWei(response.data.coins.toString(), 'ether');

        // Prompt user to confirm transaction with Metamask
        await web3.eth.sendTransaction({
          from: senderAddress,
          to: receiverAddress,
          value: amountToSend,
        });

        setTransactionStatus('Ticket purchase successful');
        // Notify the parent component that a ticket has been purchased
        onPurchase();
      } else {
        setTransactionStatus('Insufficient funds to purchase the ticket.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error purchasing ticket. Please try again later.');
      setTransactionStatus('');
    }
  };

  // Function to handle ticket refund
  const handleRefundTicket = async () => {
    try {
      // Call the refund API endpoint
      const response = await axios.post(
        'http://localhost:5001/refund-ticket',
        { ticketId: ticketId },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setTransactionStatus('Refund successful');
        // Add any additional logic here after refund
      } else {
        setTransactionStatus('Refund failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error refunding ticket. Please try again later.');
      setTransactionStatus('');
    }
  };

  return (
    <div>
      <p>Ticket Price: {ticketPrice} XRP{discounted && " (Discounted)"}</p>
      <button onClick={handleBuyTicket}>Buy Now</button>
      <button onClick={handleRefundTicket}>Refund</button>
      {error && <div>Error: {error}</div>}
      {transactionStatus && <div>{transactionStatus}</div>}
    </div>
  );
};

export default BuyTicket;
