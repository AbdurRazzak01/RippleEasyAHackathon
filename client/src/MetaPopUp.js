import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Web3 from 'web3';
import axios from 'axios';
import SignMessage from './SignMessage';

// Modal configuration
Modal.setAppElement('#root');

const MyComponent = () => {
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');
  const [coins, setCoins] = useState(null);
  const [error, setError] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');

  // Function to open MetaMask modal and connect
  const openMetaMaskModal = async () => {
    try {
      if (window.ethereum) {
        const ethereum = window.ethereum;
        await ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new Web3(ethereum);
        setWeb3(provider);
        const accounts = await provider.eth.getAccounts();
        setAccount(accounts[0]);
        setModalOpen(true);
      } else {
        setError('MetaMask not found. Please install MetaMask to use this feature.');
      }
    } catch (error) {
      setError('Error connecting to MetaMask. Please try again later.');
      console.error('Error connecting to MetaMask:', error);
    }
  };

  // Function to close the MetaMask modal
  const closeMetaMaskModal = () => {
    setModalOpen(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5001/calculate-coins',
        { amount: parseInt(amount1) + parseInt(amount2) }, // Sum of two amounts
        {
          headers: {
            'Content-Type': 'application/json' // Explicitly set content type to JSON
          }
        }
      );
      setCoins(response.data.coins);
      setError(null);

      // Transfer the calculated coins
      if (response.data.coins > 0) {
        if (!web3) {
          await openMetaMaskModal();
          return;
        }

        const senderAddress = account;
        const receiverAddress = '0xRecipientAddress'; // Replace with the recipient's address
        const amountToSend = web3.utils.toWei(response.data.coins.toString(), 'ether');

        const tx = await web3.eth.sendTransaction({
          from: senderAddress,
          to: receiverAddress,
          value: amountToSend,
        });

        setTransactionStatus(`Transaction successful. Transaction hash: ${tx.transactionHash}`);
      } else {
        setTransactionStatus('No coins to transfer.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error calculating coins. Please try again later.');
      setCoins(null); // Reset coins value in case of error
    }
  };

  useEffect(() => {
    // Fetch account information
    const fetchAccountInfo = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accountNumber = accounts[0];
          const balance = await web3.eth.getBalance(accountNumber);
          const balanceInEther = web3.utils.fromWei(balance, 'ether');
          const blockNumber = await web3.eth.getBlockNumber();
          const latestBlock = await web3.eth.getBlock(blockNumber);
          const latestBlockStringified = {
            number: latestBlock.number.toString(),
            timestamp: latestBlock.timestamp.toString(),
          };
          const accountInfo = {
            accountNumber,
            balanceInEther: balanceInEther.toString(),
            latestBlock: latestBlockStringified,
          };
          setAccountInfo(accountInfo);
        } else {
          console.error('MetaMask not found. Please install MetaMask to use this feature.');
        }
      } catch (error) {
        console.error('Error fetching account information:', error);
      }
    };

    fetchAccountInfo();
  }, []);

  const handleTransaction = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const senderAddress = accounts[0];
        const receiverAddress = '0x1234567890123456789012345678901234567890'; // Replace with the recipient's address
        const amountToSend = web3.utils.toWei('1', 'ether'); // Amount to send in Wei

        const tx = await web3.eth.sendTransaction({
          from: senderAddress,
          to: receiverAddress,
          value: amountToSend,
        });

        setTransactionStatus(`Transaction successful. Transaction hash: ${tx.transactionHash}`);
      } else {
        console.error('MetaMask not found. Please install MetaMask to use this feature.');
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
      setTransactionStatus(`Error sending transaction: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="form-group">
          <label htmlFor="amount1">Amount 1:</label>
          <input
            type="number"
            id="amount1"
            value={amount1}
            onChange={(e) => setAmount1(e.target.value)}
            required
          />
          <label htmlFor="amount2">Amount 2:</label>
          <input
            type="number"
            id="amount2"
            value={amount2}
            onChange={(e) => setAmount2(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="calculate-button">Calculate Coins</button>
      </form>
      {error && <div className="error-message">Error: {error}</div>}
      {!error && coins !== null &&
        <div className="result">
          <span>Result:</span>
          <span>{coins}</span>
        </div>
      }
      {transactionStatus && <div className="transaction-status">{transactionStatus}</div>}
      <Modal isOpen={modalOpen} onRequestClose={closeMetaMaskModal} contentLabel="MetaMask Modal">
        {error && <p>{error}</p>}
        {web3 && account && (
          <div>
            <h2>MetaMask Connected</h2>
            <p>Account: {account}</p>
            <button onClick={closeMetaMaskModal}>Close</button>
          </div>
        )}
      </Modal>
      <SignMessage />
    </div>
  );
};

export default MyComponent;
