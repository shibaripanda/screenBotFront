import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Grid, Paper, TextInput } from '@mantine/core'
import { ButtonApp } from '../comps/ButtonApp.tsx'
import { TimeInput } from '@mantine/dates'

export function ModalOpenEvent({oneEvent}) {

  const [opened, { open, close }] = useDisclosure(false)

  const dayEvents = oneEvent.slots.map((item, index) => 
    <Grid.Col key={index} span={12}>
      <Paper withBorder p="lg" radius="md" shadow="md">
        <Grid align="flex-end">
          <Grid.Col span={3}>
          <TimeInput
            variant="unstyled"
            disabled={true}
            value={item.startTime}
            size="xs"
            radius="sm"
            label="Start slot"
          />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput
              variant="unstyled"
              disabled={true}
              value={item.duration}
              size="xs"
              radius="sm"
              label="Duration minutes"
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput
              variant="unstyled"
              disabled={true}
              value={item.break}
              size="xs"
              radius="sm"
              label="Break minutes"
            />
          </Grid.Col>
        </Grid>
      </Paper>
    </Grid.Col>
  )

  return (
    <>
      <Modal size={'65vmax'} opened={opened} 
        onClose={close}
        title={oneEvent.name}
      >
        {dayEvents}
      </Modal>
      <ButtonApp title='Open' handler={open} />
    </>
  )
}