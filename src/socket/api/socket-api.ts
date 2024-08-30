import io, { Socket } from 'socket.io-client';

export class SocketApt {
    static socket: null | Socket = null

    static createConnections(): void {

        this.socket = io('ws://localhost:5002', {auth: {token: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}}})

        // this.socket = io({auth: {token: "abc"}})

        this.socket.on('connect', () => {
            console.log('connect')
        })

        this.socket.on('disconnect', () => {
            console.log('disconnect')
        })

        // this.socket.on('res', (data) => {
        //     console.log(data)
        // })

    }
}