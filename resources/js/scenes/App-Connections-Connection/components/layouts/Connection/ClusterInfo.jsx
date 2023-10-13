import * as React from "react";
import clsx from 'clsx';
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoopIcon from "@mui/icons-material/Loop";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import {TreeView} from "@mui/x-tree-view/TreeView";
import { TreeItem, useTreeItem } from '@mui/x-tree-view/TreeItem';
import {useParams, NavLink} from "react-router-dom";

import AddIndexDialog from "../../common/AddIndexDialog";
import {useIndexInfo} from "../../../../../hooks/useIndexInfo";
import {useQueryClient} from "@tanstack/react-query";
import {AppContext} from "../../../../../context/AppContext";


const ClusterInfo = (props) => {
    const params = useParams();
    const { showSnackbarMessage } = React.useContext(AppContext)

    const [openAddIndexDialog, setOpenAddIndexDialog] = React.useState(false);

    const addIndexHandler = () => {
        setOpenAddIndexDialog(true);
    }

    const addIndexCloseDialogHandler = () => {
        setOpenAddIndexDialog(false);
    }

    const queryClient = useQueryClient()
    const refreshHandler = () => {
        queryClient.invalidateQueries({ queryKey: ["connection", params.connectionId, "indices"] })
        showSnackbarMessage("The data is up to date", "success")
    }

    const CustomContent = React.forwardRef(function CustomContent(props, ref) {
        const {
            className,
            classes,
            label,
            nodeId,
            icon: iconProp,
            expansionIcon,
            displayIcon,
        } = props;

        const {
            disabled,
            expanded,
            selected,
            focused,
            handleExpansion,
            handleSelection,
            preventSelection,
        } = useTreeItem(nodeId);

        const icon = iconProp || expansionIcon || displayIcon;

        const handleMouseDown = (event) => {
            preventSelection(event);
        };

        const handleClick = (event) => {
            handleExpansion(event);
            handleSelection(event);
        };

        const indexQuery = useIndexInfo(params.connectionId, props.nodeId)

        let color = "disabled";
        switch (indexQuery.data.status) {
            case 'yellow':
                color = indexQuery.data.state === "close" ? "grey" : "warning"
                break
            case 'green':
                color = "success"
                break
            case 'red':
                color = "error"
                break
        }

        return (
            <NavLink to={`indices/${nodeId}`}>
                <div
                    className={clsx(className, classes.root, {
                        'Mui-expanded': expanded,
                        'Mui-selected': selected,
                        'Mui-focused': focused,
                        'Mui-disabled': disabled,
                    })}
                    onClick={handleClick}
                    onMouseDown={handleMouseDown}
                    ref={ref}
                    style={{ padding: "6px 0", color: "#01579b"}}
                >
                    <div className="MuiTreeItem-contentBar" />
                    <div className={classes.iconContainer}>{icon}</div>
                    <Badge variant="dot" color={color} anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}} sx={{ mr: 1 }} >
                        <Box component={StorageOutlinedIcon} color="inherit" sx={{ fontSize: 20 }} />
                    </Badge>
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {label}
                    </Typography>
                </div>
            </NavLink>
        );
    });

    const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
        return <TreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
    });

    return (
        <>
            <AddIndexDialog
                connectionId={params.connectionId}
                openAddIndexDialog={openAddIndexDialog}
                addIndexCloseDialogHandler={addIndexCloseDialogHandler}
            />

            <Stack direction="row" spacing={1}>
                <IconButton color="secondary" title="Add index" onClick={addIndexHandler}>
                    <AddCircleOutlineIcon />
                </IconButton>
                <IconButton color="secondary" title="Refresh" onClick={refreshHandler}>
                    <LoopIcon />
                </IconButton>
            </Stack>

            <Divider sx={{ bgcolor: 'white' }} />

            <Box sx={{ p: 2 }}>
                <TreeView
                    aria-label="ES cluster navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    defaultExpanded={['indices']}
                    sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                    selected={params.indexId}
                >
                    <TreeItem nodeId="indices" label="Indices">
                        {Object.entries(props.indices).map(([indexName, metadata]) =>
                            <CustomTreeItem
                                key={ metadata.settings.index.uuid }
                                nodeId={ metadata.settings.index.uuid }
                                label={ indexName }
                            />
                        )}
                    </TreeItem>
                </TreeView>
            </Box>
        </>
    )
}

export default ClusterInfo
