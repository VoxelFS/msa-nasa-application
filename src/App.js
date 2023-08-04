import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import POTD from './components/POTD';
import About from './components/About'
import Subscribe from './components/Subscribe';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/potd" element={<POTD />} />
        <Route path="/about" element={<About />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </div>
  );
}

export default App;
