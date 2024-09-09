
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

  SocketApt.socket?.on('getBot', (data) => {
    console.log(data)
    setBot(data)
  })
  SocketApt.socket?.on('getScreens', (data) => {
    console.log(+new Date(data[0].createdAt))
    getScreens(data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)))
  })

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      console.log(botId)
      SocketApt.socket.emit('editModeBot', botId)
      SocketApt.socket.emit('getBot', botId)
      SocketApt.socket.emit('getScreens', botId)
    }
  }, [botId])

  const deleteScreen = (_id) => {
    SocketApt.socket.emit('deleteScreen', _id)
    getScreens(screens.filter(item => item._id !== _id))
  }

  const createScreen = (botId, newScreenName) => {
    SocketApt.socket.emit('createNewScreen', {botId: botId, screenName: newScreenName})
    SocketApt.socket.emit('getScreens', botId)
  }

  const sendMeScreen = (_id) => {
    SocketApt.socket.emit('sendMeScreen', {botId: bot._id, screenId: _id})
  }

  
  if(bot && screens){
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
        {screens.map((item, index) => <div key={index} style={{marginTop: '1vmax'}}><ScreenItem screen={item} sendMeScreen={sendMeScreen} deleteScreen={deleteScreen} /></div>)}
      </div>
    )
  }
  else{
    return (
      <div style={{marginTop: '5vmax'}}>Loading...</div>
    )
  }

}

