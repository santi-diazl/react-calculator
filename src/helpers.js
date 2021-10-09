// HOF that takes functions as args and:
// Returns a function that takes args and supplies them to
// provided functions returning one reduced value
const composer =
  (...fns) =>
  (...args) =>
    fns.reduce((composed, f) => f(composed), args);

// Removes trailing operator in formula
const removeTrailingOp = ([formula]) => {
  let newFormula = formula;
  if (/[+÷x-]/.test(formula[formula.length - 1])) {
    newFormula = newFormula.slice(0, -1);
  }
  return newFormula;
};
// Replaces ÷ and x in formula for eval() with / and * respectively
const replaceDivMult = (formula) => {
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
// Composed clean up function
export const cleanUpFormula = composer(
  removeTrailingOp,
  replaceDivMult,
  parenthesizeNegs,
);
