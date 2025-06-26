import { createContext, useState } from "react"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    return (
        <>
            <AuthContext.Provider value={{ isLoggedIn }}>
                { children }
            </AuthContext.Provider>
        </>
    )
}

export default AuthProvider

