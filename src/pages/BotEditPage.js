
import '@mantine/core/styles.css'
import { useEffect, useState } from 'react'
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
  const [screens, getScreens] = useState(false)
  const [newScreenName, setNewScreenName] = useState('')
  const [filterScreens, setFilterScreens] = useState('')
  const [status, setStatus] = useState(false)

  SocketApt.socket?.on('getBot', (data) => {
    setBot(data)
  })
  SocketApt.socket?.on('getScreens', (data) => {
    getScreens(data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)))
  })

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      // SocketApt.socket.emit('editModeBot', botId)
      SocketApt.socket.emit('getBot', botId)
      SocketApt.socket.emit('getScreens', botId)
      setStatus(true)
    }
  }, [botId])

  const protectScrreen = (screenId, status) => {
    SocketApt.socket.emit('protectScrreen', {botId: bot._id, status: status, screenId: screenId})
    screens[screens.findIndex(item => item._id === screenId)].protect = status
    getScreens(screens)
  }

  const getScreensFromServer = () => {
    SocketApt.socket.emit('getScreens', botId)
  }

  const deleteScreen = (_id) => {
    SocketApt.socket.emit('deleteScreen', _id)
    getScreens(screens.filter(item => item._id !== _id))
  }

  const createScreen = (newScreenName) => {
    SocketApt.socket.emit('createNewScreen', {botId: bot._id, screenName: newScreenName})
    setNewScreenName('')
    SocketApt.socket.emit('getScreens', bot._id)
  }

  const editScreen = (screenId) => {
    SocketApt.socket.emit('idForEditScreen', {botId: bot._id, screenId: screenId})
  }

  const sendMeScreen = (_id) => {
    SocketApt.socket.emit('sendMeScreen', {botId: bot._id, screenId: _id})
  }

  
  if(bot && screens && status){
    return (
      <div style={{width: '55vmax', marginTop: '3vmax'}}>
        <FindScreenForm 
        bot={bot} 
        screens={screens} 
        createScreen={createScreen} 
        newScreenName={newScreenName} 
        setNewScreenName={setNewScreenName} 
        filterScreens={filterScreens}
        setFilterScreens={setFilterScreens}
        />
        {screens.map((item, index) => <div key={index} style={{marginTop: '1vmax'}}>
          <ScreenItem
            protectScrreen={protectScrreen} 
            editScreen={editScreen} 
            bot={bot} 
            screen={item} 
            sendMeScreen={sendMeScreen} 
            deleteScreen={deleteScreen}
            getScreensFromServer={getScreensFromServer} 
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

