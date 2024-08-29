import { LoginButton } from '@telegram-auth/react';
import axios from "axios";
import { axiosCall } from './axiosCall';

export function TelegramVidget(props) {
    return (
        <div>
            <LoginButton
                botUsername='Testxf_Bot'
                onAuthCallback={async (data) => {
                    return await axios({
                      method: 'POST',
                      url: 'http://localhost:5002/auth/login',
                      data: data,
                      // headers: {'Authorization': 'Bearer ' + sessionData('read', 'token')},
                      timeout: 10000
                    })
                    .then(async (res) => {
                        console.log(res.data)
                        sessionStorage.setItem('token', res.data.token)
                        props.setStatus('Authorized')
                        const res2 = await axiosCall('GET', `http://localhost:5002/user`, {})
                        console.log(res2.data)
                    })
                    .catch((er) => {
                        console.log(er)
                        sessionStorage.removeItem('token')
                        props.setStatus(er.response.statusText)
                    })
                }}
            />
        </div>
    )
}
