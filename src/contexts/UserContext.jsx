import { createContext, useState } from "react";

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [userID, setUserID] = useState(null)
    const [username, setUsername] = useState(null)
    const [pfpURL, setPfpURL] = useState(null)
    


    const value = {
        userID, 
        setUserID,
        username,
        setUsername,
        pfpURL,
        setPfpURL
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider