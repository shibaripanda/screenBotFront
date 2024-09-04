
import '@mantine/core/styles.css'
import { useEffect, useState } from 'react'
import '../styles/App.css'
import { useConnectSocket } from '../socket/hooks/useConnectSocket.ts'
import { SocketApt } from '../socket/api/socket-api.ts'
import { fix } from '../fix/fix.js'
import { CreateNewBotForm } from '../components/createNewBotForm/CreateNewBotForm.tsx'
import { BotItem } from '../components/listOfBots/BotItem.tsx'

export function MainPage() {

  useConnectSocket()

  const [status, setStatus] = useState(false)
  const [bots, setBots] = useState([])

  SocketApt.socket?.on('test', (data) => {
    console.log(data)
  })

  SocketApt.socket?.on('getMyBots', (data) => {
    console.log(data)
    // setBots(data.sort((a ,b) => new Date(b.updatedAt) - new Date(a.updatedAt)))
    setBots(data)
  })

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      SocketApt.socket.emit('getMyBots')
      setStatus(true)
    }
  }, [])

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

  
  if(status){
    return (
      <div style={{width: '55vmax', marginTop: '3vmax'}}>
        <CreateNewBotForm createBot={createBot}/>
        {bots.map((item, index) => <div key={index} style={{marginTop: '1vmax'}}><BotItem bot={item} deleteBot={deleteBot} onBot={onBot} offBot={offBot}/></div>)}
      </div>
    )
  }
  else{
    return (
      <div>Loading...</div>
    )
  }

}

