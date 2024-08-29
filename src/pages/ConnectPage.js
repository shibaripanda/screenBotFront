import '@mantine/core/styles.css'
import { useEffect, useState } from 'react'
import '../styles/App.css'
import { TelegramVidget } from '../modules/TelegramVidget'

export function ConnectPage() {

  const [status, setStatus] = useState('unAuth')

  // const app = new AppClass()

  // const authControl = (status) => {
  //   setStatus(status)
  // }

  useEffect(() => {

  }, [])

  
  if(true){

    return (
      <div>
        {status}
        <TelegramVidget setStatus={setStatus}/>
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