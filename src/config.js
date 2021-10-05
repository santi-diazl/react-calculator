const DIGIT = 'digit';
const OPERATOR = 'operator';
export const keyPad = [
  [
    ['clear', 'AC'],
    ['divide', '÷', OPERATOR],
  ],
  [
    ['seven', '7', DIGIT],
    ['eight', '8', DIGIT],
    ['nine', '9', DIGIT],
    ['multiply', 'x', OPERATOR],
  ],
  [
    ['four', '4', DIGIT],
    ['five', '5', DIGIT],
    ['six', '6', DIGIT],
    ['subtract', '-', OPERATOR],
  ],
  [
    ['one', '1', DIGIT],
    ['two', '2', DIGIT],
    ['three', '3', DIGIT],
    ['add', '+', OPERATOR],
  ],
  [
    ['zero', '0', DIGIT],
    ['decimal', '.'],
    ['equals', '='],
  ],
];

export const state = {
  formula: '',
  input: '0',
  negativeSign: false,
  result: '',
};
