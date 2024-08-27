import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { createTheme, MantineProvider } from '@mantine/core'

// import { MainPage } from './pages/MainPage';
// import AuthPage from './pages/AuthPage';

import '@mantine/core/styles.css';

import '@mantine/core/styles.layer.css';
import './layout.css';
import { ConnectPage } from './pages/ConnectPage';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
      <MantineProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ConnectPage/>} />
              {/* <Route path="/main" element={<MainPage/>} />
              <Route path="/" element={<AuthPage/>} /> */}
            </Routes>
          </BrowserRouter>
      </MantineProvider>
  );
}

export default App;
