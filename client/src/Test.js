// App.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Intro from "./Intro";
import OurServices from "./OurServices";
import Profile from "./Profile";
import LogIn from "./LogIn";
import Teams from "./Team";
import { NavigationProvider } from "./NavigationContext";
import { Route, Routes } from "react-router-dom";

function Test() {
  return (

    <> <Routes>
      
    <Route path="/login" element={<LogIn />} />
   

   </Routes>
 
  </>
  );
}

export default Test;
