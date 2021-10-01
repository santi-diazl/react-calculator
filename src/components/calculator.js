import React, {useEffect, useReducer} from 'react';
// Components
import Display from './Display';
import KeyPad from './KeyPad';
// Config
import {keyPad, state as initialState} from '../config';
// Reducer/init functions for useReducer hook
import {init, reducer} from '../reducer';

const Calculator = () => {
  const [state, setState] = useReducer(reducer, initialState, init);

  // useEffect(() => {
  //   console.log(state);
  // });

  return (
    <div id="calculator">
      <Display formula={state.formula} input={state.input}></Display>
      <KeyPad keyPad={keyPad} onKeyPress={setState} />
    </div>
  );
};

export default Calculator;
