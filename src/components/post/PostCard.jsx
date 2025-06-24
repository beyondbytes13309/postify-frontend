import { useEffect } from 'react'
import styles from '../styles/PostCard.module.css'

import { CiMenuKebab } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineAddReaction } from "react-icons/md";



export default function PostCard({ postID, authorName, authorPfpURL, postText }) {
    

    useEffect(() => {

    }, [])
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
                        <button className={styles.reactBtn}>
                            <MdOutlineAddReaction className={styles.reactBtnIcon}/>
                        </button>
                        <span>0</span>
                    </div>
                    
                    <div className={styles.commentBtnWrapper}>
                        <button className={styles.commentBtn}>
                            <FaRegCommentDots className={styles.commentBtnIcon}/> 
                        </button>
                        <span>0</span>
                    </div>
                    
                    
                </div>
            </div>
        </>
    )
}