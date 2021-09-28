import React from 'react';
import ButtonRow from '../ButtonRow';

const KeyPad = ({keyPad, onKeyPress}) =>
  keyPad.map((btnRow, i) => (
    <ButtonRow key={i} btnRow={btnRow} onKeyPress={onKeyPress} />
  ));

export default KeyPad;
