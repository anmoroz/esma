import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
    return (
        <Box display="flex" justifyContent="center"><CircularProgress /></Box>
    )
}

export default Loader
