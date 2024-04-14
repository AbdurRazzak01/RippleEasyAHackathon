import React from "react";
import { Link } from "react-router-dom";
import bannerImg from ".";
import "./AboutUs.css";
import Container from "react-bootstrap/Container";
import logoftp from "./img/fin.jpg";
import avatar from "./img/fin.jpg";
import abdur from "./img/fin.jpg";
import rebecca from "./img/rebecca.png";
import abdurr from "./img/abdur.png";


const About = () => {
  return (
    <div className="row text-center">
    <div className="container">
      <div className="aboutUs">
       
      <div>
  <h2 style={{ marginBottom: "10px" }}>Our Mission</h2> {/* Add margin-bottom */}
  <p style={{ marginBottom: "20px" }}> {/* Add margin-bottom */}
    We want to give you money! That's all! within 2025 we want to give away 25M pounds! 
  </p>
  <hr />
</div>
        
        <h2>Our Team</h2>
        <div className="grid-container">
          <div classname="grid-item">
            <img className="banner-img" src={rebecca} alt="Bannerimg" />
            <h4 className="font-weight-bold dark-grey-text mt-4">Rebecca Gatto</h4>
            <h6 className="font-weight-bold blue-text my-3">
              CEO 
            </h6>
            <p className="font-weight-normal dark-grey-text"></p>
          </div>
          <div classname="grid-item">
            <div className="testimonial mb-5">
              <img className="banner-img" src={abdurr} alt="Bannerimg" />
              <h4 className="font-weight-bold dark-grey-text mt-4">Abdur Razzak</h4>
              <h6 className="font-weight-bold blue-text my-3">
                CTO
              </h6>
              <p className="font-weight-normal dark-grey-text"></p>
            </div>
          </div>
         
          
         
          
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
