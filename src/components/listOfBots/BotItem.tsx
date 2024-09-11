import { Button, Paper, Text, Group, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function BotItem({bot, deleteBot, offBot, onBot}) {

  const [deleteValue, setDeleteValue] = useState('')
  const navigate = useNavigate()

  const botStatus = (status) => {
    if(status) return '✅'
    return '❌' 
  }
  const deleteButton = () => {
    if(deleteValue === bot.name) return false
    return true
  }
  const onOffButton = () => {
    if(bot.status){
      return (
        <Button variant="default" size="xs"
        onClick={() => {
          offBot(bot._id)
        }}>
          Off
        </Button>
      )
    }
    return (
      <Button variant="default" size="xs"
      onClick={() => {
        onBot(bot._id)
      }}>
          On
      </Button>
    )
  }

  return (
    <Paper withBorder p="lg" radius="md" shadow="md">
      <Group justify="space-between" mb="xs">
        <Text fz="md" fw={500}>
          {bot.name} (@{bot.username}) {botStatus(bot.status)}
        </Text>
      </Group>
      <Text c="dimmed" fz="xs">
        id: {bot._id}
      </Text>
      <Text c="dimmed" fz="xs">
        {new Date(bot.createdAt).toLocaleDateString()}
      </Text>
      <Text c="dimmed" fz="xs">
        Status: {botStatus(bot.status)}
      </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" size="xs">
          Monitor
        </Button>
        <Button variant="default" size="xs"
        onClick={() => {
          navigate(`/botedit/${bot._id}`)
        }}>
          Edit
        </Button>
        {onOffButton()}
        <TextInput
            size="xs"
            placeholder='Text bot`s name for delete'
            value={deleteValue}
            onChange={(event) => {
              setDeleteValue(event.currentTarget.value)
            }}
            />
        <Button
         disabled={deleteButton()}
         color='red'
         size="xs"
         onClick={() => {
          deleteBot(bot._id)
          setDeleteValue('')
        }}
         >
          Delete
        </Button>
      </Group>
    </Paper>
  );
}