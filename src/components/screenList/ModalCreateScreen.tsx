import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

export function ModalCreateScreen({activButtonCreateScreen, createScreen, botId, setNewScreenName, newScreenName}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} 
        onClose={() => {
            setNewScreenName('')
            createScreen(botId, '')
            setTimeout(() => {close()}, )
            }} 
        title="Creating new screen...">
        {newScreenName}
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