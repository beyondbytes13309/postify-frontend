import Comment from "./Comment";
import CreateComment from "./CreateComment";
import styles from "../styles/CommentSection.module.css";
import { useEffect, useState, useRef } from "react";

import { IoMdCloseCircle } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import Modal from "../common/Modal.jsx";

import Loading from "../common/Loading";
import API from "../../../apiRoutes.js";
import { useSafeFetch } from '../../hooks/useSafeFetch'

export default function CommentSection({ postID, toggleCommentSection }) {
  const [comments, setComments] = useState([]);
  const [createCommentVisibility, setCreateCommentVisibility] = useState(false);

  const [modalVisibility, setModalVisibility] = useState(false);
  const modalInfo = useRef({});

  const [commentCreationState, setCommentCreationState] = useState(false);

  const [url, setUrl] = useState('')
  const [options, setOptions] = useState({})
  const { data, error, loading, abort } = useSafeFetch(url, options)

  useEffect(() => {
    setOptions({ method: 'GET', credentials: 'include' })
    setUrl(`${API.COMMENT.getComments}?postID=${postID}`)

  }, []);

  useEffect(() => {
    if (data?.code == '032') {
      setComments(data.data)
    }
  }, [data, error])

  useEffect(() => {
    if (commentCreationState?.code == "031") {
      modalInfo?.current?.modifyModal({
        variant: "alert",
        title: "Success",
        text: commentCreationState.data?.message,
        setButtonClick: null,
      });
      setModalVisibility(true);
      const comment = commentCreationState?.data?.comment;
      setComments((prev) => [comment, ...prev]);
      setCreateCommentVisibility(false);
    } else if (commentCreationState) {
      modalInfo?.current?.modifyModal({
        variant: "alert",
        title: "Error",
        text: commentCreationState.data,
        setButtonClick: null,
      });
      setModalVisibility(true);
    }
  }, [commentCreationState]);

  return (
    <>
      <div className={styles.wrapper}>
        <h2>Comments</h2>

        <button className={styles.closeBtn}>
          <IoMdCloseCircle
            className={styles.closeBtnIcon}
            onClick={toggleCommentSection}
          />
        </button>

        <button
          className={styles.addCommentBtn}
          onClick={() => setCreateCommentVisibility((prev) => !prev)}
        >
          <IoMdAdd className={styles.addCommentIcon} />
        </button>

        <div className={styles.comments}>
          {createCommentVisibility && (
            <CreateComment
              setCreateCommentVisibility={setCreateCommentVisibility}
              postID={postID}
              setCommentCreationState={setCommentCreationState}
            />
          )}
          {comments.length != 0 && comments.map((comment, index) => (
                <Comment
                  key={index}
                  resource={comment}
                  onDelete={(id) => {
                    setComments((prev) =>
                      prev.filter((comment) => comment._id != id),
                    );
                  }}
                />
              ))}
        </div>

        {(comments?.length == 0 && !error && !loading) && <p>No comments yet.</p> }
        {loading && !error && <Loading />}
        {error && <p className={styles.error}>An error occured!</p>}
      </div>

      <Modal
        ref={modalInfo}
        visibility={modalVisibility}
        setVisibility={setModalVisibility}
      />
    </>
  );
}
