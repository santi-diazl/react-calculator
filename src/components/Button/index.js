import {React} from 'react';
// Style
import {Wrapper} from './Button.styles';
// Initial state for reset button
import {state as initialState} from '../../config';

const Button = ({value = '', id = '', onKeyPress}) => (
  <Wrapper
    id={id}
    value={value}
    onClick={(e) =>
      onKeyPress({
        value: e.target.value,
        payload: id === 'clear' ? initialState : '',
      })
    }
  >
    {value}
  </Wrapper>
);

export default Button;
