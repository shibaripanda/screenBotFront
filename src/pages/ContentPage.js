
import '@mantine/core/styles.css'
import { useEffect, useMemo, useState } from 'react'
import '../styles/App.css'
import { useConnectSocket } from '../socket/hooks/useConnectSocket.ts'
import { SocketApt } from '../socket/api/socket-api.ts'
import { fix } from '../fix/fix.js'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Group, Switch, Text, TextInput } from '@mantine/core'
import { ContentList } from '../components/content/ContentList.tsx'

export function ContentPage() {
  
  useConnectSocket()

  SocketApt.socket?.on('getContent', (data) => {
    console.log(data.reverse())
    setContent(data)
  })
  
  const {botId} = useParams()
  const {botName} = useParams()

  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)
  const [filter, setFilter] = useState('')
  const [status, setStatus] = useState(false)
  const [content, setContent] = useState([])

  const contentFilter = useMemo(() => {
      return content.filter(item => (Object.values(item).join()).toLowerCase().includes(filter.toLowerCase()))
    }, [filter, content]
  )

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      SocketApt.socket.emit('getContent', botId)
      setStatus(true)
    }
  }, [botId])

  // const sendScreenToUser = (screenId, userId) => {
  //   console.log(screenId, userId)
  //   SocketApt.socket.emit('sendScreenToUser', {botId: botId, screenId: screenId, to: userId})
  // }

  // const sendTextToUser = (text, userId) => {
  //   console.log(text, userId)
  //   SocketApt.socket.emit('sendTextToUser', {botId: botId, text: text, to: userId})
  // }

 
  if(status){
    return (
      <div style={{width: '100%', marginTop: '0.5vmax', marginBottom: '3vmax', marginLeft: '0.5vmax', marginRight: '0.5vmax'}}>
        <Group justify="space-between">
          <Button variant="default" size="xs"
            onClick={() => {
            navigate(`/main`)
            }}>
            Back to all bots
          </Button>
          <Text fw={700} fz="md">Content: {botName}</Text>
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
          <Text>{contentFilter.length} / {content.length}</Text>
        </Group>
        <hr></hr>
        
        <ContentList data={contentFilter}/>
      </div>
    )
  }
  else{
    return (
      <div style={{marginTop: '5vmax'}}>Loading...</div>
    )
  }

}

