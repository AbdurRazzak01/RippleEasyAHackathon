import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';


const ContractInteraction = () => {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

    const [currentData, setCurrentData] = useState(null);
    const [newData, setNewData] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    const [error, setError] = useState('');

    const contractAddress = '0x06da7afA5e86C3c75413293daA168Ab963CA4a23';
    const contractABI = [
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
        }
    ];

    useEffect(() => {
        const initializeProvider = async () => {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const contract = new ethers.Contract(contractAddress, contractABI, provider);
                    fetchData(contract);
                } catch (error) {
                    setError(error.message);
                }
            } else {
                setError("Please install MetaMask to interact with this contract.");
            }
        };
        initializeProvider();
    }, []);

    const fetchData = async (contract) => {
        try {
            const result = await contract.data();
            setCurrentData(result);
            setError('');
        } catch (error) {
            setCurrentData(null);
            setError(error.message);
        }
    };
    
    const updateData = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
            const signer = provider.getSigner();
            const tx = await contract.setData(parseInt(newData), { gasLimit: 800000 });
            await tx.wait(); // Wait for the transaction to be mined
            setTransactionHash(tx.hash);
            setError('');
        } catch (error) {
            setTransactionHash('');
            setError(error.message);
        }
    };

    return (
        <div>
            <button onClick={fetchData}>Fetch Data</button>
            {currentData && <p>Current Data: {currentData}</p>}
            <input
                type="text"
                value={newData}
                onChange={(e) => setNewData(e.target.value)}
                placeholder="New Data"
            />
            <button onClick={updateData}>Update Data</button>
            {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default ContractInteraction;
