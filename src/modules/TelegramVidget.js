import { LoginButton } from '@telegram-auth/react';
import axios from "axios";

export function TelegramVidget() {
    return (
        <div>
            <LoginButton
                botUsername='Testxf_Bot'
                onAuthCallback={async (data) => {
                    console.log(data)
                    return await axios({
                      method: 'POST',
                      url: 'http://localhost:5002/auth/login',
                      data: data,
                      // headers: {'Authorization': 'Bearer ' + sessionData('read', 'token')},
                      timeout: 10000
                  })
                    // call your backend here to validate the data and sign in the user
                }}
            />
        </div>
    )
}
