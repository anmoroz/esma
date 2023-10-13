import '../css/index.css';
import '@fontsource/roboto/400.css';

import * as React from "react";
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "./context/AppContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThemeCustomization from './themes/ThemeCustomization';


const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        lazy: () => import("./scenes/App/components/layouts/App/App"),
        children: [
            {
                index: true,
                lazy: () => import("./scenes/App/components/pages/App/App")
            },
            {
                path: "connections",
                lazy: () => import("./scenes/App-Connections/components/layouts/Connections"),
                children: [
                    {
                        index: true,
                        lazy: () => import("./scenes/App-Connections/components/pages/Connections")
                    },
                    {
                        path: ":connectionId",
                        lazy: () => import("./scenes/App-Connections-Connection/components/layouts/Connection"),
                        children: [
                            {
                                index: true,
                                lazy: () => import("./scenes/App-Connections-Connection/components/pages/Connection")
                            },
                            {
                                path: "indices/:indexId",
                                lazy: () => import("./scenes/App-Connections-Connection/components/pages/ConnectionIndex")
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <ThemeCustomization>
            <AppContextProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </AppContextProvider>
        </ThemeCustomization>
    </React.StrictMode>
);
