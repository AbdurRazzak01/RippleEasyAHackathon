import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import SignMessage from './SignMessage';

const YourContractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "initialData",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newData",
				"type": "uint256"
			}
		],
		"name": "DataUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newData",
				"type": "uint256"
			}
		],
		"name": "setData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "data",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];





const MetaInfo = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState('');
  const [contractData, setContractData] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
  
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const accounts = await web3Instance.eth.getAccounts();
          const contractInstance = new web3Instance.eth.Contract(
            YourContractABI,
            '0xDA0bab807633f07f013f94DD0E6A4F96F8742B53'
          );
          setContract(contractInstance);

          const accountNumber = accounts[0];
          const balance = await web3Instance.eth.getBalance(accountNumber);
          const balanceInEther = web3Instance.utils.fromWei(balance, 'ether');

          setAccountInfo({
            accountNumber,
            balanceInEther: balanceInEther.toString(),
          });
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('MetaMask not found. Please install MetaMask to use this feature.');
      }
    };

    initWeb3();
  }, []);

  const handleGetData = async () => {
    try {
      if (web3 && contract) {
        const data = await contract.methods.data().call();
        setContractData(data);
      } else {
        console.error('Web3 or contract instance not initialized.');
      }
    } catch (error) {
      console.error('Error calling smart contract function:', error);
    }
  };

  const handleSetData = async () => {
    try {
      if (web3 && contract) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const senderAddress = accounts[0];

        await contract.methods.setData(123).send({ from: senderAddress });
        setTransactionStatus('Transaction successful.');
      } else {
        console.error('Web3 or contract instance not initialized.');
      }
    } catch (error) {
      console.error('Error calling smart contract function:', error);
      setTransactionStatus(`Error sending transaction: ${error.message}`);
    }
  };

  return (
    <div>
      <SignMessage />

      <button onClick={handleGetData}>Get Contract Data</button>

      <h2>Account Information</h2>
      {accountInfo ? (
        <div>
          <p>Account Number: {accountInfo.accountNumber}</p>
          <p>Balance: {accountInfo.balanceInEther} Ether</p>
          {contractData && <p>Contract Data: {contractData}</p>}
          <button onClick={handleSetData}>Set Data</button>
          {transactionStatus && <p>{transactionStatus}</p>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MetaInfo;
