
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

  SocketApt.socket?.on('getBot', (data) => {
    console.log(data)
    setBot(data)
  })
  SocketApt.socket?.on('getScreens', (data) => {
    console.log(data)
    getScreens(data)
  })

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      console.log(botId)
      SocketApt.socket.emit('getBot', botId)
      SocketApt.socket.emit('getScreens', botId)
    }
  }, [botId])

  const deleteBot = (_id) => {
    SocketApt.socket.emit('deleteBot', _id)
  }

  const createBot = (token) => {
    SocketApt.socket.emit('createNewBot', token)
  }

  const offBot = (_id) => {
    SocketApt.socket.emit('offBot', _id)
  }

  const onBot = (_id) => {
    SocketApt.socket.emit('onBot', _id)
  }

  
  if(bot && screens){
    return (
      <div style={{width: '55vmax', marginTop: '3vmax'}}>
        <FindScreenForm bot={bot} screens={screens}/>
        {screens.map((item, index) => <div key={index} style={{marginTop: '1vmax'}}><ScreenItem screen={item} /></div>)}
      </div>
    )
  }
  else{
    return (
      <div style={{marginTop: '5vmax'}}>Loading...</div>
    )
  }

}

