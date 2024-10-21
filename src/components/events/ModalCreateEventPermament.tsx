import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Grid, Paper, TextInput } from '@mantine/core'
import { ButtonApp } from '../comps/ButtonApp.tsx'
import { TextInputApp } from '../comps/TextInputApp.tsx'
import { TimeInput } from '@mantine/dates'

export function ModalCreateEventPermament({oneEvent, setEvents, events}) {

  const [opened, { open, close }] = useDisclosure(false)
  const [eventName, setEventName] = useState(oneEvent.name)
  const [indexEvent] = useState(events.findIndex(item => item === oneEvent))
  const [editedEvent, setEditedEvent] = useState(oneEvent)


  const dayEvents = editedEvent.slots.map((item, index) => 
    <Grid.Col key={index} span={12}>
      <Paper withBorder p="lg" radius="md" shadow="md">
        <Grid>
          <Grid.Col span={4}>
          <TimeInput
            value={item.startTime}
            onChange={(event) => {
              console.log(event.currentTarget.value)
              console.log(indexEvent)
              console.log(events[indexEvent].slots[events[indexEvent].slots.findIndex(slot => slot.eventId === item.eventId)])
              events[indexEvent].slots[events[indexEvent].slots.findIndex(slot => slot.eventId === item.eventId)].startTime = event.currentTarget.value
              // setEvents(events)
              setEditedEvent(events[indexEvent])
            }}
            size="xs"
            radius="md"
            label="Start event"
            withAsterisk
          />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              onChange={(event) => {
                oneEvent.slots[oneEvent.slots.findIndex(slot => slot.duration === item.duration)].startTime = event.currentTarget.value
              }}
              value={item.duration}
              size="xs"
              radius="md"
              label="Event duration"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              onChange={(event) => {
                oneEvent.slots[oneEvent.slots.findIndex(slot => slot.break === item.break)].startTime = event.currentTarget.value
              }}
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
        title={oneEvent.name}
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