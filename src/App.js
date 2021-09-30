import React from 'react';
import './App.css';
// Components
import Calculator from './components/Calculator';
// Hooks
// import useInputValidation from './hooks/useInputValidation';
// Styles
import {GlobalStyle} from './GlobalStyle';

const App = () => (
  <>
    <Calculator />
    <GlobalStyle />
  </>
);

export default App;