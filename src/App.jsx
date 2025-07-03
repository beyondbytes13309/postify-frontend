import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom"


import Home from "./pages/Home"
import AuthPage from './pages/AuthPage'
import Profile from "./pages/Profile"
import Create from './pages/Create'

import RootLayout from './pages/RootLayout.jsx'

import { useContext, useEffect, useState } from "react"

import AuthProvider from "./contexts/AuthContext.jsx"


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "auth",
                element: <AuthPage />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "create",
                element: <Create />
            }
        ]
    }
])

function App() {



    return (
        <>
            
            <AuthProvider>

                <RouterProvider router={router} />

            </AuthProvider>
            
            
        </>
    )

        

        
        
    
  
}

export default App
