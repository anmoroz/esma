import * as React from "react";

import Box from "@mui/material/Box";
import IndexToolbar from "../../common/IndexToolbar";
import Divider from "@mui/material/Divider";


export function Component() {

    return (
        <>
            <IndexToolbar disabled={true} />
            <Divider />
            <Box sx={{ p: 2 }}>
                Index is not selected
            </Box>
        </>
    );
}
