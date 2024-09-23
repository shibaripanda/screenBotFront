
import '@mantine/core/styles.css'
import { useEffect, useState } from 'react'
import '../styles/App.css'
import { useConnectSocket } from '../socket/hooks/useConnectSocket.ts'
import { SocketApt } from '../socket/api/socket-api.ts'
import { fix } from '../fix/fix.js'
import { useParams } from 'react-router-dom'
import { Table } from '@mantine/core'
import { UserList } from '../components/userList/UserList.tsx'

export function MonitPage() {

  const {botId} = useParams()

  useConnectSocket()

  const [status, setStatus] = useState(false)
  const [users, setUsers] = useState(false)

  SocketApt.socket?.on('getUsers', (data) => {
    console.log(data)
    setUsers(data)
  })

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      SocketApt.socket.emit('getUsers', botId)
      setStatus(true)
    }
  }, [botId])

  // const deleteBot = (_id) => {
  //   SocketApt.socket.emit('deleteBot', _id)
  // }


  if(users && status){
    return (
      <div style={{width: '55vmax', marginTop: '3vmax', marginBottom: '3vmax'}}>
          <UserList data={users}/>
      </div>
    )
  }
  else{
    return (
      <div style={{marginTop: '5vmax'}}>Loading...</div>
    )
  }

}

