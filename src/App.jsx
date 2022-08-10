// import "./styles/main.scss"
import React from 'react';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Preloader from './components/Preloader';


function App() {
  return (
    <div className="app">
        <Home />
    </div>
  );
}

export default App;
