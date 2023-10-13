import * as React from "react";

import { useParams, Outlet } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import ClusterInfo from "./ClusterInfo";
import {useClusterData} from "../../../../../hooks/useClusterData";
import Loader from "../../../../../components/common/Loader";


export function Component() {
    const params = useParams();

    const { isLoading, error, data } = useClusterData(params.connectionId, "indices");

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, marginTop: '16px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '260px', border: 1, borderColor: 'grey.300', marginLeft: '16px' }}>
                <Paper elevation={0} sx={{ height: '100%', width: '100%' }}>
                    {
                        isLoading
                            ? <Loader/>
                            : <ClusterInfo indices={data}/>
                    }
                </Paper>
            </Box>
            <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: "column", marginX: '16px', border: 1, borderColor: 'grey.300' }}>
                <Paper elevation={0} sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <React.Suspense fallback={<Loader/>}>
                        <Outlet />
                    </React.Suspense>
                </Paper>
            </Box>
        </Box>
    )
}
