import { Button, Paper, Text, Group, TextInput } from '@mantine/core';
import React, { useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { BotEditPage } from '../../pages/BotEditPage';
import { fix } from '../../fix/fix';

export function ScreenItem({screen}) {

  const [deleteValue, setDeleteValue] = useState('')
  const navigate = useNavigate()

  // const botStatus = (status) => {
  //   if(status) return '✅'
  //   return '❌' 
  // }
  const deleteButton = () => {
    if(deleteValue === screen.name) return false
    return true
  }
  // const onOffButton = () => {
  //   if(bot.status){
  //     return (
  //       <Button variant="default" size="xs"
  //       onClick={() => {
  //         offBot(bot._id)
  //       }}>
  //         Off
  //       </Button>
  //     )
  //   }
  //   return (
  //     <Button variant="default" size="xs"
  //     onClick={() => {
  //       onBot(bot._id)
  //     }}>
  //         On
  //     </Button>
  //   )
  // }

  return (
    <Paper withBorder p="lg" radius="md" shadow="md">
      <Group justify="space-between" mb="xs">
        {/* <Button variant="default" size="xs"
        onClick={() => {
          navigate(`/main`)
        }}>
          Back
        </Button> */}
        <Text fz="md" fw={500}>
          {screen.name} ({screen.index})
        </Text>
      </Group>
      <Text c="dimmed" fz="xs">
        id: {screen._id}
      </Text>
      <Text c="dimmed" fz="xs">
        {new Date(screen.createdAt).toLocaleDateString()}
      </Text>
      <Text c="dimmed" fz="xs">
        Text: {screen.text}
      </Text>
      <Text c="dimmed" fz="xs">
        Media: {screen.media.length}
      </Text>
      <Text c="dimmed" fz="xs">
        Documents: {screen.document.length}
      </Text>
      <Text c="dimmed" fz="xs">
        Audio: {screen.audio.length}
      </Text>
      <Text c="dimmed" fz="xs">
        Buttons: {screen.buttons.length}
      </Text>
      <Text c="dimmed" fz="xs">
        Protect: {screen.protect}
      </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" size="xs">
          Add content
        </Button>
        <TextInput
            size="xs"
            placeholder='Text screen`s name for delete'
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
          // deleteBot(bot._id)
          // setDeleteValue('')
        }}
         >
          Delete
        </Button>
      </Group>
    </Paper>
  );
}