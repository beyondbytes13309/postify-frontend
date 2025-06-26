import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"

import UserCard from "../components/user/UserCard"

import { UserContext } from "../contexts/UserContext"


export default function Profile() {
    const { isLoggedIn } = useContext(AuthContext)
    const {
    userID,
    setUserID,
    username,
    setUsername,
    pfpURL,
    setPfpURL
    } = useContext(UserContext);


    useEffect(() => {
        setUsername("Rana emmar")
        setUserID("5984389583458953")
        setPfpURL("https://cdn.postify.com/pfps/5984389583458953")
    }, [])
    

    return (
        <>
            {
                isLoggedIn ?
                (
                    <>
                        <UserCard userID={userID} username={username} pfpURL={pfpURL} />
                    </>
                )
                :
                (
                    <p>Please login</p>
                )
            }
        </>
    )
}