import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import POTD from './components/POTD';
import About from './components/About'
import Subscribe from './components/Subscribe';
import Account from './components/Account';
import { AuthProvider } from './components/Auth';
import { Login } from './components/Login';
import './App.css';
import { RequireAuth } from './components/RequireAuth';

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/potd" element={<POTD />} />
          <Route path="/about" element={<About />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
