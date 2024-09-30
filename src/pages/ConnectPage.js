import '@mantine/core/styles.css'
import { useEffect } from 'react'
import '../styles/App.css'
import { HelloScreen } from '../components/helloscreen/HelloScreen.tsx'

export function ConnectPage() {

  useEffect(() => {
    sessionStorage.removeItem('token')
  }, [])

  return (
    <div style={{marginTop: '10vmax'}}>
      <HelloScreen/>
    </div>
  )

}