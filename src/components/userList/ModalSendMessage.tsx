import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Autocomplete } from '@mantine/core'

export function ModalSendMessage({userId, username, screens, activ, user, sendScreenToUser, sendTextToUser}) {

  const [opened, { open, close }] = useDisclosure(false)
  const [screen, setScreen] = useState('')

  return (
    <>
      <Modal size={'xl'} opened={opened} 
        onClose={() => {
            setTimeout(() => {close()}, )
            }} 
        title={`Message to @${username} (${user})`}
      >
        <Autocomplete
          description='Text message or screen'
          style={{marginTop: '0.5vmax'}}
          data={screens.map(item => ({value: item.name, index: item._id}))}
          value={screen}
          onChange={(event) => {
              console.log(event)
              setScreen(event)
            }
          }
        />
        <Button variant="default" size="xs"
          style={{marginTop: '1.5vmax'}}
          disabled={!screen}
          onClick={() => {
            const res = screens.find(item => item.name === screen)
            if(!res){
              sendTextToUser(screen, userId)
            }
            else{
              sendScreenToUser(res._id, userId)
            }
            setScreen('')
        }}>
        Send message
        </Button>
       

      </Modal>

      <Button variant="default" size="xs"
        disabled={!activ}
        onClick={() => {
            open()
            }}>
        Send message
      </Button>
    </>
  )
}