import React from 'react';
import Vault from './components/Vault';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Vault />
    </ThemeProvider>
  );
}

export default App;
