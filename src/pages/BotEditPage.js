
import '@mantine/core/styles.css'
import { useEffect, useMemo, useState } from 'react'
import '../styles/App.css'
import { useConnectSocket } from '../socket/hooks/useConnectSocket.ts'
import { SocketApt } from '../socket/api/socket-api.ts'
import { fix } from '../fix/fix.js'
import { useParams } from 'react-router-dom'
import { FindScreenForm } from '../components/screenList/FindScreenForm.tsx'
import { ScreenItem } from '../components/screenList/ScreenItem.tsx'

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
  const editScreen = (screenId) => {
    SocketApt.socket.emit('idForEditScreen', {botId: bot._id, screenId: screenId})
  }
  const sendMeScreen = (screenId) => {
    SocketApt.socket.emit('sendMeScreen', {botId: bot._id, screenId: screenId})
  }

  
  if(bot && screens && status){
    return (
      <div style={{width: '55vmax', marginTop: '3vmax'}}>
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
        {screenFilter.map((item, index) => <div key={index} style={{marginTop: '1vmax'}}>
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
          /></div>)}
      </div>
    )
  }
  else{
    return (
      <div style={{marginTop: '5vmax'}}>Loading...</div>
    )
  }

}

