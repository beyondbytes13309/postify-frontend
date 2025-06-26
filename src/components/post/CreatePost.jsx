import styles from '../styles/CreatePost.module.css';
import Button from '../common/Button'
import { useState } from 'react';

export default function CreatePost() {
    const [postText, setPostText] = useState("")

    const handlePost = () => {
        // functionality added in future
    }

    return (
        <>
            <div className={styles.wrapper}>
                <textarea placeholder='Enter post text...' className={styles.postTextInput} onChange={(e) => setPostText(e.target.value)} value={postText}></textarea>
                <div className={styles.options}>
                    <Button className={styles.postBtn} variant="post" onClick={handlePost}>Post</Button>
                </div>
                
            </div>
        </>
    )
}