import { useEffect, useState } from 'react'
import styles from '../styles/PostCard.module.css'

import { CiMenuKebab } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineAddReaction } from "react-icons/md";


import convertIsoToRelativeTime from '../../utils/isoToTimeAgo';




export default function PostCard({ postID, authorName, authorPfpURL, postText, postCommentsNum, postReactionsNum, setShowReactionPicker, setShowCommentSection, userReactionFromPostObj, userReactionIDFromPostObj, setUserReaction, setUserReactionID, createdAt }) {
    
    

    
    
    const [commentCount, setCommentCount] = useState(null)
    const [reactionCount, setReactionCount] = useState(null)

    useEffect(() => {
        setCommentCount(postCommentsNum)
        setReactionCount(postReactionsNum)
    }, [])

    
    

    

    

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.authorWrapper}>
                    <div className={styles.authorWrapperChild}>
                        <img src={authorPfpURL} alt="Pfp" className={styles.pfp} />
                        <p className={styles.authorName}>{authorName}</p>
                    </div>

                    <span className={styles.timeAgo}>{convertIsoToRelativeTime(createdAt)}</span>
                    
                    <button className={styles.postMenuBtn} title="Options">
                        {<CiMenuKebab className={styles.postMenuIcon}/>}
                    </button>
                </div>
                <div className={styles.contentWrapper}>
                    <p>{postText}</p>
                </div>

                <div className={styles.buttonWrapper}>
                    <div className={styles.reactBtnWrapper} title="Reactions">
                        <button className={styles.reactBtn} onClick={() => {setShowReactionPicker(postID); setUserReaction(userReactionFromPostObj); setUserReactionID(userReactionIDFromPostObj)}}>
                            <MdOutlineAddReaction className={styles.reactBtnIcon}/>
                        </button>
                        <span className={styles.reactCount}>{reactionCount}</span>
                    </div>
                    
                    <div className={styles.commentBtnWrapper} title="Comments">
                        <button className={styles.commentBtn} onClick={() => setShowCommentSection(postID)}>
                            <FaRegCommentDots className={styles.commentBtnIcon}/> 
                        </button>
                        <span className={styles.commentCount}>{commentCount}</span>
                    </div>
                    
                    
                </div>

                
                
                

            </div>
        </>
    )
}