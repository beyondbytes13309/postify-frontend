import convertIsoToRelativeTime from '../../utils/isoToTimeAgo'
import styles from '../styles/Comment.module.css'
import { CiMenuKebab } from "react-icons/ci";

export default function Comment({ commentText, commentAuthor, profilePicURL, createdAt }) {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.profile}>
                    <img src={profilePicURL} className={styles.pfp} />
                    <h2 className={styles.authorName}>{commentAuthor}</h2>

                    <span className={styles.timeAgo}>{convertIsoToRelativeTime(createdAt)}</span>
                    <button className={styles.commentMenuBtn}><CiMenuKebab className={styles.commentMenuIcon}/></button>
                </div>
                <div className={styles.body}>
                    <p className={styles.commentText}>{commentText}</p>
                </div>

            </div>
        </>
    )
}