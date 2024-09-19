import React from 'react'
import { Button, Grid, Group, Paper, Text, TextInput } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export function FindScreenForm({screenFilterLength, bot, screens, createScreen, newScreenName, setNewScreenName, filterScreens, setFilterScreens}) {

    const navigate = useNavigate()

    const activButtonCreateScreen = () => {
        if(newScreenName === '' || screens.map(item => item.name.toLowerCase()).includes(newScreenName.toLowerCase())) return true
        return false
    }

    const activButtonFilter = () => {
        if(filterScreens === '') return true
        return false
    }

    return (
        <Paper withBorder p="lg" radius="md" shadow="md">
            <Group justify="space-between">
                <Button variant="default" size="xs"
                    onClick={() => {
                    navigate(`/main`)
                    }}>
                    Back to all bots
                </Button>
                <Text fw={700}>{bot.name + ' (@' + bot.username + ')'}</Text>
            </Group>

            <hr style={{marginBottom: '2vmax', marginTop: '1.2vmax'}}></hr>

            <Grid justify="space-between" align="flex-end" grow>
                <Grid.Col span={8} key={0}>
                    <TextInput
                        description='Create new screen'
                        placeholder="new screen name"
                        value={newScreenName}
                        onChange={(event) => {
                            setNewScreenName(event.currentTarget.value)
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={4} key={1}>
                    <Button variant="default" 
                        disabled={activButtonCreateScreen()}
                        onClick={() => {
                            createScreen(newScreenName)
                            setNewScreenName('')
                            }}>
                        Create new screen
                    </Button>
                </Grid.Col>
            </Grid>

            <hr style={{marginBottom: '2vmax', marginTop: '3vmax'}}></hr>

            <Grid justify="space-between" align="flex-end" grow>
                <Grid.Col span={8} key={0}>
                    <TextInput
                        description='Find screen by name:'
                        placeholder="screen name"
                        value={filterScreens}
                        onChange={(event) => {
                            setFilterScreens(event.currentTarget.value)
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={4} key={1}>
                    <Button variant="default"
                        disabled={activButtonFilter()}
                        onClick={() => {
                            setFilterScreens('')
                            }}>
                        Reset filter ({screenFilterLength}/{screens.length})
                    </Button>
                </Grid.Col>
            </Grid>
        </Paper>
    )

}