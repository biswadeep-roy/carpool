import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Carpool from './components/Carpool';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FindCarpoolers from './components/FindCarpoolers';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Carpool />} />
          <Route path="/home" element={<Carpool />} />
          <Route path="/findcarpoolers" element={<FindCarpoolers />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
