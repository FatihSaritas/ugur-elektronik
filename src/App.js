import React from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Shopping from './pages/Shopping';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/Shopping" element={<Shopping />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
