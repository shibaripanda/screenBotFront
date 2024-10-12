import { Button } from "@mantine/core"
import React from "react"

export const ButtonApp = ({handler, title}) => {

    return (
        <Button
            fullWidth 
            variant="default" 
            size="xs"
            onClick={handler}>
            {title}
        </Button>
    )

}