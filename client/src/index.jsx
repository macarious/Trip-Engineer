import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { UserProvider } from "./UserContext";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(
    <React.StrictMode>
        <UserProvider>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            </BrowserRouter>
        </UserProvider>
    </React.StrictMode>
);