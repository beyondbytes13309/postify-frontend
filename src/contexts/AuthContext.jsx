import { createContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [user, setUser] = useState(null)
    const location = useLocation()

    
    const fetchUserData = async () => {
        const response = await fetch("http://localhost:3000/", { credentials: "include" })
        
        if (response.ok) {
            const parsed = await response.json()
            if (parsed.code == "055") {
                setUser(parsed.user);
                setIsLoggedIn(true);
            } else if (parsed.code == "006") {
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        fetchUserData()
    }, [location.pathname])



    return (
        <>
            <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user: user?.user || user, setUser }}>
                { children }
            </AuthContext.Provider>
        </>
    )
}

export default AuthProvider

