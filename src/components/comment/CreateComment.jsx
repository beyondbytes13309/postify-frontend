import { useState } from 'react'
import styles from '../styles/CreateComment.module.css'


import { FaCommentMedical } from "react-icons/fa6";

import { GiCancel } from "react-icons/gi";



export default function CreateComment({ setCreateCommentVisibility }) {
    const [commentText, setCommentText] = useState("")
    return (
        <>
            <div className={styles.createCommentWrapper}>
                <textarea className={styles.commentInput} type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)}/>
                

                <div className={styles.commentButtonsWrapper}>
                    <button className={styles.addCommentBtn} ><FaCommentMedical /> Comment</button>
                    <button className={styles.cancelBtn} onClick={() => setCreateCommentVisibility(prev => !prev)} ><GiCancel /> Cancel</button>
                </div>
                
                
            </div>
        </>
    )
}