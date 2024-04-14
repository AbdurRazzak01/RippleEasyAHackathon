import { ethers } from 'ethers';
import SimpleStorage from './SimpleStorage.json'; // ABI generated from Solidity compiler output

async function deployContract() {
    try {
        // Connect to XRP EVM sidechain provider
        const provider = new ethers.providers.JsonRpcProvider('http://78.46.163.92:8545');

        // Load contract ABI and bytecode
        const contractABI = SimpleStorage.abi;
        const contractBytecode = SimpleStorage.bytecode;

        // Get signer (you may need to provide a private key here)
        const signer = provider.getSigner();

        // Deploy contract
        const factory = new ethers.ContractFactory(contractABI, contractBytecode, signer);
        const contract = await factory.deploy();

        // Wait for contract deployment transaction to be mined
        await contract.deployed();

        console.log('Contract deployed at address:', contract.address);
    } catch (error) {
        console.error('Error deploying contract:', error);
    }
}

deployContract();
