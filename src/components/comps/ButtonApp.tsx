import { Button } from "@mantine/core"
import React from "react"

export const ButtonApp = ({handler, title, disabled}) => {

    return (
        <Button
            fullWidth 
            variant="default" 
            size="xs"
            disabled={disabled ? disabled : false}
            onClick={handler}
        >
            {title}
        </Button>
    )

}