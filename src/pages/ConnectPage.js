import '@mantine/core/styles.css'
import { useEffect } from 'react'
import '../styles/App.css'
import { TelegramVidget } from '../modules/TelegramVidget'

export function ConnectPage() {

  // const app = new AppClass()

  useEffect(() => {

  }, [])

  
  if(true){

    return (
      <div>
        <TelegramVidget/>
        <button>Connect</button>
        
      </div>
  )
  
  }
  else{
    return (
      <div>Loading...</div>
    )
  }

}