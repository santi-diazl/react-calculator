import {React} from 'react';
// Style
import {Wrapper} from './Button.styles';
// Initial state for reset button
import {state as initialState} from '../../config';

const Button = ({value = '', id = '', type = value, onKeyPress}) => (
  <Wrapper
    id={id}
    value={value}
    type={type}
    onClick={(e) =>
      onKeyPress({
        type: type,
        payload: {
          value: e.target.value,
          initialState: id === 'clear' ? initialState : '',
        },
      })
    }
  >
    {value}
  </Wrapper>
);

export default Button;
