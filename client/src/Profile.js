import React, { useState } from "react";
import "./profile.css"; // Import profile.css instead of AboutUs.css
import avatar from "./img/fin.jpg";
import Calculator from "./Calculator";
import LandingPage from "./LandingPage";
import XrpWallet from "./XrpWallet";
import avata from "./img/profileGuy.jpg";
import graph from "./img/graph.png";
import ConcertData from "./api";

const Profile = () => {
  const [showWallet, setShowWallet] = useState(false);

  const handleWalletClick = () => {
    setShowWallet(true);
  };

  return (
    <div className="container">
      <div className="aboutUs">
        <div className="welcome">
          <h2>Welcome Back, Alex!</h2>
          <p>You are on the right side, Alex! See what we got for you!</p>
        </div>
       
        <div className="grid-container">
          <div className="section" style={{ width: "100%" }}>
            <div className="profile">
              {/* Updated class name */}

                <img className="avatar2" src={avata} alt="Avatar" />
                
            </div>
          </div>
          <div className="section" style={{ width: "100%" }}>
            <div className="calculator">
            <img className="avatar3" src={graph} alt="Avatar" />

            </div>
            <div className="landing">
            <Calculator />
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="wallet-button" onClick={handleWalletClick}>Get Your Next Event!</button>
        </div>
        {showWallet &&  <ConcertData/>}
      </div>
    </div>
  );
};

export default Profile;
