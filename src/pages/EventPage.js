
import '@mantine/core/styles.css'
import { useEffect, useMemo, useState } from 'react'
import '../styles/App.css'
import { useConnectSocket } from '../socket/hooks/useConnectSocket.ts'
import { fix } from '../fix/fix.js'
import { useNavigate, useParams } from 'react-router-dom'
import { Grid } from '@mantine/core'
import { EventItem } from '../components/events/EventItem.tsx'
// import { ModalCreateEventOneTime } from '../components/events/ModalCreateEventOneTime.tsx'
import { ModalCreateEventPermament } from '../components/events/ModalCreateEventPermament.tsx'
import { ButtonApp } from '../components/comps/ButtonApp.tsx'
import { TextApp } from '../components/comps/TextApp.tsx'
import { TextInputApp } from '../components/comps/TextInputApp.tsx'
import { pipGetSocket } from '../socket/pipGetSocket.ts'
import { pipSendSocket } from '../socket/pipSendSocket.ts'

export function EventPage() {

  useConnectSocket()

  const {botId} = useParams()
  const {botName} = useParams()

  const navigate = useNavigate()
  
  const [bot, setBot] = useState(false)
  const [events, setEvents] = useState([])
  // const [newEventName, setNewEventName] = useState('')
  const [filterEvents, setFilterEvents] = useState('')
  const [status, setStatus] = useState(false)

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      window.location.assign(fix.appLink)
    }
    else{
      const pipSocketListners = [
        {pip: 'getBot', handler: setBot},
        {pip: 'getEvents', handler: setEvents}
      ]
      pipGetSocket(pipSocketListners)
      pipSendSocket('getBot', botId)
      pipSendSocket('getEvents', botId)
      setStatus(true)
    }
  }, [botId])

  const eventFilter = useMemo(() => {
      return events.filter(item => item.name.toLowerCase().includes(filterEvents.toLowerCase()))
    }, [filterEvents, events]
  )

  const func = {
    createEvent: async (event) => pipSendSocket('createEvent', {botId: bot._id, event: event}),
    deleteEvent: async (event) => pipSendSocket('deleteEvent', {botId: bot._id, event: event})
  }

  const handlers = {
    backToAllBotsHandler: () => navigate(`/main`)
  }

  if(bot && status){
    return (
      <div style={{width: '100%', marginTop: '0.5vmax', marginBottom: '3vmax', marginLeft: '0.5vmax', marginRight: '0.5vmax'}}>

          <Grid align="center">
            <Grid.Col span={2}>
              <ButtonApp title='Back to all bots' handler={handlers.backToAllBotsHandler} />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextApp title='Events:' text={botName} />
            </Grid.Col>
            <Grid.Col span={2}>

            </Grid.Col>
            <Grid.Col span={2}>
                  
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInputApp placeholder='Event filter' value={filterEvents} handler={setFilterEvents}/>
            </Grid.Col>
          </Grid>

        <hr color='grey' width='1' style={{marginTop: '0.5vmax'}}></hr>

        <Grid style={{marginTop: '0.5vmax', marginBottom: '0.5vmax'}}>
          <Grid.Col span={2}>
            <ModalCreateEventPermament createEvent={func.createEvent}/>
          </Grid.Col>
          {/* <Grid.Col span={2}>
            <ModalCreateEventOneTime createEvent={createEvent}/>
          </Grid.Col> */}
        </Grid>

        <hr style={{marginBottom: '1vmax'}}></hr>
        <Grid>
          {eventFilter.map((item, index ) => <Grid.Col key={index} span={4}>
            <EventItem 
              event={item} 
              deleteEvent={func.deleteEvent}
            />
            </Grid.Col>)}
        </Grid>
      </div>
    )
  }
  else{
    return (
      <div style={{marginTop: '5vmax'}}>Loading...</div>
    )
  }

}

