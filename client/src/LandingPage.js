import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import XrpWallet from './XrpWallet';
import Account from './Account'; // Corrected import path

const LandingPage = () => {
  const [walletInfo, setWalletInfo] = useState(null);

  useEffect(() => {
    axios.get('/account')
      .then(response => {
        setWalletInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching account:', error);
      });
  }, []);

  return (
    <>
     
      <div>
        <h1>XRP Wallet Information</h1>
        {walletInfo && (
          <div>
            <p>Wallet Address: {walletInfo.wallet.address}</p>
            <p>Secret Key: {walletInfo.wallet.secret}</p>
            <p>Fund Result: {JSON.stringify(walletInfo.fundResult)}</p>
          </div>
        )}
        <XrpWallet />
        <div>
        
        </div>
      </div>
      
    </>
  );
}

export default LandingPage;
