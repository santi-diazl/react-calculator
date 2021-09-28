// Always name custom hooks with use___
import {useReducer} from 'react';
// Reducer
import reducer from '../reducer';

const useValidateInput = ({initialState}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {state, dispatch};
};

export default useValidateInput;
