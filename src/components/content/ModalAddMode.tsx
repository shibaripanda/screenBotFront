import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Group } from '@mantine/core'

export function ModalAddMode({addContent, setAddContentMode}) {

  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal size='sm' opened={opened} 
        onClose={close} 
        title={'Add content mode'}
      >
      <div style={{marginBottom: '3vmax'}}>
        Don't forget to turn off the mode when you add content
        <br /><br />Switching to edit or monitor mode will automatically turn off this mode
      </div>
      <Group justify="flex-end">
      <Button
          color='green'
          size="xs"
          onClick={() => {
            addContent('addContent')
            setAddContentMode(true)
          }}>
            Ok
        </Button>
        <Button 
          variant="default" 
          size="xs"
          onClick={() => {
            close()
          }}>
            Cancel
        </Button>
      </Group>

      </Modal>

      <Button
          color='green'
          size="xs"
          onClick={() => {
            open()
            
          }}>
            Add-content mode
        </Button>
    </>
  )
}