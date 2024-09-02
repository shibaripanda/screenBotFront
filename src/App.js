import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { createTheme, MantineProvider } from '@mantine/core'

import { MainPage } from './pages/MainPage'
// import AuthPage from './pages/AuthPage';

import '@mantine/core/styles.css';

import '@mantine/core/styles.layer.css';
import './layout.css';
import { ConnectPage } from './pages/ConnectPage';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {

  const [w, setW] = useState(window.innerWidth)
  const [h, setH] = useState(window.innerHeight)


  return (
    <div style={{width: w, height: h, textAlign: 'center'}}>
      <MantineProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ConnectPage/>} />
              <Route path="/main" element={<MainPage/>} />
              {/* <Route path="/" element={<AuthPage/>} /> */}
            </Routes>
          </BrowserRouter>
      </MantineProvider>
    </div>
  );
}

export default App;
