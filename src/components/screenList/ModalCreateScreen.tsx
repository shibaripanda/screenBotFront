import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Text, Group, Switch, Grid, Spoiler, Tooltip, TextInput, Autocomplete } from '@mantine/core'

export function ModalCreateScreen({screens, editButtons, clearScreen, protectScrreen, editScreen, modalTitle, screen, sendMeScreen}) {

  const [opened, { open, close }] = useDisclosure(false)
  const [checked, setChecked] = useState(screen.protect)
  const [editButtonsMode, setEditButtonsMode] = useState(false)
  const [buttons, setButtons] = useState(JSON.parse(JSON.stringify(screen.buttons)))
  const [newBut, setNewBut] = useState({text: '', to: '', action: ''})
  const [greate, setGreate] = useState('')

  const addOrDeleteButton = (but: object, obj: any) => {
    if(but['to'] === 'addNewBut'){
      if(but['action'] === 'start'){
        buttons.splice(0, 0, [obj])
      }
      else if(but['action'] === 'end'){
        buttons.splice(buttons.length, 0, [obj])
      }
      else{
        buttons[but['action'].split('-')[0]].splice(but['action'].split('-')[1], 0, obj)
      }
    }
    else{
      console.log(but['action'].split('-')[0], but['action'].split('-')[1])
      if(buttons[but['action'].split('-')[0]].length === 1){
        buttons.splice(but['action'].split('-')[0], 1)
      }
      else{
        buttons[but['action'].split('-')[0]].splice(but['action'].split('-')[1], 1)
      }
    }
    setButtons(JSON.parse(JSON.stringify(buttons)))
  }

  const keyboard = () => {

    const toolTipText = (text) => {
      if(text === '➕') return 'Add button'
      return 'Delete' 
    }

    const saveActivButtons = () => {
      if(JSON.parse(JSON.stringify(buttons)) === JSON.parse(JSON.stringify(screen.buttons))){
        return true
      }
      return false
    }

    if(editButtonsMode){
      const timeButtons = JSON.parse(JSON.stringify(buttons))

      for(let i of timeButtons){
        for(let x of i){
          x.action = `${timeButtons.indexOf(i)}-${i.indexOf(x)}`
        }
        i.push({text: '➕', to: 'addNewBut', action: `${timeButtons.indexOf(i)}-${i.length}`})
      }
      if(timeButtons.length === 0){
        timeButtons.push([{text: '➕', to: 'addNewBut', action: `end`}])
      }
      else{
        timeButtons.unshift([{text: '➕', to: 'addNewBut', action: 'start'}])
        timeButtons.push([{text: '➕', to: 'addNewBut', action: `end`}])
      }

      const disabledButton = (but) => {
        if(but.to === 'addNewBut'){
          if(newBut.text === '' || newBut.to === '' || newBut.action === ''){
            return true
          }
          return false
        }
        return false
      }

      const creatingButtonName = () => {
        return (
          <TextInput
                description='Create new button'
                placeholder="button name"
                value={newBut.text}
                onChange={(event) => {
                  setNewBut({...newBut, text: event.currentTarget.value})
                }}
            />
        )
      }

      const creatingButtonTo = () => {
        if(newBut.text){
          return (
            <Autocomplete
              label="Link to your screen or internet link"
              placeholder="target"
              data={screens.map(item => item.name + ' ' + item._id)}
              value={greate}
              onChange={(event) => {
                const check = event.split(' ')
                if(screens.map(item => item._id).includes(check[check.length - 1])){
                  setNewBut({...newBut, to: check[check.length - 1], action: 'callback'})
                  check.splice(check.length - 1, 1)
                  setGreate(check.join(' ') + ' (your screen)')
                }
                else{
                  setNewBut({...newBut, to: event, action: 'url'})
                  setGreate(event)
                }
              }}
            />
          )
        }
      }

      return (
        <div style={{marginTop: '1vmax'}}>
          {timeButtons.map((item, index) => 
            <Grid key={index}>
              {item.map((but, index) => 
              <Grid.Col span={12 / item.length} key={index}>
                <Tooltip label={toolTipText(but.text)}>
                  <Button variant="outline" fullWidth
                  disabled={disabledButton(but)}
                  onClick={() => {
                    addOrDeleteButton(but, {text: newBut.text, to: newBut.to, action: newBut.action})
                    setNewBut({text: '', to: '', action: ''})
                    setGreate('')
                  }}>
                    {but.text}
                  </Button>
                </Tooltip>
              </Grid.Col>)}
            </Grid>)}

            <div style={{width: '100%', marginTop: '2vmax'}}>
              {creatingButtonName()}
              <div style={{marginTop: '1vmax'}}>
                {creatingButtonTo()}
              </div>
            </div>
            
            <Button style={{marginTop: '2vmax'}} variant="default" size="xs"
            disabled={saveActivButtons()}
              onClick={() => {
                editButtons(screen._id, buttons)
              }}>
              Save keyboard
            </Button>
        </div>
      )
    }
    return (
      <div style={{marginTop: '1vmax'}}>
          {buttons.map((item, index) => 
            <Grid key={index}>
              {item.map((but, index) => 
              <Grid.Col span={12 / item.length} key={index}>
                <Button variant="outline" fullWidth>
                  {but.text}
                </Button>
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
        <Group>
        <Text c="dimmed" fz="xl">
          Text: 
        </Text>
        <Spoiler maxHeight={30} showLabel="Show more" hideLabel="Hide">{screen.text}</Spoiler>
        </Group>
        <Text c="dimmed" fz="xl">
          Buttons: <Switch
            style={{marginTop: '1.5vmax', marginBottom: '1.5vmax'}}
            label="Edit buttons mode"
            radius="lg"
            color='red'
            checked={editButtonsMode}
            onChange={(event) => {
              setEditButtonsMode(event.currentTarget.checked)
              if(!event.currentTarget.checked) setButtons(JSON.parse(JSON.stringify(buttons)))
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