import {state} from './config';
import {cleanUpFormula} from './helpers';
// Reducer functions for useReducer hook
export const init = (initialState) => {
  return initialState;
};
// Assigns a handler based on input value type (i.e digit, operator, etc.)
export const reducer = (state, {valueType, payload}) => {
  const {value, initialState} = payload;
  const inputIsNumber = !isNaN(state.input) ? true : false;
  // Formula was just solved
  if (state.result && valueType !== 'clear') {
    return handleJustSolved(state, value, valueType);
  }
  switch (valueType) {
    case 'digit':
      return handleDigitClick(state, value, inputIsNumber);
    case 'operator':
      return handleOpClick(state, value, inputIsNumber);
    case 'decimal':
      return handleDecimalClick(state, inputIsNumber);
    case 'equals':
      return evalFormula(state);
    case 'clear':
      return init(initialState);
    default:
      return {...state};
  }
};

const handleDigitClick = (state, digit, inputIsNumber) => {
  const {formula, input} = state;
  if (digit === '0' && input === '0') return {...state};
  let newInput;
  if (inputIsNumber) {
    // current display is a number, append digit
    newInput = {input: input === '0' ? digit : input + digit};
  } else {
    // current display is an operator, replace with digit
    newInput = {input: digit};
  }
  return {...state, formula: formula + digit, ...newInput};
};

const handleOpClick = (state, operator, inputIsNumber) => {
  const {formula, negativeSign} = state;
  let newFormula;
  // current display is a number or an operator with negative sign off
  // Append operator to formula, turn on negative sign if -
  if (inputIsNumber || (operator === '-' && !negativeSign)) {
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

const handleDecimalClick = (state, inputIsNumber) => {
  const {formula, input} = state;
  if (input.includes('.')) return {...state};
  let newFormulaInput;
  if (inputIsNumber) {
    newFormulaInput = {
      formula: input === '0' ? '0.' : formula + '.',
      input: input + '.',
    };
  } else {
    newFormulaInput = {formula: formula + '0.', input: '0.'};
  }
  return {...state, ...newFormulaInput};
};

const handleJustSolved = ({result}, value, valueType) => {
  let newFormula;
  const newValue = value === '.' ? '0.' : value;
  if (valueType === 'digit' || valueType === 'decimal') {
    newFormula = {formula: newValue};
  } else {
    newFormula = {formula: result + newValue};
  }
  return {...newFormula, input: newValue, result: '', negativeSign: false};
};

// Evaluates formula
const evalFormula = ({formula, input, result}) => {
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

  return {formula: formula, input: input, result: result, negativeSign: false};
};
