import { Paper, Text, Group, Grid } from '@mantine/core';
import React, { useState } from 'react'
import { ButtonApp } from '../comps/ButtonApp.tsx';
import { ModalCreateEventPermament } from './ModalCreateEventPermament.tsx';

export function EventItem({oneEvent, deleteEvent, setEvents, events}) {

  // const [editedEvent, setEditedEvent] = useState(structuredClone(oneEvent))

  const buttonsSection = [
    <ModalCreateEventPermament oneEvent={oneEvent} setEvents={setEvents} events={events}/>,
    <ButtonApp title='Delete' handler={() => deleteEvent(oneEvent)} disabled={false} color={'red'}/>
  ]

  return (
    <Paper withBorder p="lg" radius="md" shadow="md">
      <Group justify="space-between" mb="xs">
        <Text>{oneEvent.name}</Text>
      </Group>

      <Grid>
        {buttonsSection.map((item, index) => <Grid.Col key={index} span={12 / buttonsSection.length}>{item}</Grid.Col>)}
      </Grid>

    </Paper>
  )
}