import classes from "./Connections.module.css";

import * as React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

import { Outlet, NavLink } from "react-router-dom";

import {useConnections} from "../../../../../hooks/useConnections";
import Header from "./Header";
import Copyright from "./Copyright";
import Button from "@mui/material/Button";


export function Component() {
    const connections = useConnections()

    return (
        <React.Fragment>
            <Box sx={{bgcolor: `grey.300`}} className={classes.sidebar}>
                <Box className={classes.sidebarLogo}>
                    <img src="/images/logo.png" alt="Logo" />
                </Box>

                <Divider />

                <List>
                    <ListSubheader sx={{bgcolor: `grey.300`}}>
                        Saved connections
                    </ListSubheader>
                    {connections.data?.map((item) => (
                        <ListItemButton
                            key={item.id}
                            item={item}
                            component={NavLink}
                            to={`${item.id}`}
                        >
                            <ListItemIcon>
                                <ChevronRightIcon />
                            </ListItemIcon>
                            {item.name}
                        </ListItemButton>
                    ))}
                </List>
                <Button component={NavLink} to={"/connections"}>
                    New connection
                </Button>
            </Box>
            <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Header />
                <Divider />
                <div style={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
                    <React.Suspense fallback={<div>loading...</div>}>
                        <Outlet />
                    </React.Suspense>
                </div>
                <Copyright />
            </div>
        </React.Fragment>
    );
}
