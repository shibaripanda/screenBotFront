import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Autocomplete, Select } from '@mantine/core'

export function ModalSendMessage({content, userId, username, screens, activ, user, sendScreenToUser, sendTextToUser}) {

  const [opened, { open, close }] = useDisclosure(false)
  const [screen, setScreen] = useState<string | null>('')
  const [searchValue, setSearchValue] = useState('')

  return (
    <>
      <Modal size={'xl'} opened={opened} 
        onClose={() => {
            setTimeout(() => {close()}, )
            }} 
        title={`Message to @${username} (${user})`}
      >
        <Select
          onSearchChange={setSearchValue}
          clearable
          searchable
          description='Text message or screen'
          style={{marginTop: '0.5vmax'}}
          data={
            screens.map(item => ({label: item.name + ' ( screen )', value: item._id}))
            .concat(content.map((item, index)=> ({label: item.tx + ' ( ' + item.type + ' content )', value: 'content_' + index})))
          }
          value={screen}
          onChange={setScreen}
          
        />
        <Button variant="default" size="xs"
          style={{marginTop: '1.5vmax'}}
          disabled={!screen && !searchValue}
          onClick={() => {
            console.log(screen)
            console.log(searchValue)

            // const res = screens.find(item => item._id === screen)
            // if(res){
            //   sendScreenToUser(res._id, userId)
            // }
            // else if(screen?.substring(0, 6) === 'content'){

            // }
            // else{
            //   sendTextToUser(searchValue, userId)
            // }
            // setScreen('')
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