import React, { useState } from "react";
import "./profile.css";
import avatar from "./img/fin.jpg";
import Calculator from "./Calculator";
import LandingPage from "./LandingPage";
import XrpWallet from "./XrpWallet";
import avata from "./img/profileGuy.jpg";
import graph from "./img/graph.png";
import detectEthereumProvider from '@metamask/detect-provider';


const Profile = () => {
  const [showWallet, setShowWallet] = useState(false);

  const handleWalletClick = async () => {
    try {
      const detectedProvider = await detectEthereumProvider();
      if (detectedProvider) {
        // Metamask is installed
        setShowWallet(true);
      } else {
        // Metamask not found
        console.error('Metamask not found');
      }
    } catch (error) {
      // Error detecting Metamask provider
      console.error('Error detecting Metamask provider:', error);
    }
  };

  const connectToMetaMask = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request access to the user's MetaMask accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected to MetaMask:', accounts);
      } else {
        console.error('MetaMask not found. Please install MetaMask to use this feature.');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return (
    <div className="container">
      <div className="aboutUs">
        <div className="welcome">
          <h2>Welcome Back, Alex!</h2>
          <p>You are on the right side, Alex! See what we got for you!</p>
        </div>
       
        <div className="grid-container">
          <div className="section">
            <div className="profile">
              {/* Updated class name */}
              <img className="avatar2" src={avata} alt="Avatar" />
            </div>
          </div>
          <div className="section">
            <div className="calculator">
              <img className="avatar3" src={graph} alt="Avatar" />
              <Calculator />
            
            </div>
            <div className="landing"></div>
          </div>
        </div>
        <div className="button-container">
          {/* Button for connecting to MetaMask */}
          <button className="wallet-button" onClick={connectToMetaMask}>Connect to MetaMask</button>
          {/* Button to show the wallet */}
          <button className="wallet-button" onClick={handleWalletClick}>Your Wallet</button>
        </div>
        {showWallet && <XrpWallet />}
      </div>
    </div>
  );
};

export default Profile;
