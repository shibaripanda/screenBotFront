import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Grid } from '@mantine/core'
import { ButtonApp } from '../comps/ButtonApp.tsx'
import { TextInputApp } from '../comps/TextInputApp.tsx'

export function ModalCreateEventPermament({createEvent}) {

  const [opened, { open, close }] = useDisclosure(false)
  const [eventName, setEventName] = useState('New multi event ' + Date.now().toString())

  const createEventHandler = () => {
    createEvent({name: eventName})
    close()
  }

  const disabledCreatingEvent = () => {
    if(eventName) return false
    return true
  }

  return (
    <>
      <Modal size={'65vmax'} opened={opened} 
        onClose={() => {
            setTimeout(() => {close()}, )
            }}
        title={<ButtonApp title='Create a new multi-event' handler={createEventHandler} disabled={disabledCreatingEvent()}/>}
      >
        <Grid>
          <Grid.Col span={6}>
             <TextInputApp label='Event name' value={eventName} placeholder={eventName} handler={setEventName} />
          </Grid.Col>
        </Grid>
     

      </Modal>
      <ButtonApp title='Create a multi event' handler={open}  disabled={false}/>
    </>
  )
}