import React from 'react';
// import React, { useEffect } from "react";
// Components
import Button from '../Button';
// Styles
import {Wrapper} from './ButtonRow.styles';

const ButtonRow = ({btnRow, onKeyPress}) => (
  <Wrapper>
    {btnRow.map(([btnKey, value, type]) => (
      <Button
        id={btnKey}
        key={btnKey}
        value={value}
        type={type ? type : btnKey}
        onKeyPress={onKeyPress}
      />
    ))}
  </Wrapper>
);

export default ButtonRow;
