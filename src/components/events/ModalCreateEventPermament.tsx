import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Grid, Paper, Input, TextInput } from '@mantine/core'
import { ButtonApp } from '../comps/ButtonApp.tsx'
import { TextInputApp } from '../comps/TextInputApp.tsx'
import { TimeInput } from '@mantine/dates'

export function ModalCreateEventPermament({event}) {

  const [opened, { open, close }] = useDisclosure(false)
  const [eventName, setEventName] = useState(event.name)
  const [editEvent, setEditEvent] = useState(event)
  // const [lengthOfEventMin, setLengthOfEventMin] = useState(45)
  // const [lengthOfPauseMin, setLengthOfPauseMin] = useState(0)
  // const [startTime, setStartTime] = useState({h: 9, m: 0, index: 'pm'})
  // const [countOfEvents, setCountOfEvents] = useState(1)
  // const [daysOfWeek, setDaysOfWeek] = useState([0, 1, 2, 3, 4, 5])

  // const [timeStart, setTimeStart] = useState('')
  // const [timeEnd, setTimeEnd] = useState('')

  const dayEvents = editEvent.slots.map((item, index) => 
    <Grid.Col key={index} span={12}>
      <Paper withBorder p="lg" radius="md" shadow="md">
        <Grid>
          <Grid.Col span={4}>
          <TimeInput
            value={item.startTime}
            onChange={(event) => setEditEvent( {... editEvent, slots: [...editEvent.slots,]} event.currentTarget.value)}
            size="xs"
            radius="md"
            label="Start event"
            withAsterisk
          />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              value={item.duration}
              size="xs"
              radius="md"
              label="Event duration"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              value={item.break}
              size="xs"
              radius="md"
              label="Duration of break after the event"
            />
          </Grid.Col>
        </Grid>
      </Paper>
    </Grid.Col>
  )

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
          {dayEvents}
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