import styles from '../styles/ReactionShower.module.css'

export default function ReactionShower({ reactions }) {
    return (
            
        <div className={styles.reactionShowerWrapper}>
            <div className={styles.innerWrapper}>
                {reactions[0] && <div className={styles.firstEmoji}>{reactions[0]}</div>}
                {reactions[1] && <div className={styles.secondEmoji}>{reactions[1]}</div>}
                {reactions[2] && <div className={styles.thirdEmoji}>{reactions[2]}</div>}
            </div>
        </div>
        
    )
}