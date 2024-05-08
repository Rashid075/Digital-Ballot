import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MainPage from "./Pages/MainPage";
import Canidates from "./components/MainPage_Components/Canidates";
import Voting from "./components/MainPage_Components/Voting";
import Results from "./components/MainPage_Components/Results";
import TransferDataToFirestore from "./components/candidate component/TransferData";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Digital-Ballot" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/candidate" element={<Canidates/>}/>
        <Route path="/voting" element={<Voting/>}/>
        <Route path="/results" element={<Results/>}/>
        <Route path="/transfer" element={<TransferDataToFirestore/>}/>


      </Routes>
    </Router>
  );
};

export default App;
