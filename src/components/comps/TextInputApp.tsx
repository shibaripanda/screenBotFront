import { TextInput } from "@mantine/core"
import React from "react"

export const TextInputApp = ({placeholder, value, handler}) => {

    return (
        <TextInput
           size='xs'
           placeholder={placeholder}
           value={value}
           onChange={(event) => {
            handler(event.currentTarget.value)
          }}
       />
   )
   
}