import styles from '../styles/UserCard.module.css'
import { FaEdit } from "react-icons/fa";


export default function UserCard({ user: {_id, username, email, bio, profilePicURL }}) {
    /* 
    This will greet the user
    show their pfp, their userID
    */


    return (
        <>
 
            <div className={styles.info}>
                <img className={styles.profilePicURL} src={profilePicURL} alt="Pfp"/>
            </div>

            <div className={styles.input}>
                <button><FaEdit /></button>
            </div>
            

            
        </>
    )
}