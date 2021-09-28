import React, {useReducer} from 'react';
// Components
import Display from '../Display';
import KeyPad from '../KeyPad';
// Hooks
// import useValidateInput from "../../hooks/useValidateInput.js";
// Styles
import {Wrapper} from './Calculator.styles';
// Config
import {keyPad, state as initialState} from '../../config';
// Reducer/initfunctions for useReducer hook
import {init, reducer} from '../../reducer';

const Calculator = () => {
  const [state, setState] = useReducer(reducer, initialState, init);

  return (
    <Wrapper>
      <Display formula={state.formula} input={state.input}></Display>
      <KeyPad keyPad={keyPad} onKeyPress={setState} />
    </Wrapper>
  );
};

export default Calculator;
