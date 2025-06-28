import { useEffect, useState } from 'react'
import styles from '../styles/PostCard.module.css'

import { CiMenuKebab } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineAddReaction } from "react-icons/md";



import { motion, AnimatePresence } from 'motion/react';

import CommentSection from '../comment/CommentSection'


export default function PostCard({ postID, authorName, authorPfpURL, postText, postCommentsNum, postReactionsNum, setShowReactionPicker }) {
    const commentSectionVariants = {
        initial: {opacity: 0},
        animate: {opacity: 1},
        exit: {opacity: 0}
    }

    const [showCommentSection, setShowCommentSection] = useState(false)
    
    const [commentCount, setCommentCount] = useState(null)
    const [reactionCount, setReactionCount] = useState(null)

    useEffect(() => {
        setCommentCount(postCommentsNum)
        setReactionCount(postReactionsNum)
    })

    const toggleCommentSection = () => {
        setShowCommentSection(!showCommentSection)
    }

    

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.authorWrapper}>
                    <div className={styles.authorWrapperChild}>
                        <img src={authorPfpURL} alt="Pfp" className={styles.pfp} />
                        <p className={styles.authorName}>{authorName}</p>
                    </div>
                    
                    <button className={styles.postMenuBtn}>
                        {<CiMenuKebab className={styles.postMenuIcon}/>}
                    </button>
                </div>
                <div className={styles.contentWrapper}>
                    <p>{postText}</p>
                </div>

                <div className={styles.buttonWrapper}>
                    <div className={styles.reactBtnWrapper}>
                        <button className={styles.reactBtn} onClick={() => setShowReactionPicker(prev => !prev)}>
                            <MdOutlineAddReaction className={styles.reactBtnIcon}/>
                        </button>
                        <span className={styles.reactCount}>{reactionCount}</span>
                    </div>
                    
                    <div className={styles.commentBtnWrapper}>
                        <button className={styles.commentBtn} onClick={toggleCommentSection}>
                            <FaRegCommentDots className={styles.commentBtnIcon}/> 
                        </button>
                        <span className={styles.commentCount}>{commentCount}</span>
                    </div>
                    
                    
                </div>

                <AnimatePresence mode="wait">
                    {showCommentSection&& <motion.div
                    method={showCommentSection.toString()}
                    variants={commentSectionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{duration: 0.2, ease: "easeInOut"}}>
                        {<CommentSection 
                        postID={postID} 
                        toggleCommentSection={toggleCommentSection}/>}
                    </motion.div>}
                    
                    
                </AnimatePresence>
                
                

            </div>
        </>
    )
}