import { Paper, Text, Group } from '@mantine/core';
import React, { useState } from 'react'
import { ButtonApp } from '../comps/ButtonApp.tsx';

export function EventItem({event, deleteEvent}) {

  // const [deleteValue, setDeleteValue] = useState('')

  const deleteEventHandler = () => {
    deleteEvent(event)
  }

  return (
    <Paper withBorder p="lg" radius="md" shadow="md">
      <Group justify="space-between" mb="xs">
        <Text>{event.name}</Text>
      </Group>
      <Group justify="flex-end" mt="md" grow>
        <ButtonApp title='Delete' handler={deleteEventHandler} disabled={false}/>
      </Group>
    </Paper>
  )
}