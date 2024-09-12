import React from 'react'
import { Button, Group, Paper, Text, TextInput } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export function FindScreenForm({screenFilterLength, bot, screens, createScreen, newScreenName, setNewScreenName, filterScreens, setFilterScreens}) {

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
                    <Button variant="default" size="xs"
                        disabled={activButtonCreateScreen()}
                        onClick={() => {
                            createScreen(newScreenName)
                            setNewScreenName('')
                            }}>
                        Create new screen
                    </Button>
                    
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
            <Text style={{marginTop: '0.3vmax', marginLeft: '0.5vmax'}} c="dimmed" fz="xs">{screenFilterLength} ({screens.length})</Text>
        </Paper>
    )

}