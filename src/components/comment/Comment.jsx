import convertIsoToRelativeTime from '../../utils/isoToTimeAgo'
import styles from '../styles/Comment.module.css'

export default function Comment({ commentText, commentAuthor, profilePicURL, createdAt }) {
    console.log(commentText, commentAuthor, profilePicURL)
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.profile}>
                    <img src={profilePicURL} className={styles.pfp} />
                    <h2 className={styles.authorName}>{commentAuthor}</h2>

                    <span className={styles.timeAgo}>{convertIsoToRelativeTime(createdAt)}</span>
                </div>
                <div className={styles.body}>
                    <p className={styles.commentText}>{commentText}</p>
                </div>
            </div>
        </>
    )
}