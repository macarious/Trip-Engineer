import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";
import AppLayout from "./components/AppLayout";
import AuthDebugger from "./components/AuthDebugger";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import TravelPlanDetail from "./components/TravelPlanDetail";
import Profile from "./components/Profile";
import SavedPlans from "./components/SavedPlans";
import PlanGenerator from "./components/PlanGenerator";
import VerifyUser from "./components/VerifyUser";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
const requestedScopes = [
    "profile",
    "email",
    "read:plan",
    "edit:plan",
    "delete:plan",
    "write:plan",
    "read:user",
    "edit:user",
    "delete:user",
    "write:user",
];
  
function RequireAuth({ children }) {
    const { isAuthenticated, isLoading } = useAuth0();
  
    if (!isLoading && !isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
}

root.render(
    <React.StrictMode>
        <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
            redirect_uri: `${window.location.origin}/verify-user`,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: requestedScopes.join(" "),
        }}
        >
            <AuthTokenProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/verify-user" element={<VerifyUser />} />
                        <Route path="/login" element={<AppLayout />}>
                            <Route index element={<Login />} />
                        </Route>
                        <Route path="/" element={<RequireAuth><AppLayout /></RequireAuth>}>
                            <Route index element={<Home />} />
                            <Route path="*" element={<NotFound />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="plan" element={<SavedPlans />} />
                            <Route path="plan/:planId" element={<TravelPlanDetail />} />
                            <Route path="generator" element={<PlanGenerator />} />
                            <Route path="debugger" element={<AuthDebugger />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthTokenProvider>
        </Auth0Provider>
    </React.StrictMode>
);