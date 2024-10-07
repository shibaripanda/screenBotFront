
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
import { GroupListMenu } from '../components/monitor/GroupListMenu.tsx'

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
  SocketApt.socket?.on('getGroups', (data) => {
    setGroups(data)
  })
  
  
  const {botId} = useParams()
  const {botName} = useParams()

  const navigate = useNavigate()
  const [checked, setChecked] = useState(true)
  const [filter, setFilter] = useState('')
  const [status, setStatus] = useState(false)
  const [users, setUsers] = useState([])
  const [screens, getScreens] = useState([])
  const [content, setContent] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [groups, setGroups] = useState([])
  const [activGroup, setActivGroup] = useState({})
  const [rename, setRename] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')

  const usersFilter = useMemo(() => {
      const checkActiv = () => {
        if(checked) return [true]
        return [true, false]
      }
      const groupFilter = (id) => {
        if(typeof activGroup['group'] !== 'undefined') return activGroup.group.includes(id)
          return true
      }
      return users.filter(item => (Object.values(item.data).join() + item.username + item._id).toLowerCase().includes(filter.toLowerCase()) && checkActiv().includes(item.activBot) && groupFilter(item.id))
    }, [filter, users, checked, activGroup]
  )

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      SocketApt.socket.emit('getGroups', botId)
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
  const createGroup = (group) => {
    SocketApt.socket.emit('createGroup', {botId: botId, group: group})
  }
  const deleteGroup = (group) => {
    SocketApt.socket.emit('deleteGroup', {botId: botId, group: group})
  }
  const renameGroup = (group, name) => {
    SocketApt.socket.emit('renameGroup', {botId: botId, group: group, newName: name})
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
                const mes = []
                for(let i of usersFilter){
                  mes.push({id: i.id, username: i.username, status: i.activBot})
                }
                setSelectedRows(mes)
              }}>
              Select all
      </Button>
    )
  }
  const renameButAndInput = () => {
    if(rename){
      return (
        <TextInput
          size='xs'
          placeholder={activGroup.name}
          value={newGroupName}
          onChange={(event) => {
            setNewGroupName(event.currentTarget.value)
          }}
        />
      )
    }
    return (
      <Text>Group: {activGroup.name} ({activGroup.group.length})</Text>
    )
  }
  const renameButAndInput1 = () => {
    if(rename){
      return (
        <Grid>
          <Grid.Col span={6}>
            <Button variant="default" size="xs" fullWidth
                onClick={() => {
                  renameGroup(activGroup, newGroupName)
                  setRename(false)
                  setActivGroup([])
                }}>
                Save
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button variant="default" size="xs" fullWidth
                onClick={() => {
                  setRename(false)
                  setNewGroupName('')
                }}>
                Cancel
            </Button>
          </Grid.Col>
        
        </Grid>
      )
    }
    return (
      <Button variant="default" size="xs" fullWidth
            onClick={() => {
              setRename(true)
            }}>
            Rename group
      </Button>
    )
  }
  const groupSettings = () => {
    if(typeof activGroup['group'] !== 'undefined'){
      return (
        <>
        <Grid align="center" style={{marginTop: '0.5vmax', marginBottom: '0.5vmax'}}>
          <Grid.Col span={4}>
            {renameButAndInput()}
          </Grid.Col>
          <Grid.Col span={2}>
            {renameButAndInput1()}
          </Grid.Col>
          <Grid.Col span={2}>
            <Button variant="default" size="xs" fullWidth
              onClick={() => {
                deleteGroup(activGroup)
                setActivGroup([])
              }}>
              Delete group
            </Button>
          </Grid.Col>
        </Grid>
        <hr></hr>
        </>
      )
    }
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
            label="Only active users"
            radius="lg"
            color='green'
            checked={checked}
            onChange={(event) => {
              setChecked(event.currentTarget.checked)
            }}/>
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

        <hr color='grey' width='1' style={{marginTop: '0.5vmax'}}></hr>

        <Grid style={{marginTop: '0.5vmax', marginBottom: '0.5vmax'}}>
          <Grid.Col span={2}>
            {selected()}
          </Grid.Col>
          <Grid.Col span={2}>
            <GroupListMenu deleteGroup={deleteGroup} groups={groups} setActivGroup={setActivGroup} activGroup={activGroup}/>
          </Grid.Col>
          <Grid.Col span={2}>
            <Button variant="default" size="xs" fullWidth
              disabled={!selectedRows.length}
              onClick={() => {
                createGroup(selectedRows.map(item => item.id))
              }}>
              Greate group ({selectedRows.length})
            </Button>
          </Grid.Col>
          <Grid.Col span={2}>
            <ModalSendMessageGroup selectedRows={selectedRows} sendContentToUser={sendContentToUser} content={content} screens={screens} sendScreenToUser={sendScreenToUser} sendTextToUser={sendTextToUser}/>
          </Grid.Col>
          <Grid.Col span={2}>
            <Button variant="default" size="xs" fullWidth
              disabled={true}
              onClick={() => {
                
              }}>
              Create task
            </Button>
          </Grid.Col>
          <Grid.Col span={2}>
            <Button variant="default" size="xs" fullWidth
              disabled={true}
              onClick={() => {
                
              }}>
              Download XLS
            </Button>
          </Grid.Col>
        </Grid>

        <hr></hr>

        {groupSettings()}
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

