import { Paper, Text, Group, Grid } from '@mantine/core';
import React from 'react'
import { ButtonApp } from '../comps/ButtonApp.tsx';
import { ModalCreateEventPermament } from './ModalCreateEventPermament.tsx';

export function EventItem({event, deleteEvent}) {

  const deleteEventHandler = () => {
    deleteEvent(event)
  }

  const buttonsSection = [
    <ModalCreateEventPermament event={event} />,
    <ButtonApp title='Delete' handler={deleteEventHandler} disabled={false} color={'red'}/>
  ]

  return (
    <Paper withBorder p="lg" radius="md" shadow="md">
      <Group justify="space-between" mb="xs">
        <Text>{event.name}</Text>
      </Group>

      <Grid>
        {buttonsSection.map(item => <Grid.Col span={12 / buttonsSection.length}>{item}</Grid.Col>)}
      </Grid>

    </Paper>
  )
}