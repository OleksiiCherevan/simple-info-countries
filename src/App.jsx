// import "./styles/main.scss"
import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';

import Header from './components/Header';
import Preloader from './components/Preloader';
import Country from './pages/Country';

function App() {
  return (
    <div className="app">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:countryName" element={<Country />} />
      </Routes>
    </div>
  );
}

export default App;
