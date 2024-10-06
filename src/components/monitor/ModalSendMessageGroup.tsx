import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Select, ComboboxItem, Textarea, Text, Grid } from '@mantine/core'

export function ModalSendMessageGroup({selectedRows, content, screens, sendScreenToUser, sendTextToUser, sendContentToUser}) {

  const [opened, { open, close }] = useDisclosure(false)
  const [screen, setScreen] = useState<ComboboxItem | null>(null)
  const [text, setText] = useState('')

  const textButDis = (text) => {
    if(text){
      if(text.length > 4096) return true
      return false
    }
    return true
  }

  const textLength = (text) => {
    if(text.length > 4096){
      return <Text fz='sm' c='red'>Text {text.length}/4096</Text>
    }
    return <Text fz='sm' c='grey'>Text {text.length}/4096</Text>
  }

  const statusUser = (status) => {
    if(status) return '✅'
    return '❌'  
  }

  return (
    <>
      <Modal size={'xl'} opened={opened} 
        onClose={close} 
        title={`Message to selected (${selectedRows.length})`}
      >
        <Grid>
          {selectedRows.map((item, index)=> <Grid.Col key={index} span={3}>@{item.username}{statusUser(item.status)}</Grid.Col>)}
        </Grid>
        <hr style={{marginBottom: '2vmax', marginTop: '1vmax'}}></hr>
        <Select
          clearable
          searchable
          description={<Text fz='sm' c='grey'>Screen or content</Text>}
          style={{marginTop: '0.5vmax'}}
          data={
            screens.map(item => ({label: item.name + ' ( screen )', value: item._id}))
            .concat(content.map((item, index)=> ({label: (item.tx ? item.tx : 'noname') + ' ( ' + item.type + ' content )', value: 'content_' + index})))
          }
          value={screen ? screen.value : null}
          onChange={(_value, option) => {
            setScreen(option)
          }}
        />
        <Button variant="default" size="xs"
          style={{marginTop: '1.5vmax'}}
          disabled={!screen}
          onClick={() => {
            const res = screens.find(item => item._id === screen?.value)
            if(res){
              for(let i of selectedRows){
                if(i.status) sendScreenToUser(res._id, i.id)
              }
            }
            else if(screen?.value.substring(0, 7) === 'content'){
              for(let i of selectedRows){
                if(i.status) sendContentToUser(content[Number(screen.value.split('_')[1])], i.id)
              }
            }
            setScreen(null)
        }}>
        Send screen or content
        </Button>
        <Textarea
          autosize
          minRows={2}
          style={{marginTop: '3vmax'}}
          description={textLength(text)}
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
        />
        <Button variant="default" size="xs"
          style={{marginTop: '1.5vmax'}}
          disabled={textButDis(text)}
          onClick={() => {
            for(let i of selectedRows){
              if(i.status) sendTextToUser(text, i.id)
            }
            setText('')
          }}>
          Send text
        </Button>
      </Modal>

      <Button variant="default" size="xs" fullWidth
        disabled={!selectedRows.length}
        onClick={() => {
            open()
            }}>
        Message to selected ({selectedRows.length})
      </Button>
    </>
  )
}