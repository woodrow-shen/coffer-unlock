import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }

  button {
    cursor: pointer;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background-color: ${props => props.theme.colors.accent};
    color: white;
    font-size: 1rem;
    transition: ${props => props.theme.transition};

    &:hover {
      opacity: 0.9;
    }
  }
`;

export default GlobalStyle;
