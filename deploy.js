const { ethers } = require("ethers");

// Define your contract ABI and bytecode
const contractABI = [
    // Contract ABI here
];

const contractBytecode = "0x123abc...";

// Define your private key
const privateKey = "7a1bfdc5e0389137aa3cf3c7ddbad9d6cb83abd2939e811ccf1e020ea8b8ca24";

// Connect to Ethereum network
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// Create wallet instance
const wallet = new ethers.Wallet(privateKey, provider);

// Create a factory to deploy the contract
const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);

// Deploy the contract
async function deployContract() {
    try {
        const contract = await contractFactory.deploy();
        await contract.deployed();
        console.log("Contract deployed at address:", contract.address);
    } catch (error) {
        console.error("Error deploying contract:", error);
    }
}

deployContract();
