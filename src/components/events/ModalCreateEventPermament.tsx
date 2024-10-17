import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Grid, Paper } from '@mantine/core'
import { ButtonApp } from '../comps/ButtonApp.tsx'
import { TextInputApp } from '../comps/TextInputApp.tsx'

export function ModalCreateEventPermament({event}) {

  const [opened, { open, close }] = useDisclosure(false)
  const [eventName, setEventName] = useState('New multi event ' + Date.now().toString())
  const [lengthOfEventMin, setLengthOfEventMin] = useState(45)
  const [lengthOfPauseMin, setLengthOfPauseMin] = useState(0)
  const [startTime, setStartTime] = useState({h: 9, m: 0, index: 'pm'})
  const [countOfEvents, setCountOfEvents] = useState(1)
  const [daysOfWeek, setDaysOfWeek] = useState([0, 1, 2, 3, 4, 5])

  // const createEventHandler = () => {
  //   createEvent({name: eventName})
  //   close()
  // }
  // const disabledCreatingEvent = () => {
  //   if(eventName) return false
  //   return true
  // }

  // for(let x=0; x < 7; x++){
  //   const day = []

  //   if(daysOfWeek.includes(x)){
  //     for(let y = 0; y < countOfEvents; y++){
  //       day.push(
  //         {event: true, eventName: eventName, eventLength: lengthOfEventMin, status: 'free', client: false}
  //       )
  //       if(y < countOfEvents - 1) day.push(
  //         {event: false, eventName: 'pause', eventLength: lengthOfPauseMin}
  //       )
  //     }
  //   }

  //   newWeek.push(day)
    
  // }

  return (
    <>
      <Modal size={'65vmax'} opened={opened} 
        onClose={() => {
            setTimeout(() => {close()}, )
            }}
        title={event.name}
      >
        <Grid>
          <Grid.Col span={6}>
             <TextInputApp label='Event name' value={eventName} placeholder={eventName} handler={setEventName} />
          </Grid.Col>
          <Grid.Col span={12}>
             <Paper withBorder p="lg" radius="md" shadow="md">

             </Paper>
          </Grid.Col>
        </Grid>
     

      </Modal>
      <ButtonApp title='Edit' handler={open}  disabled={false}/>
    </>
  )
}