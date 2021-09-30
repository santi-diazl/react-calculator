import styled from 'styled-components';

export const Wrapper = styled.button`
  padding: 15px;
  font-size: 1.5em;
  cursor: pointer;
  box-sizing: border-box;
  border-style: none;
  background-color: ${({type}) =>
    type === 'operator' ? 'var(--opColour)' : 'var(--btnColour)'};
  color: ${({type}) => (type === 'operator' ? 'white' : 'black')};
  width: ${({type, id}) =>
    type === 'clear' ? '75%' : id === 'zero' ? '50%' : '25%'};
  border-right: ${({type}) =>
    type === 'operator' || type === 'equals'
      ? 'none'
      : '1px solid var(--borderColour)'};
`;
