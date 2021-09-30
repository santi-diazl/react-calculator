import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  font-family: 'Noto Sans TC', sans-serif;
  border: 1px solid var(--borderColour);

  @media screen and (min-width: 576px) {
    width: 400px;
  }
  @media screen and (max-width: 575.98px) {
    width: 100%;
    height: 65%;
  }
`;
