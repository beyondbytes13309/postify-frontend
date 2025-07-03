import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"

import UserCard from "../components/user/UserCard"

import { useNavigate } from "react-router-dom"



export default function Profile() {
    const navigate = useNavigate()

    const { isLoggedIn, user } = useContext(AuthContext)
    

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('auth')
        }
    }, [isLoggedIn])

    return (
        <>
            {
                isLoggedIn &&
                (
                    <>
                        {/*<UserCard userID={} username={user.username} pfpURL={user.profilePicURL} />*/ null}

                        {user ? (
                            <UserCard user={user.user}/>
                        ) : null}
                        
                    </>
                )
               
            }
        </>
    )
}