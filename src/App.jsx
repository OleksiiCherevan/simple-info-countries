// import "./styles/main.scss"
import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import { Routes, Route, Link } from 'react-router-dom';

import CountryList from './pages/Home';

import Header from './components/Header';
import Preloader from './components/Preloader';
import CountryDetail from './pages/CountryDetail';

function App() {
  return (
    <div className="app">
      <Header></Header>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:code" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

export default App;
