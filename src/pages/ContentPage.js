
import '@mantine/core/styles.css'
import { useEffect, useMemo, useState } from 'react'
import '../styles/App.css'
import { useConnectSocket } from '../socket/hooks/useConnectSocket.ts'
import { SocketApt } from '../socket/api/socket-api.ts'
import { fix } from '../fix/fix.js'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Group, Text, TextInput } from '@mantine/core'
import { ContentList } from '../components/content/ContentList.tsx'
import { ModalAddMode } from '../components/content/ModalAddMode.tsx'

export function ContentPage() {
  
  useConnectSocket()

  SocketApt.socket?.on('getContent', (data) => {
    setContent(data)
  })
  SocketApt.socket?.on('getAddContentMode', (data) => {
    setAddContentMode(data)
  })
  
  const {botId} = useParams()
  const {botName} = useParams()

  const navigate = useNavigate()
  // const [checked, setChecked] = useState(false)
  const [filter, setFilter] = useState('')
  const [status, setStatus] = useState(false)
  const [content, setContent] = useState([])
  const [addContentmode, setAddContentMode] = useState('')

  const contentFilter = useMemo(() => {
      return content.filter(item => (Object.values(item).join()).toLowerCase().includes(filter.toLowerCase()))
    }, [filter, content]
  )

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      // SocketApt.socket.emit('idForEditScreen', {botId: botId, screenId: ''})
      SocketApt.socket.emit('getContent', botId)
      SocketApt.socket.emit('getAddContentMode', botId)

      setStatus(true)
    }
  }, [botId])

  const addContent = (status) => {
    SocketApt.socket.emit('idForEditScreen', {botId: botId, screenId: status})
  }

  const deleteContent = (item) => {
    SocketApt.socket.emit('deleteContent', {botId: botId, content: item})
  }

  const sendMeContent = (item) => {
    SocketApt.socket.emit('sendMeContent', {botId: botId, content: item})
  }

  const renameMeContent = (item, newName) => {
    SocketApt.socket.emit('renameMeContent', {botId: botId, content: item, newName: newName})
  }

  const addContentButtonStatus = () => {
    // if(addContentmode === 'check'){
    //   return (
    //     <></>
    //   )
    // }
    // else 
    if(!addContentmode){
      return (
        <ModalAddMode addContent={addContent} setAddContentMode={setAddContentMode}/>
      )
    }
    return (
      <Button
        color='red' 
        size="xs"
        onClick={() => {
          addContent('')
          setAddContentMode(false)
        }}>
        Stop Add-content mode
      </Button>
    )
  }

 
  if(status){
    return (
      <div style={{width: '100%', marginTop: '0.5vmax', marginBottom: '3vmax', marginLeft: '0.5vmax', marginRight: '0.5vmax'}}>
        <Group justify="space-between">
          <Button variant="default" size="xs"
            onClick={() => {
            // addContent('')
            navigate(`/main`)
            }}>
            Back to all bots
          </Button>
          <Text fw={700} fz="md">Content: {botName}</Text>
          {addContentButtonStatus()}
          <TextInput
          size='xs'
              placeholder="filter"
              value={filter}
              onChange={(event) => {
                setFilter(event.currentTarget.value)
              }}
          />
          <Text>{contentFilter.length} / {content.length}</Text>
        </Group>
        <hr style={{marginTop: '0.5vmax', marginBottom: '0.5vmax'}}></hr>
        
        <ContentList data={contentFilter} renameMeContent={renameMeContent} deleteContent={deleteContent} sendMeContent={sendMeContent}/>
      </div>
    )
  }
  else{
    return (
      <div style={{marginTop: '5vmax'}}>Loading...</div>
    )
  }

}

