import { useEffect, useState } from 'react'
import styles from '../styles/PostCard.module.css'

import { CiMenuKebab } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineAddReaction } from "react-icons/md";


import convertIsoToRelativeTime from '../../utils/isoToTimeAgo';




export default function PostCard({ resource, setShowReactionPicker, setShowCommentSection, updateCurrentReactionForPost }) {
    
    const postID = resource?._id
    const [commentCount, setCommentCount] = useState(null)
    const [reactionCount, setReactionCount] = useState(null)

    useEffect(() => {
        setCommentCount(resource?.numOfComments || 0)
        setReactionCount(resource?.reactions?.length || 0)
    }, [])


    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.authorWrapper}>
                    <div className={styles.authorWrapperChild}>
                        <img src={resource?.authorID?.profilePicURL || 'https://res.cloudinary.com/drwa5qpv4/image/upload/v1751643968/2_km1lrr.png'} alt="Pfp" className={styles.pfp} />
                        <p className={styles.authorName}>{resource?.authorID?.displayName || 'Deleted User'}</p>
                    </div>

                    <span className={styles.timeAgo}>{convertIsoToRelativeTime(resource?.createdAt)}</span>
                    
                    <button className={styles.postMenuBtn} title="Options">
                        {<CiMenuKebab className={styles.postMenuIcon}/>}
                    </button>
                </div>
                <div className={styles.contentWrapper}>
                    <p>{resource?.postText}</p>
                </div>

                <div className={styles.buttonWrapper}>
                    <div className={styles.reactBtnWrapper} title="Reactions">
                        <button className={styles.reactBtn} onClick={() => {setShowReactionPicker(postID); updateCurrentReactionForPost()}}>
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