
import '@mantine/core/styles.css'
import { useEffect, useMemo, useState } from 'react'
import '../styles/App.css'
import { useConnectSocket } from '../socket/hooks/useConnectSocket.ts'
import { SocketApt } from '../socket/api/socket-api.ts'
import { fix } from '../fix/fix.js'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Grid, Group, Switch, Text, TextInput } from '@mantine/core'

export function EventPage() {

  useConnectSocket()
  const {botId} = useParams()
  const {botName} = useParams()

  const navigate = useNavigate()
  
  const [bot, setBot] = useState(false)
  const [events, setEvents] = useState([])
  const [newEventName, setNewEventName] = useState('')
  const [filterEvents, setFilterEvents] = useState('')
  const [status, setStatus] = useState(false)


  SocketApt.socket?.on('getBot', (data) => {
    setBot(data)
  })

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      SocketApt.socket.emit('getBot', botId)
      setStatus(true)
    }
  }, [botId])

  const eventFilter = useMemo(() => {
      return events.filter(item => item.name.toLowerCase().includes(filterEvents.toLowerCase()))
    }, [filterEvents, events]
  )

  const clearScreen = async (screenId) => {
    SocketApt.socket.emit('clearScreen', {botId: bot._id, screenId: screenId})
  }

  // const loadingItem = () => {
  //   if(screens.length){
  //     return (
  //       screenFilter.map((item, index) => 
  //         <Grid.Col span={4} key={index}>
  //           <ScreenItem
  //             screens={screens}
  //             protectScrreen={protectScrreen} 
  //             editScreen={editScreen} 
  //             bot={bot} 
  //             screen={item} 
  //             sendMeScreen={sendMeScreen} 
  //             deleteScreen={deleteScreen}
  //             clearScreen={clearScreen}
  //             editButtons={editButtons}
  //             updateVariable={updateVariable}
  //             screenForAnswer={screenForAnswer}
  //             copyScreen={copyScreen}
  //             editScreenName={editScreenName}
  //             deleteContentItem={deleteContentItem} 
  //           />
  //         </Grid.Col>)
  //     )
  //   }
  //   return (
  //     <Grid.Col span={4} key={5000}>
  //       <div style={{marginTop: '10vmax', marginLeft: '8vmax'}}>
  //         Loading...
  //       </div>
  //     </Grid.Col>
  //   )
  // }

  
  if(bot && status){
    return (
      <div style={{width: '100%', marginTop: '0.5vmax', marginBottom: '3vmax', marginLeft: '0.5vmax', marginRight: '0.5vmax'}}>
        <Group justify="space-between">
          <Button variant="default" size="xs"
            onClick={() => {
            navigate(`/main`)
            }}>
            Back to all bots
          </Button>
          <Text fw={700} fz="md">Events: {botName}</Text>
          <Switch
            label="Only active users"
            radius="lg"
            color='green'
            // checked={checked}
            onChange={(event) => {
              // setChecked(event.currentTarget.checked)
            }}/>
          <TextInput
              size='xs'
              placeholder="filter"
              value={filterEvents}
              onChange={(event) => {
                setFilterEvents(event.currentTarget.value)
              }}
          />
          {/* <Text>{usersFilter.length} / {users.length}</Text> */}
        </Group>

        <hr color='grey' width='1' style={{marginTop: '0.5vmax'}}></hr>

        <Grid style={{marginTop: '0.5vmax', marginBottom: '0.5vmax'}}>
          <Grid.Col span={2}>
            <Button variant="default" size="xs" fullWidth
              onClick={() => {

              }}>
              Greate event
            </Button>
          </Grid.Col>
        </Grid>

        <hr></hr>

        {/* {groupSettings()}
        <UserList setSelectedRows={setSelectedRows} selectedRows={selectedRows} content={content} data={usersFilter} screens={screens} sendScreenToUser={sendScreenToUser} sendTextToUser={sendTextToUser} sendContentToUser={sendContentToUser}/> */}
      </div>
    )
  }
  else{
    return (
      <div style={{marginTop: '5vmax'}}>Loading...</div>
    )
  }

}

