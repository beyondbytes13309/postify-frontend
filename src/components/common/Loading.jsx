import styles from '../styles/Loading.module.css'

export default function Loading() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}></div>
        </div>
    )
}