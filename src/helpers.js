// check if value is an operator
export const isOperator = (value) => /[x÷+-]/.test(value);
// used to combine functions into one
export const composer =
  (...fns) =>
  (...args) =>
    fns.reduce((composed, f) => f(composed), args);
// replaces ÷ and x in formula with / and * respectively
const replaceOps = (formula) => {
  let newFormula = formula;
  newFormula = newFormula.replace('÷', '/').replace('x', '*');
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
const removeTrailingOp = ([formula]) => {
  let newFormula = formula;
  if (isOperator(formula[formula.length - 1])) {
    newFormula = newFormula.slice(0, -1);
  }
  return newFormula;
};
// Composed clean up function
export const cleanUpFormula = composer(
  removeTrailingOp,
  replaceOps,
  parenthesizeNegs,
);

// Get current input type (i.e number, operator, result)
export const getInputType = ({input, result}) => {
  if (result) return 'result';
  if (isOperator(input)) return 'operator';
  if (input === '0') return 'zero';
  else return 'number';
};
