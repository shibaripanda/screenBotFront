import { useEffect } from "react"
import { SocketApt } from "../api/socket-api.ts"

export const useConnectSocket = () => {

    const connectSocket = () => {
        SocketApt.createConnections()
    }
    
    useEffect(() => {
        console.log('c')
        connectSocket()
    }, [])
}