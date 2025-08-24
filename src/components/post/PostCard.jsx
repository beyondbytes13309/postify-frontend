import { useEffect, useState } from "react";
import styles from "../styles/PostCard.module.css";
import { useSafeFetch } from "../../hooks/useSafeFetch";

import React from "react";

import { CiMenuKebab } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineAddReaction } from "react-icons/md";

import Options from "../common/Options";
import ReactionShower from "../reaction/ReactionShower";
import convertIsoToRelativeTime from "../../utils/isoToTimeAgo";

import { useCan } from "../../hooks/useCan";
import { reactionSummarizer } from "../../utils/reactionSummarizer";

import API from "../../../apiRoutes";
import { useNavigate } from "react-router-dom";


export default React.memo(function PostCard({
  resource,
  setShowReactionPicker,
  setShowCommentSection,
  updateCurrentReactionForPost,
  onDelete,
  modalUpdater,
  setModalVisibility,
  setSelectedPost,
  setEditingPost
}) {
  const can = useCan();
  const navigate = useNavigate()
  const [showOptions, setShowOptions] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const postID = resource?._id;
  const [commentCount, setCommentCount] = useState(null);
  const [reactionCount, setReactionCount] = useState(null);

  const [showReactionEmoji, setShowReactionEmoji] = useState(0);
  const [modalBtnClick, setModalBtnClick] = useState(-1);

  const [url, setUrl] = useState('')
  const [options, setOptions] = useState({})
  const { data, error, loading, abort } = useSafeFetch(url, options)

  const allowedToDelete = can(["delete_own_post", "delete_any_post"], resource);
  const allowedToEdit = can(["edit_own_post", "edit_any_post"], resource)

  const handleDelete = async () => {
    modalUpdater?.({
      variant: "warning",
      title: "Danger",
      text: "Are you sure you want to delete this post?",
      setButtonClick: setModalBtnClick,
    })
    setModalVisibility(true)
  };

  
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
      callback: (() => {setEditingPost(true); setSelectedPost(resource)})
    })
  }


  useEffect(() => {
    setCommentCount(resource?.numOfComments || 0);
    setReactionCount(resource?.reactions?.length || 0);
    setShowReactionEmoji(reactionSummarizer(resource?.reactions));
  }, [resource]);

  useEffect(() => {
    if (modalBtnClick == 0) {
        setOptions({
        method: "DELETE",
        credentials: "include",
      })
      setUrl(`${API.POST.deletePost}/${postID}`)
      setModalBtnClick(-1);
    }
  }, [modalBtnClick]);

  useEffect(() => {
    if (data?.code == '012') {
      onDelete(postID)
    }
  }, [data])

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.authorWrapper}>
          <div className={styles.authorWrapperChild}  onClick={() => navigate(`/profile?userID=${resource?.authorID?._id}`)}>
            <img
              src={
                resource?.authorID?.profilePicURL ||
                "https://res.cloudinary.com/drwa5qpv4/image/upload/v1751643968/2_km1lrr.png"
              }
              alt="Pfp"
              className={styles.pfp}
            />
            <p className={styles.authorName}>
              {resource?.authorID?.displayName || "Deleted User"}
            </p> ·

            <span className={styles.timeAgoAndIsEdited}>
              {convertIsoToRelativeTime(resource?.createdAt)} 
              {resource?.isEdited && ' · Edited'}
            </span>
          </div>

          <button
            className={styles.postMenuBtn}
            title="Options"
            onClick={(e) => {
              setPosition({ x: e.clientX, y: e.clientY });
              setShowOptions((prev) => !prev);
            }}
          >
            {<CiMenuKebab className={styles.postMenuIcon} />}
          </button>
          {showOptions && (
            <Options
              options={optionsArray}
              position={position}
              setShowOptions={setShowOptions}
            />
          )}
        </div>
        <div className={styles.contentWrapper}>
          <p>{resource?.postText}</p>
        </div>

        <div className={styles.buttonWrapper}>
          <div className={styles.reactBtnWrapper} title="Reactions">
            <button
              className={styles.reactBtn}
              onClick={() => {
                setShowReactionPicker(postID);
                updateCurrentReactionForPost();
              }}>{ showReactionEmoji.length!= 0 ?
                <div className={styles.reactBtnIcon}>
                  <ReactionShower reactions={showReactionEmoji}/>
                </div>
                
                : <MdOutlineAddReaction className={styles.reactBtnIcon} />
              }
            </button>
            <span className={styles.reactCount}>{reactionCount}</span>
          </div>

          <div className={styles.commentBtnWrapper} title="Comments">
            <button
              className={styles.commentBtn}
              onClick={() => setShowCommentSection(postID)}
            >
              <FaRegCommentDots className={styles.commentBtnIcon} />
            </button>
            <span className={styles.commentCount}>{commentCount}</span>
          </div>
        </div>
      </div>

      
    </>
  );
});
