import React, { useState } from 'react';
import Web3 from 'web3';

const SignMessage = () => {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  const handleSignMessage = async () => {
    try {
      if (!message) {
        setError('Please enter a message to sign.');
        return;
      }

      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        // Sign the message with MetaMask
        const signedMessage = await web3.eth.personal.sign(message, account, '');

        setSignature(signedMessage);
        setError('');
      } else {
        setError('MetaMask not found. Please install MetaMask to use this feature.');
      }
    } catch (error) {
      console.error('Error signing message:', error);
      setError(`Error signing message: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Message Signing</h2>
      <div>
        <label>Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button onClick={handleSignMessage}>Sign Message</button>
      {signature && (
        <div>
          <p>Signature: {signature}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignMessage;
