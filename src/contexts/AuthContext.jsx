import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3000/", {credentials: 'include'})
        .then(res => res.ok ? res.json() : null)
        .then(data => {
            if (data) {
                setUser(data)
                setIsLoggedIn(true)
            }
            
        })
    }, [])

    return (
        <>
            <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
                { children }
            </AuthContext.Provider>
        </>
    )
}

export default AuthProvider

