import { useContext, useEffect, useState } from "react"
import Feed from "../components/post/Feed"
import { AuthContext } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"



export default function Home() {

    const navigate = useNavigate()
    const { isLoggedIn } = useContext(AuthContext)

    useEffect(() => {
        if (isLoggedIn == false) {
            navigate('/auth')
        }
    }, [isLoggedIn])

    

    return (
        <>
            {isLoggedIn && <Feed />}


        </>
    )
}
