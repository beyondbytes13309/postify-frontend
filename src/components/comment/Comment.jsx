import { useRef, useState } from 'react';
import convertIsoToRelativeTime from '../../utils/isoToTimeAgo'
import styles from '../styles/Comment.module.css'
import { CiMenuKebab } from "react-icons/ci";
import Options from '../common/Options';

export default function Comment({ commentText, commentAuthor, profilePicURL, createdAt }) {
    const [showOptions, setShowOptions] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [selected, setSelected] = useState(null)

    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.profile}>
            <img src={profilePicURL} className={styles.pfp} />
            <h2 className={styles.authorName}>{commentAuthor}</h2>

            <span className={styles.timeAgo}>
              {convertIsoToRelativeTime(createdAt)}
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
                  { text: "have fun" },
                  { text: "eat food" },
                  { text: "ctrl+shift+del" },
                ]}
                position={position}
                setSelected={setSelected}
                setShowOptions={setShowOptions}
              />
            )}
          </div>
          <div className={styles.body}>
            <p className={styles.commentText}>{commentText}</p>
          </div>
        </div>
      </>
    );
}