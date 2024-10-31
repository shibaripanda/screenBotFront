import { Paper, Text, Group, Grid } from '@mantine/core';
import React from 'react'
import { ButtonApp } from '../comps/ButtonApp.tsx';
import { ModalCreateEvent } from './ModalCreateEvent.tsx';
import { ModalOpenEvent } from './ModalOpenEvent.tsx';

export function EventItem({oneEvent, deleteEvent, updateEvent, createEvent}) {
console.log(oneEvent.idEvent)

  const buttonsSection = [
    <ButtonApp title='Publish' handler={() => updateEvent(oneEvent, {...oneEvent, publish: true})} disabled={oneEvent.publish} color={'green'}/>,
    <ModalCreateEvent oneEvent={oneEvent} updateEvent={updateEvent} />,
    <ModalOpenEvent oneEvent={oneEvent} />,
    <ButtonApp title='Copy' handler={() => createEvent({...oneEvent, publish: false, name: oneEvent.name + ' copy ' + Date.now(), idEvent: Date.now() + 'Event'})} disabled={false} />,
    <ButtonApp title='Delete' handler={() => deleteEvent(oneEvent)} disabled={oneEvent.publish} color={'red'}/>
  ]

  const statusLabel = () => {
    if(oneEvent.publish) return 'Published (close for editing and deleting)'
    return 'Unpublished'
  }

  return (
    <Paper withBorder p="lg" radius="md" shadow="md">
      <Group justify="space-between" mb="xs">
        <Text>{oneEvent.name}<br/>{statusLabel()}</Text>
      </Group>

      <Grid>
        {buttonsSection.map((item, index) => <Grid.Col key={index} span={12 / buttonsSection.length}>{item}</Grid.Col>)}
      </Grid>

    </Paper>
  )
}