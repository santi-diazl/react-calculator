import {React} from 'react';
// Style
import {Wrapper} from './Button.styles';
// Initial state for reset button
import {state as initialState} from '../../config';

const Button = ({value = '', id = '', valueType, onKeyPress}) => (
  <Wrapper
    id={id}
    value={value}
    valueType={valueType}
    onClick={(e) =>
      onKeyPress({
        valueType: valueType,
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
