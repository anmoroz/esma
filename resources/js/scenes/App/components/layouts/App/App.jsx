import * as React from "react";
import { Outlet } from "react-router-dom";


export function Component() {
    return (
        <div style={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
            <Outlet />
        </div>
    );
}
