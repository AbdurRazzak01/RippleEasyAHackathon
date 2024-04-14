// OurServices.js
import React from "react";
import "./AboutUs.css";
import "./profile.css"; // Import the provided CSS
import avatar from "./img/fin.jpg";
import world from "./img/world.png";
import sus from "./img/sus.png";


const OurServices = () => {
  return (
    <div className="row text-center">
      <div className="container">
        <div className="aboutUs">
          <div className="Services1">
            <div className="grid-container1">
              <div className="profile">
                <h3 className="service-heading">We Revolutionise The Industry</h3>
                <p className="service-text">And The World Gets Better !</p>
              </div>
              <div className="profile">
                <img className="avatar1" src={world} alt="Avatar" />
              </div>
              <div className="profile">
                <img className="avatar1" src={sus} alt="Avatar" />
              </div>
              <div className="profile">
                <space></space>
                <h3 className="service-heading">We Are Sustainable</h3>
                <p className="service-text">And The Future Looks Amazing !</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
