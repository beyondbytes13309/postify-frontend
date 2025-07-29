import { useEffect, useRef, useState } from 'react';
import convertIsoToRelativeTime from '../../utils/isoToTimeAgo'
import styles from '../styles/Comment.module.css'
import { CiMenuKebab } from "react-icons/ci";
import Options from '../common/Options';
import useCan from '../../utils/permissions'
import API from '../../../apiRoutes';

export default function Comment({ resource, onDelete }) {
    const can = useCan()
    const [showOptions, setShowOptions] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const commentID = resource?._id

    const allowedToDelete = can(['delete_own_comment', 'delete_any_comment'], resource);
    
    const handleDelete = async () => {
      const response = await fetch(`${API.COMMENT.deleteComment}/${commentID}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (response.status >= 200 && response.status < 500) {
        const parsed = await response.json()
        if (parsed.code == '033') {
          onDelete(commentID)
        }
      }
    }

    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.profile}>
            <img src={resource?.authorID?.profilePicURL || 'https://res.cloudinary.com/drwa5qpv4/image/upload/v1751643968/2_km1lrr.png'} className={styles.pfp} />
            <h2 className={styles.authorName}>{resource?.authorID?.displayName || 'Deleted User'}</h2>

            <span className={styles.timeAgo}>
              {convertIsoToRelativeTime(resource?.createdAt)}
            </span>
            <button
              onClick={(e) => {setPosition({x: e.clientX, y: e.clientY}); setShowOptions((prev) => !prev)}}
              className={styles.commentMenuBtn}
            >
              <CiMenuKebab className={styles.commentMenuIcon} />
            </button>
            {showOptions && (
              <Options
                options={[
                  { text: allowedToDelete ? 'Delete' : 'Chill', callback: allowedToDelete && handleDelete },
                ]}
                position={position}
                setShowOptions={setShowOptions}
              />
            )}
          </div>
          <div className={styles.body}>
            <p className={styles.commentText}>{resource?.commentText}</p>
          </div>
        </div>
        
      </>
    );
}