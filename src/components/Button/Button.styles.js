import styled from 'styled-components';

export const Wrapper = styled.button`
  padding: 15px;
  font-size: 1.5em;
  cursor: pointer;
  box-sizing: border-box;
  border-style: none;
  background-color: ${({valueType}) =>
    valueType === 'operator' ? 'var(--opColour)' : 'var(--btnColour)'};
  color: ${({valueType}) => (valueType === 'operator' ? 'white' : 'black')};
  width: ${({valueType, id}) =>
    valueType === 'clear' ? '75%' : id === 'zero' ? '50%' : '25%'};
  border-right: ${({valueType}) =>
    valueType === 'operator' || valueType === 'equals'
      ? 'none'
      : '1px solid var(--borderColour)'};
`;
