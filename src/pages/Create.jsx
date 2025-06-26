import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect, useContext } from "react";

export default function Create() {
    const { isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) navigate('/auth')
    }, [isLoggedIn])
    return (
        <>
            create a new post motha foka
        </>
    )
}