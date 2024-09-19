
import '@mantine/core/styles.css'
import { useEffect, useMemo, useState } from 'react'
import '../styles/App.css'
import { useConnectSocket } from '../socket/hooks/useConnectSocket.ts'
import { SocketApt } from '../socket/api/socket-api.ts'
import { fix } from '../fix/fix.js'
import { useParams } from 'react-router-dom'
import { FindScreenForm } from '../components/screenList/FindScreenForm.tsx'
import { ScreenItem } from '../components/screenList/ScreenItem.tsx'
import { Grid } from '@mantine/core'

export function BotEditPage() {

  const {botId} = useParams()
  useConnectSocket()
  
  const [bot, setBot] = useState(false)
  const [screens, getScreens] = useState([])
  const [newScreenName, setNewScreenName] = useState('')
  const [filterScreens, setFilterScreens] = useState('')
  const [status, setStatus] = useState(false)


  SocketApt.socket?.on('getBot', (data) => {
    setBot(data)
  })
  SocketApt.socket?.on('getScreens', async (data) => {
    getScreens(await data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)))
    console.log('recieve screens')
  })


  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      SocketApt.socket.emit('idForEditScreen', {botId: botId, screenId: ''})
      SocketApt.socket.emit('getBot', botId)
      SocketApt.socket.emit('getScreens', botId)
      setStatus(true)
    }
  }, [botId])

  const screenFilter = useMemo(() => {
      return screens.filter(item => item.name.toLowerCase().includes(filterScreens.toLowerCase()))
    }, [filterScreens, screens]
  )


  const protectScrreen = (screenId, status) => {
    SocketApt.socket.emit('protectScrreen', {botId: bot._id, status: status, screenId: screenId})
    screens[screens.findIndex(item => item._id === screenId)].protect = status
    getScreens(screens)
  }
  const clearScreen = async (screenId) => {
    SocketApt.socket.emit('clearScreen', {botId: bot._id, screenId: screenId})
  }
  const deleteScreen = async (screenId) => {
    SocketApt.socket.emit('deleteScreen', screenId)
    getScreens(screens.filter(item => item._id !== screenId))
  }
  const editButtons = async (screenId, buttons) => {
    SocketApt.socket.emit('editButtons', {botId: bot._id, screenId: screenId, buttons: buttons})
  }
  const createScreen = async (newScreenName) => {
    SocketApt.socket.emit('createNewScreen', {botId: bot._id, screenName: newScreenName})
  }
  const updateVariable = async (screenId, variable) => {
    SocketApt.socket.emit('updateVariable', {botId: bot._id, screenId: screenId, variable: variable})
  }
  const screenForAnswer = (screenId, ansScreen) => {
    SocketApt.socket.emit('screenForAnswer', {botId: bot._id, screenId: screenId, ansScreen: ansScreen})
  }
  const editScreen = (screenId) => {
    SocketApt.socket.emit('idForEditScreen', {botId: bot._id, screenId: screenId})
  }
  const sendMeScreen = (screenId) => {
    SocketApt.socket.emit('sendMeScreen', {botId: bot._id, screenId: screenId})
  }

  const loadingItem = () => {
    if(screens.length){
      return (
        screenFilter.map((item, index) => 
          <Grid.Col span={4} key={index}>
            <ScreenItem
              screens={screens}
              protectScrreen={protectScrreen} 
              editScreen={editScreen} 
              bot={bot} 
              screen={item} 
              sendMeScreen={sendMeScreen} 
              deleteScreen={deleteScreen}
              clearScreen={clearScreen}
              editButtons={editButtons}
              updateVariable={updateVariable}
              screenForAnswer={screenForAnswer} 
            />
          </Grid.Col>)
      )
    }
    return (
      <Grid.Col span={4} key={5000}>
        <div style={{marginTop: '10vmax', marginLeft: '8vmax'}}>
          Loading...
        </div>
      </Grid.Col>
    )
  }

  
  if(bot && screens && status){
    return (
      <div style={{width: '75vmax', marginTop: '3vmax', marginBottom: '3vmax'}}>
        <Grid justify="flex-start" align="stretch">
          <Grid.Col span={8} key={1000}>
            <FindScreenForm
              bot={bot} 
              screens={screens}
              screenFilterLength={screenFilter.length} 
              createScreen={createScreen} 
              newScreenName={newScreenName} 
              setNewScreenName={setNewScreenName} 
              filterScreens={filterScreens}
              setFilterScreens={setFilterScreens}
            />
          </Grid.Col>
          {loadingItem()}
        </Grid>
      </div>
    )
  }
  else{
    return (
      <div style={{marginTop: '5vmax'}}>Loading...</div>
    )
  }

}

