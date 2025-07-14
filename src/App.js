import React from 'react';
import './App.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iletisim" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
