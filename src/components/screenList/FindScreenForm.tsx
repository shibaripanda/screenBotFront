import React from 'react'
import { Button, Group, Paper, Text, TextInput } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { ModalCreateScreen } from './ModalCreateScreen.tsx'

export function FindScreenForm({bot, screens, createScreen, newScreenName, setNewScreenName, filterScreens, setFilterScreens, sendMeScreen}) {

    const navigate = useNavigate()

    const activButtonCreateScreen = () => {
        if(newScreenName === '' || screens.map(item => item.name).includes(newScreenName)) return true
        return false
    }

    return (
        <Paper shadow="sm" p="xl">

            <Group>
                <Button variant="default" size="xs"
                    onClick={() => {
                    navigate(`/main`)
                    }}>
                    Back to all bots
                </Button>
                <Text>{bot.name + ' (@' + bot.username + ')'}</Text>
            </Group>

            <hr style={{marginBottom: '1vmax', marginTop: '1vmax'}}></hr>

            <div style={{marginBottom: '1vmax', marginTop: '2vmax'}}>
                <TextInput
                    description='Create new screen'
                    placeholder="new screen name"
                    value={newScreenName}
                    onChange={(event) => {
                        setNewScreenName(event.currentTarget.value)
                    }}
                />
                <div style={{marginTop: '1vmax'}}>
                    <ModalCreateScreen botName={bot.name} screen={screens[0]} sendMeScreen={sendMeScreen} newScreenName={newScreenName} setNewScreenName={setNewScreenName} activButtonCreateScreen={activButtonCreateScreen} createScreen={createScreen} botId={bot._id}/>
                </div>
            </div>

            <hr style={{marginBottom: '2vmax', marginTop: '2vmax'}}></hr>

            <TextInput
                description='Find screen by name:'
                placeholder="screen name"
                value={filterScreens}
                onChange={(event) => {
                    setFilterScreens(event.currentTarget.value)
                }}
            />
        </Paper>
    )

}