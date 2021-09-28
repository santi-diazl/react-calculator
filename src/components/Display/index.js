import React from 'react';
// Style
import {Wrapper} from './Display.styles';

const Display = ({formula, input}) => (
  <Wrapper>
    <div id="formula">{formula ? formula : '\u00A0'}</div>
    <div id="display">{input}</div>
  </Wrapper>
);

export default Display;
