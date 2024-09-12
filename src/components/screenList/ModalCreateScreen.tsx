import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Text, Group, Switch, Grid, Spoiler, Tooltip } from '@mantine/core'

export function ModalCreateScreen({clearScreen, protectScrreen, editScreen, modalTitle, screen, sendMeScreen}) {

  const [opened, { open, close }] = useDisclosure(false)
  const [checked, setChecked] = useState(screen.protect)
  const [editButtons, setEditButtons] = useState(false)

  const buts = [
    [{text: '1', to: 'google.com', action: 'url'},{text: '2', to: 'google.com', action: 'url'}, {text: '3', to: 'google.com', action: 'url'}], 
    [{text: '4', to: 'google.com', action: 'url'}]
  ]

  let butCopy = [...buts]

  // if(editButtons){
  //   for(let i of butCopy){
  //     i.push({text: '➕', to: 'google.com', action: 'url'})
  //     i.unshift({text: '➕', to: 'google.com', action: 'url'})
  //   }
  //   butCopy = butCopy.concat([[{text: '➕', to: 'google.com', action: 'url'}]])
  //   butCopy = [[{text: '➕', to: 'google.com', action: 'url'}]].concat(butCopy)
  // }
  
  if(editButtons){
    butCopy.unshift({text: '➕', to: 'google.com', action: 'url'})
    for(let i of butCopy){
      butCopy.splice(butCopy.indexOf(i) + 1, 0, {text: '➕', to: 'google.com', action: 'url'})
      // i.push({text: '➕', to: 'google.com', action: 'url'})
    }
    // butCopy = butCopy.concat([[{text: '➕', to: 'google.com', action: 'url'}]])
    // butCopy = [[{text: '➕', to: 'google.com', action: 'url'}]].concat(butCopy)
  }
  

  console.log(butCopy)

  const keyboard = () => {
    const toolTipText = (text) => {
      if(text === '➕') return 'Add button'
      return 'Delete' 
    }
    if(editButtons){
      return (
        <div style={{marginTop: '1vmax'}}>
          {butCopy.map((item, index) => 
            <Grid key={index}>
              {item.map((but, index) => 
              <Grid.Col span={12 / item.length} key={index}>
                <Tooltip label={toolTipText(but.text)}>
                  <Button variant="outline" fullWidth>
                    {but.text}
                  </Button>
                </Tooltip>
              </Grid.Col>)}
            </Grid>)}
        </div>
      )
    }
    return (
      <div style={{marginTop: '1vmax'}}>
          {butCopy.map((item, index) => 
            <Grid key={index}>
              {item.map((but, index) => 
              <Grid.Col span={12 / item.length} key={index}>
                {/* <Tooltip label="Test"> */}
                  <Button variant="outline" fullWidth>
                    {but.text}
                  </Button>
                {/* </Tooltip> */}
              </Grid.Col>)}
            </Grid>)}
        </div>
    )
  }

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
          <div>
            <Button style={{marginLeft: '1vmax'}} color='red' size="xs"
              onClick={() => {
                clearScreen(screen._id)
              }}>
              Clear
            </Button>
            <Button style={{marginLeft: '1vmax'}} variant="default" size="xs"
              onClick={() => {
                sendMeScreen(screen._id)
              }}>
              Send me
            </Button>
          </div>
        </Group>
        <hr style={{marginTop: '0.7vmax', marginBottom: '1.3vmax'}}></hr>


        <Switch
            style={{marginTop: '1.5vmax', marginBottom: '1.5vmax'}}
            label="Protect content"
            radius="lg"
            color='red'
            checked={checked}
            onChange={(event) => {
              setChecked(event.currentTarget.checked)
              protectScrreen(screen._id, event.currentTarget.checked)
            }}
          />
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
          Text: <Spoiler maxHeight={30} showLabel="Show more" hideLabel="Hide">{screen.text}</Spoiler>
        </Text>
        <Text c="dimmed" fz="xl">
          Buttons: <Switch
            style={{marginTop: '1.5vmax', marginBottom: '1.5vmax'}}
            label="Edit buttons mode"
            radius="lg"
            color='red'
            checked={editButtons}
            onChange={(event) => {
              setEditButtons(event.currentTarget.checked)
            }}
          />
        </Text>

        {keyboard()}

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