import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import ChattingPage from "../pages/chatting-page/ChattingPage.tsx";
import AuthPage from "../pages/auth-page/AuthPage.tsx";
import React from "react";
import useAuth from "../features/auth/useAuth.ts";

function App() {
    const user = useAuth((state) => state.user);

    const ProtectedRoute = ({isAuthenticated, element}: { isAuthenticated: boolean; element: React.JSX.Element }) => {
        return isAuthenticated ? element : <Navigate to="/" replace/>;
    };

    const RedirectIfAuthenticated = ({isAuthenticated, element}: {
        isAuthenticated: boolean;
        element: React.JSX.Element
    }) => {
        return isAuthenticated ? <Navigate to="/chatting" replace/> : element;
    };

    return (
        <Routes>
            <Route path="/" element={<RedirectIfAuthenticated isAuthenticated={!!user} element={<AuthPage/>}/>}/>
            <Route path="/chatting" element={<ProtectedRoute isAuthenticated={!!user} element={<ChattingPage/>}/>}/>
        </Routes>
    )
}

export default App
