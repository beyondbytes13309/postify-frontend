import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect, useContext } from "react";

import styles from './styles/Create.module.css'

import CreatePost from '../components/post/CreatePost'

export default function Create() {
    const { isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) navigate('/auth')
    }, [isLoggedIn])
    return (
        <>
            <div className={styles.wrapper}>
                <CreatePost />
            </div>
            
        </>
    )
}