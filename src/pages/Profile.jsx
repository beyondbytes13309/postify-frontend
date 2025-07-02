import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"

import UserCard from "../components/user/UserCard"

import { UserContext } from "../contexts/UserContext"


export default function Profile() {
    const { isLoggedIn } = useContext(AuthContext)
    const {
    user
    } = useContext(UserContext);

    return (
        <>
            {
                isLoggedIn ?
                (
                    <>
                        <UserCard userID={user._id} username={user.username} pfpURL={user.profilePicURL} />
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