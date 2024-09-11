import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Text, Group, Switch } from '@mantine/core'

export function ModalCreateScreen({protectScrreen, getScreensFromServer, editScreen, modalTitle, screen, sendMeScreen}) {

  const [opened, { open, close }] = useDisclosure(false)
  const [checked, setChecked] = useState(screen.protect)

  return (
    <>
      <Modal opened={opened} 
        onClose={() => {
            editScreen('')
            setTimeout(() => {close()}, )
            }} 
        title={modalTitle}
      >

        
        <Group justify="space-between" mt="md">
          <Text fz="xl">{screen.name}</Text>
          <Button variant="default" size="xs"
            onClick={() => {
              sendMeScreen(screen._id)
              getScreensFromServer()
            }}>
            Send me
          </Button>
        </Group>
        <hr style={{marginTop: '0.7vmax', marginBottom: '1.3vmax'}}></hr>

        <Text c="dimmed" fz="xl">
          Media: {screen.media.map(item => '🖼')}
        </Text>
        <Text c="dimmed" fz="xl">
          Documents: {screen.document.map(item => '🗂')}
        </Text>
        <Text c="dimmed" fz="xl">
          Audio: {screen.audio.map(item => '🎼')}
        </Text>
        <Text c="dimmed" fz="xl">
          Buttons: {screen.buttons.length}
        </Text>
        <Text c="dimmed" fz="xl">
          Text: {screen.text}
        </Text>

        <Switch
            style={{marginTop: '1.5vmax'}}
            label="Protect content"
            radius="lg"
            color='gray'
            checked={checked}
            onChange={(event) => {
              setChecked(event.currentTarget.checked)
              protectScrreen(screen._id, event.currentTarget.checked)
            }}
          />
      </Modal>

      <Button variant="default" size="xs"
        onClick={() => {
            editScreen(screen._id)
            open()
            }}>
        Edit
      </Button>
    </>
  );
}