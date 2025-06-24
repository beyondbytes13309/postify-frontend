import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom"


import Home from "./pages/Home"
import Auth from './pages/Auth'
import Profile from "./pages/Profile"
import { useState } from "react"


import UserProvider from "./contexts/UserContext.jsx"
import AuthProvider from "./contexts/AuthContext.jsx"


const router = createBrowserRouter([
    
    {
        path: '/',
        element: <>
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/auth">Auth</Link>
                <Link to="/profile">Profile</Link>
            </nav>
            <Outlet></Outlet>
            
        </>,
        children: [
            {path: "/home", element:<Home />},
            {path: "/auth", element: <Auth />},
            {path: "/profile", element:  <AuthProvider><UserProvider> <Profile /></UserProvider></AuthProvider> }
        ]
    }
])


function App() {


return <RouterProvider router={router} />

        

        
        
    
  
}

export default App
