import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import '@mantine/core/styles.layer.css';
import './layout.css';
import { ConnectPage } from './pages/ConnectPage'
import { MainPage } from './pages/MainPage'

function App() {

  // const [w, setW] = useState(window.innerWidth)
  // const [h, setH] = useState(window.innerHeight)

  return (
    // <div style={{width: w, height: h, textAlign: 'center'}}>
      <MantineProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ConnectPage/>} />
              <Route path="/main" element={<MainPage/>} />
            </Routes>
          </BrowserRouter>
      </MantineProvider>
    // </div>
  );
}

export default App;
