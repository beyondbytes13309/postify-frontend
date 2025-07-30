import { useEffect, useState } from 'react'
import styles from '../styles/PostCard.module.css'

import React from 'react'

import { CiMenuKebab } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineAddReaction } from "react-icons/md";

import Options from '../common/Options';
import convertIsoToRelativeTime from '../../utils/isoToTimeAgo';

import useCan from '../../utils/permissions'

import API from '../../../apiRoutes';

export default React.memo(function PostCard({ resource, setShowReactionPicker, setShowCommentSection, updateCurrentReactionForPost, onDelete }) {
    const can = useCan()
    const [showOptions, setShowOptions] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const postID = resource?._id
    const [commentCount, setCommentCount] = useState(null)
    const [reactionCount, setReactionCount] = useState(null)

    const allowedToDelete = can(['delete_own_post', 'delete_any_post'], resource)

    const handleDelete = async () => {
      const response = await fetch(`${API.POST.deletePost}/${postID}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (response.status >= 200 && response.status < 500) {
        const parsed = await response.json()
        if (parsed.code == '012') {
          onDelete(postID)
        }
      }
    }

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
                    
                    <button className={styles.postMenuBtn} title="Options" onClick={(e) => {setPosition({x: e.clientX, y: e.clientY}); setShowOptions((prev) => !prev)}}>
                        {<CiMenuKebab className={styles.postMenuIcon}/>}
                    </button>
                    {showOptions && 
                    <Options 
                    options={[
                        { text: allowedToDelete ? 'Delete' : 'Chill', callback: allowedToDelete && handleDelete }
                    ]}
                    position={position}
                    setShowOptions={setShowOptions}/>
                    }
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
})