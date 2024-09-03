
import '@mantine/core/styles.css'
import { useEffect, useState } from 'react'
import '../styles/App.css'
import { useConnectSocket } from '../socket/hooks/useConnectSocket.ts'
import { SocketApt } from '../socket/api/socket-api.ts'
import { fix } from '../fix/fix.js'
import { CreateNewBotForm } from '../components/createNewBotForm/CreateNewBotForm.tsx'

export function MainPage() {

  const [status, setStatus] = useState(false)

  useConnectSocket()

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      setStatus(true)
    }
  }, [])

  const send = () => {
    console.log('send')
    SocketApt.socket.emit('send', {text: 'fvfvfv'})
  }

  
  if(status){
    return (
      <div style={{width: '35vmax', marginTop: '3vmax'}}>
        <CreateNewBotForm/>
      </div>
    )
  }
  else{
    return (
      <div>Loading...</div>
    )
  }

}

