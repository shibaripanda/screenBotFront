import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Grid, Paper, TextInput } from '@mantine/core'
import { ButtonApp } from '../comps/ButtonApp.tsx'
import { TextInputApp } from '../comps/TextInputApp.tsx'
import { TimeInput } from '@mantine/dates'

export function ModalCreateEventPermament({oneEvent, updateEvent}) {

  const [opened, { open, close }] = useDisclosure(false)
  const [eventName, setEventName] = useState(oneEvent.name)
  const [time, setTime] = useState(oneEvent)
  const [stat, setStat] = useState(0)


  const handlers = {
    addSlot: () => {
      // const plusTime = () => {
        const clock = time.slots[time.slots.length - 1].startTime.split(':')
        let x = Number(clock[1]) + time.slots[time.slots.length - 1].duration + time.slots[time.slots.length - 1].break
        // console.log(x)
        const upH = Number(clock[0]) + Math.floor(x / 60)
        const upM = x % 60

        const timeToTwoDigits = (digit) => {
          if(digit.toString().length === 1){
            return '0' + digit
          }
          return digit
        }

        // while(x - 60 > 0){
        //   x = x - 60
        //   console.log(x)
        //   console.log(Number(clock[0]) + 1)

        // }

      // }
      time.slots[time.slots.length] = structuredClone(time.slots[time.slots.length - 1])
      time.slots[time.slots.length - 1].startTime = `${timeToTwoDigits(upH)}:${timeToTwoDigits(upM)}`
      setStat(Date.now())
    }
  }

  // console.log(editedEvent)

  const dayEvents = time.slots.map((item, index) => 
    <Grid.Col key={index} span={12}>
      <Paper withBorder p="lg" radius="md" shadow="md">
        <Grid>
          <Grid.Col span={4}>
          <TimeInput
            value={item.startTime}
            onChange={(event) => {
              console.log(event.currentTarget.value)
              item.startTime = event.currentTarget.value
              setStat(Date.now())
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
                console.log(event.currentTarget.value)
                item.duration = Number(event.currentTarget.value)
                setStat(Date.now())
                console.log(oneEvent)
                console.log(time)
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
                console.log(event.currentTarget.value)
                item.break = Number(event.currentTarget.value)
                setStat(Date.now())
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
                <ButtonApp title={'Add event'} handler={handlers.addSlot} />
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
                <ButtonApp title={'Save'} disabled={JSON.stringify(oneEvent) === JSON.stringify(time)}/>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
     

      </Modal>
      <ButtonApp title='Edit' handler={open}  disabled={false}/>
    </>
  )
}