import { useRef, useState } from 'react'
import styles from '../styles/CreateComment.module.css'


import { FaCommentMedical } from "react-icons/fa6";

import { GiCancel } from "react-icons/gi";
import API from '../../../apiRoutes';


export default function CreateComment({ setCreateCommentVisibility, postID, setCommentCreationState }) {
    

    const [commentText, setCommentText] = useState("")

    const handleMakeComment = async () => {
        if (commentText.length < 5) {
            setCommentCreationState({ data: 'Comment is shorter than minimum allowed length' })
            return
        }
        if (commentText.length > 150) {
            setCommentCreationState({ data: 'Comment is longer than maximum allowed length' })
            return
        }

        const response = await fetch(API.COMMENT.makeComment, {
            method: 'POST',
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({ commentText, postID }),
            credentials: 'include'
        })

        if (response.status >= 200 && response.status < 500) {
            const parsed = await response.json()
            
            setCommentCreationState(parsed)
        } 
    }

    return (
        <>
            <div className={styles.createCommentWrapper}>
                <textarea className={styles.commentInput} type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)}/>
                <span className={styles.commentTextLength}>{`${commentText.length}/150`}</span>
                

                <div className={styles.commentButtonsWrapper}>
                    <button className={styles.addCommentBtn} onClick={handleMakeComment}><FaCommentMedical /> Comment</button>
                    <button className={styles.cancelBtn} onClick={() => setCreateCommentVisibility(prev => !prev)} ><GiCancel /> Cancel</button>
                </div>
                
                
            </div>

            


        </>
    )
}