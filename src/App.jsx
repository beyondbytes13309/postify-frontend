import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom"


import Home from "./pages/Home"
import AuthPage from './pages/AuthPage'
import Profile from "./pages/Profile"

import Header from "./components/common/Header.jsx"

import { useState } from "react"


import UserProvider from "./contexts/UserContext.jsx"
import AuthProvider from "./contexts/AuthContext.jsx"


function App() {


    return (
        <>
            <Header showOptions={{search: true}}/>
            <AuthPage />
        </>
    )

        

        
        
    
  
}

export default App
