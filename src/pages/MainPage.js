
import '@mantine/core/styles.css'
import { useEffect } from 'react'
import '../styles/App.css'
import { useConnectSocket } from '../socket/hooks/useConnectSocket.ts'
import { SocketApt } from '../socket/api/socket-api.ts'

export function MainPage() {

  useConnectSocket()

  useEffect(() => {
    
  }, [])

  const send = () => {
    console.log('send')
    SocketApt.socket.emit('send', {text: 'fvfvfv'})
  }

  
  if(true){

    return (
      <div>
        Hello
        <button onClick={send}>Connect</button>
      </div>
  )
  
  }
  else{
    return (
      <div>Loading...</div>
    )
  }

}

