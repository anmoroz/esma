import * as React from "react";
import {prettyPrintJson} from "pretty-print-json";
import Box from "@mui/material/Box";

const Output = (props) => {

    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-end",
                pr: 2,
                color: props.indexQuery.status === "success" ? "green" : "red"
            }} >
                {props.indexQuery.status}
            </Box>
            <Box sx={{
                p: 2,
                pt: 0,
                overflowY: "auto",
                flexGrow: 1,
                height: "1px"
            }}>
                <pre dangerouslySetInnerHTML={{ __html: prettyPrintJson.toHtml(props.data) }}></pre>
            </Box>
        </>

    )
}

export default Output
