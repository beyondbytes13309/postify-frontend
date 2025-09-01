import { useEffect, useRef, useState } from "react";
import convertIsoToRelativeTime from "../../utils/isoToTimeAgo";
import styles from "../styles/Comment.module.css";
import { CiMenuKebab } from "react-icons/ci";
import Options from "../common/Options";
import { useCan } from "../../hooks/useCan";
import API from "../../../apiRoutes";
import { useSafeFetch } from '../../hooks/useSafeFetch'
import { MdOutlineAddReaction } from "react-icons/md";
import { reactionSummarizer } from "../../utils/reactionSummarizer";
import ReactionShower from "../reaction/ReactionShower";


export default function Comment({ resource, onDelete, setCreateCommentVisibility, setCommentState, modalUpdater, setModalVisibility, setShowReactionPicker, updateCurrentReactionForComment }) {
  const can = useCan();
  const [showOptions, setShowOptions] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const commentID = resource?._id;
  const [modalBtnClick, setModalBtnClick] = useState(-1);
  const [showReactionEmoji, setShowReactionEmoji] = useState(0)

  const [url, setUrl] = useState('')
  const [options, setOptions] = useState({})
  const { data, error, loading, abort } = useSafeFetch(url, options)

  const allowedToDelete = can(
    ["delete_own_comment", "delete_any_comment"],
    resource
  );

  const allowedToEdit = can(
    ['edit_own_comment', 'delete_any_comment'],
    resource
  )

  const handleDelete = async () => {
    modalUpdater?.({
      variant: "warning",
      title: "Danger",
      text: "Are you sure you want to delete this comment?",
      setButtonClick: setModalBtnClick,
    })
    setModalVisibility(true)
    return

    
  };

  useEffect(() => {
    setShowReactionEmoji(reactionSummarizer(resource?.reactions))
  }, [resource])

  useEffect(() => {
    if (modalBtnClick == 0) {
        setOptions({
        method: "DELETE",
        credentials: "include",
      })
      setUrl(`${API.COMMENT.deleteComment}/${commentID}`)
      setModalBtnClick(-1);
    }
  }, [modalBtnClick]);

  useEffect(() => {
    if (data?.code == '033') {
      onDelete(commentID)
    }
  }, [data])

  const optionsArray = []
  if (allowedToDelete) {
    optionsArray.push({
      text: "Delete",
      callback: handleDelete,
    })
  }

  if (allowedToEdit) {
    optionsArray.push({
      text: "Edit",
      callback: (() => {setCreateCommentVisibility(true); ; setCommentState(resource?._id, 'edit', resource?.commentText)})
    })
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.profile}>
          <img
            src={
              resource?.authorID?.profilePicURL ||
              "https://res.cloudinary.com/drwa5qpv4/image/upload/v1751643968/2_km1lrr.png"
            }
            className={styles.pfp}
          />
          <h2 className={styles.authorName}>
            {resource?.authorID?.displayName || "Deleted User"}
          </h2> ·

            <span className={styles.timeAgo}>
              {convertIsoToRelativeTime(resource?.createdAt)} 
              {resource?.isEdited && ' · Edited'}
            </span>

          <button
            onClick={(e) => {
              setPosition({ x: e.clientX, y: e.clientY });
              setShowOptions((prev) => !prev);
            }}
            className={styles.commentMenuBtn}
          >
            <CiMenuKebab className={styles.commentMenuIcon} />
          </button>
          {showOptions && (
            <Options
              options={optionsArray}
              position={position}
              setShowOptions={setShowOptions}
            />
          )}
        </div>
        <div className={styles.body}>
          <p className={styles.commentText}>{resource?.commentText}</p>
        </div>
        {/* <button onClick={() => {setShowReactionPicker(resource?._id); updateCurrentReactionForComment();}}><MdOutlineAddReaction /></button> */}

        <div className={styles.reactBtnWrapper} title="Reactions">
          <button
            className={styles.reactBtn}
            onClick={() => {
              setShowReactionPicker(resource?._id);
              updateCurrentReactionForPost();
            }}>{ showReactionEmoji.length!= 0 ?
              <div className={styles.reactBtnIcon}>
                <ReactionShower reactions={showReactionEmoji}/>
              </div>
              
              : <MdOutlineAddReaction className={styles.reactBtnIcon} />
            }
          </button>
          <span className={styles.reactCount}>{resource?.reactions?.length || 0}</span>
        </div>
      </div>
    </>
  );
}
