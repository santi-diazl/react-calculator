// check if value is an operator
const isOperator = (value) => /[x÷+-]/.test(value);
// used to combine functions into one
const composed =
  (...fns) =>
  (arg) =>
    fns.reduce((composed, f) => f(composed), arg);
// replaces ÷ and x in formula with / and * respectively
const replaceOps = (formula) => {
  let newFormula = formula;
  newFormula = newFormula.replace('÷', '/');
  newFormula = newFormula.replace('x', '*');

  return newFormula;
};
// Parenthesize negative numbers that are preceded by minus sign i.e --13
// Prevents invalid decrement Syntax Error in eval() function
const parenthesizeNegs = (formula) => {
  let newFormula = formula;
  const doubleNegPattern = /-(-\d+(\.\d+)?)/; // --number pattern
  while (doubleNegPattern.test(newFormula)) {
    const negNumber = newFormula.match(doubleNegPattern)[1];
    // replace neg. number after minus sign with parenthesized neg. number
    newFormula = newFormula.replace(negNumber, '(' + negNumber + ')');
  }
  return newFormula;
};
// Removes trailing operator if it exists
const removeTrailingOp = (formula) => {
  let newFormula = formula;
  if (isOperator(formula[formula.length - 1])) {
    newFormula = newFormula.slice(0, -1);
  }
  return newFormula;
};
// Composed clean up function
const cleanUpFormula = composed(removeTrailingOp, replaceOps, parenthesizeNegs);

// Input validation functions

// Validates digit and returns new state
export const validateDigit = (state, digit) => {
  let {formula, input} = state;
  // returns same state if 0 pressed and 0 is current input
  if (digit === '0' && input === '0') return {...state};
  // 0 or operator is current input, replace with digit
  if (input === '0' || isOperator(input)) {
    input = digit;
  } else {
    // number is current input, append
    input = input + digit;
  }
  return {input: input, formula: formula + digit, negativeOn: false};
};
// Validates operator and returns new state
export const validateOperator = (state, operator) => {
  let {formula, input, negativeOn} = state;
  // Last input is a number or an operator but negative sign is off,
  // Append inputted operator to formula
  if (!isOperator(input) || (!negativeOn && operator === '-')) {
    formula += operator;
    // turn negative sign on if operator was '-'
    negativeOn = operator === '-' ? true : false;
    // Negative sign on, last input is an operator not = to -,
    // replace last two operators with inputted operator
  } else if (negativeOn) {
    formula = formula.slice(0, -2) + operator;
    negativeOn = false;
    // Negative sign off, last input is an operator not = to -,
    // replace it with inputted operator
  } else {
    formula = formula.slice(0, -1) + operator;
  }
  return {input: operator, formula: formula, negativeOn: negativeOn};
};
// Validates decimal and returns new state
export const validateDecimal = (state) => {
  let {formula, input} = state;
  if (isOperator(input)) {
    formula += '0.';
    input = '0.';
  } else if (!input.includes('.')) {
    formula += !formula ? '0.' : '.';
    input += '.';
  }
  return {
    input: input,
    formula: formula,
    negativeOn: false,
  };
};
// Evaluates formula and returns new state
export const evalFormula = (state) => {
  let {formula, input, result} = state;
  const oldFormula = formula;
  formula = cleanUpFormula(formula);
  // eslint-disable-next-line no-eval
  result = eval(formula).toString();
  formula = `${oldFormula} = ${result}`;
  input = result;

  return {formula: formula, input: input, result: result};
};
