import {cleanUpFormula} from './helpers';
// Reducer functions for useReducer hook
export const init = (initialState) => {
  return initialState;
};
// Check inputted value type
export const reducer = (state, {type, payload}) => {
  const {value, initialState} = payload;
  const inputType = !isNaN(state.input) ? 'number' : 'operator';
  if (state.result && type !== 'clear') {
    return handleJustSolved(state, value, type);
  }
  switch (type) {
    case 'digit':
      return handleDigitClick(state, value, inputType);
    case 'operator':
      return handleOpClick(state, value, inputType);
    case 'decimal':
      return handleDecimalClick(state, inputType);
    case 'equals':
      return evalFormula(state);
    case 'clear':
      return init(initialState);
    default:
      return {...state};
  }
};

const handleDigitClick = (state, digit, inputType) => {
  const {formula, input} = state;
  if (digit === '0' && input === '0') return {...state};
  let newInput;
  if (inputType === 'number') {
    newInput = {input: input === '0' ? digit : input + digit};
  } else {
    newInput = {input: digit};
  }
  return {...state, ...newInput, formula: formula + digit};
};

const handleOpClick = (state, operator, inputType) => {
  const {formula, negativeSign} = state;
  let newFormula;
  if (inputType === 'number' || (!negativeSign && operator === '-')) {
    newFormula = {
      formula: formula + operator,
      negativeSign: operator === '-' ? true : false,
    };
  } else {
    const index = negativeSign ? -2 : -1;
    newFormula = {
      formula: formula.slice(0, index) + operator,
      negativeSign: false,
    };
  }
  return {...state, ...newFormula, input: operator};
};

const handleDecimalClick = (state, inputType) => {
  const {formula, input} = state;
  if (input.includes('.')) return {...state};
  let newFormulaInput;
  if (inputType === 'number') {
    newFormulaInput = {
      formula: input === '0' ? '0.' : formula + '.',
      input: input + '.',
    };
  } else {
    newFormulaInput = {formula: formula + '0.', input: '0.'};
  }
  return {...state, ...newFormulaInput};
};

const handleJustSolved = ({result}, value, type) => {
  let newFormula;
  const newValue = value === '.' ? '0.' : value;
  if (type === 'digit' || type === 'decimal') {
    newFormula = {formula: newValue};
  } else {
    newFormula = {formula: result + newValue};
  }
  return {...newFormula, input: newValue, result: '', negativeSign: false};
};

// Evaluates formula
const evalFormula = (state) => {
  let {formula, input, result} = state;
  if (!formula) return {...state};
  formula = cleanUpFormula(formula);
  // eslint-disable-next-line no-eval
  try {
    result = eval(formula).toString();
  } catch (error) {
    console.error(error);
  }

  formula = `${formula} = ${result}`;
  input = result;

  return {...state, formula: formula, input: input, result: result};
};
