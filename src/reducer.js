import {getInputType, composer, cleanUpFormula} from './helpers';
// Reducer functions for useReducer hook
export const init = (initialState) => {
  return initialState;
};
// Check inputted value type
const validate = ([state, {type, payload}]) => {
  const {value, initialState} = payload;
  switch (type) {
    case 'digit':
      return validateDigit(state, value);
    case 'operator':
      return validateOperator(state, value);
    case 'decimal':
      return validateDecimal(state, value);
    case 'equals':
      return evalFormula(state, value);
    case 'clear':
      return init(initialState);
    default:
      return {...state};
  }
};
// Toggles solved true/false
const toggleSolved = (state) => {
  if (state.solved) return {...state, result: '', solved: false};
  if (state.result) return {...state, solved: true};
  return {...state};
};
// Toggles negative sign true/false
const toggleNegativeSign = (state) => {
  const negativeSign = /([-÷x+][-])$/;
  if (negativeSign.test(state.formula)) return {...state, negativeSign: true};
  if (state.negativeSign) return {...state, negativeSign: false};
  return {...state};
};
// Reducer function using composer
export const reducer = composer(validate, toggleSolved, toggleNegativeSign);

// Validates digit inputted against current input
const validateDigit = (state, value) => {
  const inputType = getInputType(state);
  if (value === '0' && state.input === '0') return {...state};
  switch (inputType) {
    case 'operator':
    case 'zero':
      return appendReplaceDisplays(state, value, inputType);
    case 'number':
      return appendToDisplays(state, value);
    case 'result':
      return replaceDisplays(state, value);
    default:
      return {...state};
  }
};

// Validates operator inputted against current input
const validateOperator = (state, value) => {
  const inputType = getInputType(state);
  switch (inputType) {
    case 'operator':
      // - as negative sign
      if (value === '-' && !state.negativeSign) {
        return appendToDisplays(state, value);
      } else return replaceOperators(state, value);
    case 'number':
    case 'result':
      return appendReplaceDisplays(state, value, inputType);
    default:
      return {...state};
  }
};

// Validates decimal against current input
const validateDecimal = (state, value) => {
  const inputType = getInputType(state);
  if (state.input.includes('.') && inputType !== 'result') return {...state};
  switch (inputType) {
    case 'operator':
      return appendReplaceDisplays(state, value, inputType);
    case 'result':
    case 'zero':
      return replaceDisplays(state, value, inputType);
    case 'number':
      return appendToDisplays(state, value);
    default:
      return {...state};
  }
};

// Appends inputted value to formula, replaces input
const appendReplaceDisplays = (state, value, inputType) => {
  let {formula, result} = state;
  let newValue = value;
  if (value === '.' && (inputType === 'operator' || inputType === 'result')) {
    newValue = '0.';
  }
  if (inputType === 'result') formula = result;
  return {...state, formula: formula + newValue, input: newValue};
};

// Appends inputted value to both formula and input
const appendToDisplays = (state, value) => {
  const {formula, input} = state;
  return {...state, formula: formula + value, input: input + value};
};

// Replaces both formula and input with inputted value
const replaceDisplays = (state, value, inputType) => {
  let newValue = value;
  if (value === '.' && (inputType === 'result' || inputType === 'zero')) {
    newValue = '0.';
  }
  return {...state, formula: newValue, input: newValue};
};

// Replaces operators in formula with inputted operator
const replaceOperators = (state, value) => {
  const {formula, negativeSign} = state;
  // if negative sign is on then replace last two operators
  // Otherwise replace last operator
  const index = negativeSign ? -2 : -1;
  return {...state, formula: formula.slice(0, index) + value, input: value};
};

// Evaluates formula
const evalFormula = (state) => {
  let {formula, input, result} = state;
  if (!formula) return {...state};
  formula = cleanUpFormula(formula);
  // eslint-disable-next-line no-eval
  result = eval(formula).toString();
  formula = `${formula} = ${result}`;
  input = result;

  return {...state, formula: formula, input: input, result: result};
};
