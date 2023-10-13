import * as React from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import LoopIcon from "@mui/icons-material/Loop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import CallMergeIcon from "@mui/icons-material/CallMerge";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TerminalIcon from "@mui/icons-material/Terminal";
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import Stack from "@mui/material/Stack";
import {AppContext} from "../../../../context/AppContext";
import {useParams} from "react-router-dom";
import {useIndexInfo} from "../../../../hooks/useIndexInfo";


const IndexToolbar = (props) => {

    if (props.disabled) {
        return (
            <>
                <Stack direction="row" spacing={1}>
                    <IconButton disabled={true} ><HelpOutlineIcon /></IconButton>
                    <IconButton disabled={true} ><EqualizerIcon /></IconButton>
                    <IconButton disabled={true} ><LoopIcon /></IconButton>
                    <IconButton disabled={true} ><ArrowCircleDownIcon /></IconButton>
                    <IconButton disabled={true} ><CallMergeIcon /></IconButton>
                    <IconButton disabled={true} ><EditIcon /></IconButton>
                    <IconButton disabled={true} ><TerminalIcon /></IconButton>
                    <IconButton disabled={true} ><HighlightOffIcon /></IconButton>
                    <IconButton disabled={true} ><DeleteOutlineIcon /></IconButton>
                </Stack>
            </>
        )
    }

    const params = useParams();
    const { showConfirmDialog } = React.useContext(AppContext)

    const indexQuery = useIndexInfo(params.connectionId, params.indexId)

    const openTerminalHandler = () => {

    }

    const deleteIndexHandler = () => {
        showConfirmDialog(`Do you really want to delete "${indexQuery.data.name}" index?`, () => {
            props.indexActionHandler("delete")
            props.refreshIndices()
        })
    }


    return (
        <>
            <Stack direction="row" spacing={1}>
                <Tooltip title="Info">
                    <span>
                        <IconButton color="secondary" disabled={props.action === "info"} onClick={() => {props.indexActionHandler("info")}} >
                            <HelpOutlineIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                {
                    indexQuery.data.state === "open" &&
                    <React.Fragment>
                        <Tooltip title="Stats">
                            <span>
                                <IconButton color="secondary" disabled={props.action === "stats"} onClick={() => {props.indexActionHandler("stats")}}>
                                    <EqualizerIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Refresh">
                            <span>
                                <IconButton color="secondary" disabled={props.action === "refresh"} onClick={() => {props.indexActionHandler("refresh")}} >
                                    <LoopIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Flush">
                            <span>
                                <IconButton color="secondary" disabled={props.action === "flush"} onClick={() => {props.indexActionHandler("flush")}} >
                                    <ArrowCircleDownIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Force merege">
                            <span>
                                <IconButton color="secondary" disabled={props.action === "forcemerge"} onClick={() => {props.indexActionHandler("forcemerge")}} >
                                    <CallMergeIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Health">
                            <span>
                                <IconButton color="secondary" disabled={props.action === "health"} onClick={() => {props.indexActionHandler("health")}} >
                                    <HealthAndSafetyOutlinedIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="State">
                            <span>
                                <IconButton color="secondary" disabled={props.action === "state"} onClick={() => {props.indexActionHandler("state")}} >
                                    <AssessmentOutlinedIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Update mapping">
                            <span>
                                <IconButton color="secondary" disabled={props.action === "mapping"} onClick={() => {}} >
                                    <EditIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Query console">
                            <span>
                                <IconButton color="secondary" disabled={props.action === "console"} onClick={openTerminalHandler} >
                                    <TerminalIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Close index">
                            <span>
                                <IconButton color="error" disabled={props.action === "close"} onClick={() => {props.indexActionHandler("close")}} >
                                    <HighlightOffIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </React.Fragment>
                }

                {
                    indexQuery.data.state === "close" &&
                    <Tooltip title="Open index">
                        <span>
                            <IconButton color="error" disabled={props.action === "open"} onClick={() => {
                                props.indexActionHandler("open")
                            }}>
                                <CheckCircleOutlineIcon/>
                            </IconButton>
                        </span>
                    </Tooltip>
                }

                <Tooltip title="Delete index">
                    <IconButton color="error" disabled={props.action === "delete"} onClick={deleteIndexHandler} >
                        <DeleteOutlineIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        </>
    )
}

export default IndexToolbar
