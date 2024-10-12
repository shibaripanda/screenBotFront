import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Text, Group, Switch, Grid, Spoiler, Tooltip, TextInput, Autocomplete, Image } from '@mantine/core'
import { ButtonApp } from '../comps/ButtonApp.tsx'

export function ModalCreateEventPermament({createEvent}) {

  const [opened, { open, close }] = useDisclosure(false)
  const [event, setEvent] = useState({})

  const createEventHandler = () => {
    console.log('sdsdsdsdsd')
    createEvent({name: 'New multi event ' + Date.now().toString()})
    close()
  }

  return (
    <>
      <Modal size={'65vmax'} opened={opened} 
        onClose={() => {
            setTimeout(() => {close()}, )
            }} 
        title='Creating new multi event'
      >

        <Grid>
          <Grid.Col span={12}>
            <ButtonApp title='Create a multi event' handler={createEventHandler} />
          </Grid.Col>
        </Grid>

      </Modal>
      <ButtonApp title='Create a multi event' handler={open} />
    </>
  )
}