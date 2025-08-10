import { useEffect, useRef, useState } from "react";
import styles from "../styles/CreateComment.module.css";

import { FaCommentMedical } from "react-icons/fa6";

import { GiCancel } from "react-icons/gi";
import API from "../../../apiRoutes";
import { useSafeFetch } from '../../hooks/useSafeFetch'

export default function CreateComment({
  setCreateCommentVisibility,
  postID,
  setCommentCreationState,
  commentID,
  initialCommentText="",
  setInitialCommentText,
  option="create"
}) {
  
  const [commentText, setCommentText] = useState(initialCommentText);
  const [url, setUrl] = useState('')
  const [options, setOptions] = useState({})
  const { data, error, loading, abort } = useSafeFetch(url, options)

  const handleMakeComment = async () => {
    if (commentText.length < 5) {
      setCommentCreationState({
        data: "Comment is shorter than minimum allowed length",
      });
      return;
    }
    if (commentText.length > 150) {
      setCommentCreationState({
        data: "Comment is longer than maximum allowed length",
      });
      return;
    }

    if (option == 'create') {
      setOptions({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentText, postID }),
        credentials: "include",
      });
      setUrl(API.COMMENT.makeComment);
    } else if (option == 'edit') {
      setOptions({
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentText }),
        credentials: "include",
      });
      setUrl(`${API.COMMENT.editComment}/${commentID}`);
    }

    
  };

  useEffect(() => {
    if (data) {
      setCommentCreationState(data)
    } 
  }, [data])

  return (
    <>
      <div className={styles.createCommentWrapper}>
        <textarea
          className={styles.commentInput}
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <span
          className={styles.commentTextLength}
        >{`${commentText.length}/150`}</span>

        <div className={styles.commentButtonsWrapper}>
          <button className={styles.addCommentBtn} onClick={handleMakeComment}>
            <FaCommentMedical /> {option=="create" ? 'Create' : 'Edit'}
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => {setCreateCommentVisibility((prev) => !prev); setInitialCommentText("")}}
          >
            <GiCancel /> Cancel
          </button>
        </div>
      </div>
    </>
  );
}
