import React, { useState } from 'react'
import { Button, Group, Paper, TextInput } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export function FindScreenForm({bot, screen}) {


    const [value, setValue] = useState('')
    const navigate = useNavigate()

    return (
        <Paper shadow="sm" p="xl">
            <div style={{marginBottom: '2vmax'}}>
                <Group>
                    <Button variant="default" size="xs"
                        onClick={() => {
                        navigate(`/main`)
                        }}>
                        Back to all bots
                    </Button>
                    <Button variant="default" size="xs"
                        onClick={() => {
                        navigate(`/main`)
                        }}>
                        Create new screen
                    </Button>
                </Group>
            </div>
            <TextInput
            label={bot.name + ' (@' + bot.username + ')'}
            description='Find screen by name:'
            placeholder="screen name"
            value={value}
            onChange={(event) => {
                setResStatus(link)
                setValue(event.currentTarget.value)
            }}
            />
        </Paper>
    )

}