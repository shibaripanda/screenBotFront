import { Button, Paper, Text, Group, TextInput } from '@mantine/core';
import React, { useState } from 'react'
import { ModalCreateScreen } from './ModalCreateScreen.tsx'

export function ScreenItem({screenForAnswer, updateVariable, screens, editButtons, clearScreen, protectScrreen, editScreen, bot, screen, deleteScreen, sendMeScreen}) {

  const [deleteValue, setDeleteValue] = useState('')

  const deleteButton = () => {
    if(deleteValue === screen.name) return false
    return true
  }

  const startScreen = () => {
    if(screen.name !== 'Start screen'){
      return (
        <>
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
            deleteScreen(screen._id)
            setDeleteValue('')
          }}
          >
            Delete
          </Button>
          </>
      )
    }
  }

  const usedCount = () => {
    const res = screens.map(item => item.buttons)
    return res.flat(Infinity).filter(item => item.to === screen._id).length
  }

  return (
    <Paper withBorder p="lg" radius="md" shadow="md">
      <Group justify="space-between" mb="xs">
        <Text fz="md" fw={500}>
          {screen.name} 
        </Text>
      </Group>
      <Text c="dimmed" fz="xs">
        id: {screen._id}
      </Text>
      <Text c="dimmed" fz="xs">
        {new Date(screen.createdAt).toLocaleDateString()}
      </Text>
      <Text c="dimmed" fz="xs">
        Activ links to this screen: {usedCount()}
      </Text>
      {/* <Text c="dimmed" fz="xs">
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
      </Text> */}
      <Group justify="flex-end" mt="md">
        <ModalCreateScreen 
          modalTitle={`Edit screen for ${bot.name}`} 
          screen={screen}
          editScreen={editScreen} 
          sendMeScreen={sendMeScreen}
          protectScrreen={protectScrreen}
          clearScreen={clearScreen}
          editButtons={editButtons}
          screens={screens}
          updateVariable={updateVariable}
          screenForAnswer={screenForAnswer}
          />
        <Button variant="default" size="xs"
        onClick={() => {
          sendMeScreen(screen._id)
        }}>
          Send me
        </Button>
        {startScreen()}
        {/* <TextInput
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
          deleteScreen(screen._id)
          setDeleteValue('')
        }}
         >
          Delete
        </Button> */}
      </Group>
    </Paper>
  );
}