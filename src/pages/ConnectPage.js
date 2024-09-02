import '@mantine/core/styles.css'
import { useEffect } from 'react'
import '../styles/App.css'
import { TelegramVidget } from '../modules/TelegramVidget'

export function ConnectPage() {

  useEffect(() => {
    sessionStorage.removeItem('token')
  }, [])

  return (
    <div style={{marginTop: '20vmax'}}>
      <div style={{marginBottom: '5vmax'}}>
        Редактор Telegram бота
      </div>
      <TelegramVidget/>
    </div>
  )

}