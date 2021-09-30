import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        touch-action: manipulation;
    }
    :root {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        --borderColour: #c8c8c8;
        --bgColour: #98989c;
        --opColour: #FBB814;
        --btnColour: rgb(239, 239, 239);
    }
`;
