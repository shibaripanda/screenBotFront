import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text } from '@mantine/core';

export function ModalCreateScreen({botName, screen, sendMeScreen, activButtonCreateScreen, createScreen, botId, setNewScreenName, newScreenName}) {
  const [opened, { open, close }] = useDisclosure(false);
  console.log(screen)

  return (
    <>
      <Modal opened={opened} 
        onClose={() => {
            setNewScreenName('')
            createScreen(botId, '')
            setTimeout(() => {close()}, )
            }} 
        title={`Creating new screen for ${botName}`}>
        <Text>{newScreenName}</Text>
        <hr style={{marginTop: '0.5vmax', marginBottom: '3vmax'}}></hr>
        <Button variant="default" size="xs"
        onClick={() => {
          sendMeScreen(screen._id)
        }}>
          Send me
        </Button>
      </Modal>

      <Button variant="default" size="xs"
            disabled={activButtonCreateScreen()}
            onClick={() => {
                createScreen(botId, newScreenName)
                open()
                }}>
            Create new screen
        </Button>
    </>
  );
}