import React, { useState } from 'react'
import { Button, Paper, TextInput } from '@mantine/core';
import { SocketApt } from '../../socket/api/socket-api.ts';

export function CreateNewBotForm() {
    const [value, setValue] = useState('')
    const [resStatus, setResStatus] = useState('')

    SocketApt.socket?.on('createNewBot', (data) => {
        setResStatus(data)
        console.log(data)
    })

    const activButton = () => {
        if(value !== '') return false
        return true
    }

    return (
        <Paper shadow="sm" p="xl">
            <TextInput
            label={resStatus}
            description="Token from BotFather"
            placeholder="token"
            value={value}
            onChange={(event) => {
                setResStatus('')
                setValue(event.currentTarget.value)
            }}
            />
            <Button 
                style={{marginTop: '1vmax'}}
                disabled={activButton()}
                onClick={()=> {
                    SocketApt.socket?.emit('createNewBot', {token: value})
                    setValue('')
                }}
                >
                Создать
            </Button>
        </Paper>
    )

}