import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/core/styles.layer.css'
import './layout.css'
import { ConnectPage } from './pages/ConnectPage'
import { MainPage } from './pages/MainPage'
import { BotEditPage } from './pages/BotEditPage'
import { MonitPage } from './pages/MonitPage'

function App() {

  return (
    <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ConnectPage/>} />
            <Route path="/main" element={<MainPage/>} />
            <Route path="/botedit/:botId" element={<BotEditPage/>} />
            <Route path="/monit/:botId" element={<MonitPage/>} />
          </Routes>
        </BrowserRouter>
    </MantineProvider>
  )
  
}

export default App
