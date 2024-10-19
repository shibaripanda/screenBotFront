import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Grid, Paper, Input, TextInput } from '@mantine/core'
import { ButtonApp } from '../comps/ButtonApp.tsx'
import { TextInputApp } from '../comps/TextInputApp.tsx'
import { TimeInput } from '@mantine/dates'

export function ModalCreateEventPermament({event}) {

  const [opened, { open, close }] = useDisclosure(false)
  const [eventName, setEventName] = useState('New multi event ' + Date.now().toString())
  const [lengthOfEventMin, setLengthOfEventMin] = useState(45)
  const [lengthOfPauseMin, setLengthOfPauseMin] = useState(0)
  const [startTime, setStartTime] = useState({h: 9, m: 0, index: 'pm'})
  const [countOfEvents, setCountOfEvents] = useState(1)
  const [daysOfWeek, setDaysOfWeek] = useState([0, 1, 2, 3, 4, 5])

  const [timeStart, setTimeStart] = useState('')
  const [timeEnd, setTimeEnd] = useState('')

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
              <Grid>
                <Grid.Col span={4}>
                  <TimeInput
                    value={timeStart}
                    onChange={(event) => setTimeStart(event.currentTarget.value)}
                    size="xs"
                    radius="md"
                    label="Start event"
                    withAsterisk
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TimeInput
                    value={timeEnd}
                    onChange={(event) => {
                      console.log(event.currentTarget.value)
                      if(timeEnd.split(':').length === 2){
                        const eT: any = timeEnd.split(':')[0] * 60 + timeEnd.split(':')[1] * 1
                        const sT: any = timeStart.split(':')[0] * 60 + timeStart.split(':')[1] * 1

                        if(sT < eT) setTimeEnd('')
                        else setTimeEnd(event.currentTarget.value)
                      }

                      
                    }}
                    disabled={!timeStart}
                    size="xs"
                    radius="md"
                    label="End event"
                    withAsterisk
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    size="xs"
                    radius="md"
                    label="Duration of break in minutes after the event"
                  />
                </Grid.Col>
              </Grid>
             
             </Paper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Grid>
              <Grid.Col span={2}>
                <ButtonApp title={'Add event'}/>
              </Grid.Col>
              <Grid.Col span={2}>
                
              </Grid.Col>
              <Grid.Col span={2}>
                
              </Grid.Col>
              <Grid.Col span={2}>
                
              </Grid.Col>
              <Grid.Col span={2}>
                
              </Grid.Col>
              <Grid.Col span={2}>
                <ButtonApp title={'Save'}/>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
     

      </Modal>
      <ButtonApp title='Edit' handler={open}  disabled={false}/>
    </>
  )
}