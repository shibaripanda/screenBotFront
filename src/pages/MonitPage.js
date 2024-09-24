
import '@mantine/core/styles.css'
import { useEffect, useMemo, useState } from 'react'
import '../styles/App.css'
import { useConnectSocket } from '../socket/hooks/useConnectSocket.ts'
import { SocketApt } from '../socket/api/socket-api.ts'
import { fix } from '../fix/fix.js'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Group, Switch, Text, TextInput } from '@mantine/core'
import { UserList } from '../components/userList/UserList.tsx'

export function MonitPage() {
  
  useConnectSocket()

  SocketApt.socket?.on('getUsers', (data) => {
    console.log(data)
    setUsers(data)
  })
  SocketApt.socket?.on('getScreens', async (data) => {
    getScreens(await data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)))
    console.log('recieve screens')
  })
  
  const {botId} = useParams()
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)
  const [filter, setFilter] = useState('')
  const [status, setStatus] = useState(false)
  const [users, setUsers] = useState([])
  const [screens, getScreens] = useState([])

  const usersFilter = useMemo(() => {
      const checkActiv = () => {
        if(checked) return [true]
        return [true, false]
      }
      return users.filter(item => (Object.values(item.data).join() + item.username + item._id).toLowerCase().includes(filter.toLowerCase()) && checkActiv().includes(item.activBot))
    }, [filter, users, checked]
  )

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      SocketApt.socket.emit('getUsers', botId)
      SocketApt.socket.emit('getScreens', botId)
      setStatus(true)
    }
  }, [botId])

  const sendScreenToUser = (screenId, userId) => {
    console.log(screenId, userId)
    SocketApt.socket.emit('sendScreenToUser', {botId: botId, screenId: screenId, to: userId})
  }

  const sendTextToUser = (text, userId) => {
    console.log(text, userId)
    SocketApt.socket.emit('sendTextToUser', {botId: botId, text: text, to: userId})
  }

 
  if(users && status && screens.length){
    return (
      <div style={{width: '100%', marginTop: '0.5vmax', marginBottom: '3vmax', marginLeft: '0.5vmax', marginRight: '0.5vmax'}}>
        <Group justify="space-between">
          <Button variant="default" size="xs"
            onClick={() => {
            navigate(`/main`)
            }}>
            Back to all bots
          </Button>
          <Switch
            style={{marginTop: '1.5vmax', marginBottom: '1.5vmax'}}
            label="Only active users"
            radius="lg"
            color='green'
            checked={checked}
            onChange={(event) => {
              setChecked(event.currentTarget.checked)
            }}/>
          <TextInput
              placeholder="filter"
              value={filter}
              onChange={(event) => {
                setFilter(event.currentTarget.value)
              }}
          />
          <Text>{usersFilter.length} / {users.length}</Text>
        </Group>
        <hr></hr>
        
        <UserList data={usersFilter} screens={screens} sendScreenToUser={sendScreenToUser} sendTextToUser={sendTextToUser}/>
      </div>
    )
  }
  else{
    return (
      <div style={{marginTop: '5vmax'}}>Loading...</div>
    )
  }

}

