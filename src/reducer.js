import {
  validateDigit,
  validateOperator,
  validateDecimal,
  evalFormula,
} from './helpers';

export const init = (initialState) => {
  return initialState;
};

export const reducer = (state, {value, payload}) => {
  const valueIsOperator = /[x÷+-]/.test(value);
  const valueIsDigit = /[0-9]/.test(value);
  let newState = {};

  if (valueIsDigit) newState = validateDigit(state, value);
  if (valueIsOperator) newState = validateOperator(state, value);
  if (value === '.') newState = validateDecimal(state);
  if (value === '=') newState = evalFormula(state);
  if (value === 'AC') return init(payload);

  return {...state, ...newState};
};
