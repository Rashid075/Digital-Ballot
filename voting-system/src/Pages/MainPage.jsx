import { signOut } from "firebase/auth";
import React from "react";
import Navbar from "../components/MainPage_Components/Navbar";
import Voting_Navbar from "../components/MainPage_Components/Voting_Navbar";


const MainPage = () => {
  return (
    <div>
        <Navbar/>
        <Voting_Navbar/>
    </div>
  );
};

export default MainPage;
