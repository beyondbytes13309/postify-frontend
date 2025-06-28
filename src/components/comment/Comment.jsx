import styles from '../styles/Comment.module.css'

export default function Comment({ commentText, commentAuthor, commentEmail }) {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.profile}>
                    <img src="https://media.istockphoto.com/id/2196087139/photo/dog-gives-paw-to-a-woman-making-high-five-gesture.jpg?s=1024x1024&w=is&k=20&c=RRDO-noTcVRUi8VCzFrc2KDpIVBY2RzucOO6saTZmlE=" className={styles.pfp} />
                    <h2 className={styles.authorName}>{commentAuthor}</h2>
                </div>
                <div className={styles.body}>
                    <p className={styles.commentText}>{commentText}</p>
                </div>
            </div>
        </>
    )
}