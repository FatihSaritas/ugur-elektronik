import React from 'react';
import './App.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import CaaLMessage from './components/CaaLMessage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <CaaLMessage />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
