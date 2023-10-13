import * as React from "react";
import Box from "@mui/material/Box";

const ErrorMessage = ({message}) => {
    return (
        <Box display="flex" justifyContent="center">{'An error has occurred: ' + message}</Box>
    )
}

export default ErrorMessage
