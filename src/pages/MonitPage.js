
import '@mantine/core/styles.css'
import React, { useEffect, useMemo, useState } from 'react'
import '../styles/App.css'
import { useConnectSocket } from '../socket/hooks/useConnectSocket.ts'
import { SocketApt } from '../socket/api/socket-api.ts'
import { fix } from '../fix/fix.js'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Grid, Group, Switch, Text, TextInput } from '@mantine/core'
import { UserList } from '../components/monitor/UserList.tsx'
import { ModalSendMessageGroup } from '../components/monitor/ModalSendMessageGroup.tsx'

export function MonitPage() {
  
  useConnectSocket()

  SocketApt.socket?.on('getUsers', (data) => {
    setUsers(data)
  })
  SocketApt.socket?.on('getScreens', async (data) => {
    getScreens(await data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)))
  })
  SocketApt.socket?.on('getContent', (data) => {
    setContent(data)
  })
  
  
  const {botId} = useParams()
  const {botName} = useParams()

  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)
  const [filter, setFilter] = useState('')
  const [status, setStatus] = useState(false)
  const [users, setUsers] = useState([])
  const [screens, getScreens] = useState([])
  const [content, setContent] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const usersFilter = useMemo(() => {
      const checkActiv = () => {
        if(checked) return [true]
        return [true, false]
      }
      console.log(selectedRows)
      return users.filter(item => (Object.values(item.data).join() + item.username + item._id).toLowerCase().includes(filter.toLowerCase()) && checkActiv().includes(item.activBot))
    }, [filter, users, checked, selectedRows]
  )

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      SocketApt.socket.emit('getContent', botId)
      SocketApt.socket.emit('getUsers', botId)
      SocketApt.socket.emit('getScreens', botId)
      SocketApt.socket.emit('idForEditScreen', {botId: botId, screenId: ''})
      setStatus(true)
    }
  }, [botId])

  const sendScreenToUser = (screenId, userId) => {
    SocketApt.socket.emit('sendScreenToUser', {botId: botId, screenId: screenId, to: userId})
  }
  const sendTextToUser = (text, userId) => {
    SocketApt.socket.emit('sendTextToUser', {botId: botId, text: text, to: userId})
  }
  const sendContentToUser = (item, userId) => {
    SocketApt.socket.emit('sendContentToUser', {botId: botId, userId: userId, content: item})
  }

  const selected = () => {
    if(selectedRows.length){
      return (
        <Button variant="default" size="xs" fullWidth
              onClick={() => {
                setSelectedRows([])
              }}>
              Unselect all
        </Button>
      )
    }
    else if(!usersFilter.length){
      return (
      <Button variant="default" size="xs" fullWidth
              disabled={true}>
              Select all
      </Button>
      )
    }
    return (
      <Button variant="default" size="xs" fullWidth
              onClick={() => {
                for(let i of usersFilter){
                  setSelectedRows([...selectedRows, {id: i.id, username: i.username, status: i.activBot}])
                }
              }}>
              Select all
      </Button>
    )
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
          <Text fw={700} fz="md">Users: {botName}</Text>
          <Switch
            style={{marginTop: '1.5vmax', marginBottom: '1.5vmax'}}
            label="Only active users"
            radius="lg"
            color='green'
            checked={checked}
            onChange={(event) => {
              setChecked(event.currentTarget.checked)
            }}/>
          {/* <ModalSendMessageGroup selectedRows={selectedRows} sendContentToUser={sendContentToUser} content={content} screens={screens} sendScreenToUser={sendScreenToUser} sendTextToUser={sendTextToUser}/> */}
          <TextInput
              size='xs'
              placeholder="filter"
              value={filter}
              onChange={(event) => {
                setFilter(event.currentTarget.value)
              }}
          />
          <Text>{usersFilter.length} / {users.length}</Text>
        </Group>
        <hr></hr>
        <Grid style={{marginTop: '0.7vmax', marginBottom: '0.7vmax'}}>
          <Grid.Col span={2}>
            {selected()}
          </Grid.Col>
          <Grid.Col span={2}>
            <ModalSendMessageGroup selectedRows={selectedRows} sendContentToUser={sendContentToUser} content={content} screens={screens} sendScreenToUser={sendScreenToUser} sendTextToUser={sendTextToUser}/>
          </Grid.Col>
          <Grid.Col span={2}>
            <Button variant="default" size="xs" fullWidth
              disabled={!selectedRows.length}
              onClick={() => {
                
              }}>
              Greate group
            </Button>
          </Grid.Col>
          <Grid.Col span={2}>
            <Button variant="default" size="xs" fullWidth
              disabled={!selectedRows.length}
              onClick={() => {
                
              }}>
              Message to group
            </Button>
          </Grid.Col>
          <Grid.Col span={2}>
            <Button variant="default" size="xs" fullWidth
              disabled={!selectedRows.length}
              onClick={() => {
                
              }}>
              Create task
            </Button>
          </Grid.Col>
          <Grid.Col span={2}>
            <Button variant="default" size="xs" fullWidth
              disabled={!selectedRows.length}
              onClick={() => {
                
              }}>
              Download XLS
            </Button>
          </Grid.Col>
          
        </Grid>
        <hr></hr>
        <UserList setSelectedRows={setSelectedRows} selectedRows={selectedRows} content={content} data={usersFilter} screens={screens} sendScreenToUser={sendScreenToUser} sendTextToUser={sendTextToUser} sendContentToUser={sendContentToUser}/>
      </div>
    )
  }
  else{
    return (
      <div style={{marginTop: '5vmax'}}>Loading...</div>
    )
  }

}

