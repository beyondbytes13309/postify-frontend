import Comment from "./Comment";
import CreateComment from "./CreateComment";
import styles from "../styles/CommentSection.module.css";
import { useEffect, useState, useRef } from "react";

import { IoMdCloseCircle } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

import Loading from "../common/Loading";
import API from "../../../apiRoutes.js";
import { useSafeFetch } from '../../hooks/useSafeFetch'

export default function CommentSection({ postID, toggleCommentSection, modalUpdater, setModalVisibility }) {
  const [comments, setComments] = useState([]);
  const [createCommentVisibility, setCreateCommentVisibility] = useState(false);
  const [commentOption, setCommentOption] = useState("create")
  const [currentCommentID, setCurrentCommentID] = useState(null)

  const [initialCommentText, setInitialCommentText] = useState("")

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
      modalUpdater({
        variant: "alert",
        title: "Success",
        text: commentCreationState.data?.message,
        setButtonClick: null,
      });
      setModalVisibility(true);
      const comment = commentCreationState?.data?.comment;
      setComments((prev) => [comment, ...prev]);
      setCreateCommentVisibility(false);
    } else if (commentCreationState?.code == "035") {
      modalUpdater({
        variant: "alert",
        title: "Success",
        text: commentCreationState.data?.message,
        setButtonClick: null,
      });
      setModalVisibility(true);
      const comment = commentCreationState?.data?.comment;
      setComments((prev) => {
        const filtered = prev.filter(c => c._id != currentCommentID)
        return [comment, ...filtered]
      })
      setCurrentCommentID(null)
      setCreateCommentVisibility(false);
    } else if (commentCreationState) {
      modalUpdater({
        variant: "alert",
        title: "Error",
        text: commentCreationState.data,
        setButtonClick: null,
      });
      setModalVisibility(true);
    } 
  }, [commentCreationState]);

  const handleSetCommentState = (id, option, text) => {
    setCurrentCommentID(id);
    setCommentOption(option);
    setInitialCommentText(text);
  };

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
          onClick={() => {setCreateCommentVisibility((prev) => !prev); setCommentOption("create")}}
        >
          <IoMdAdd className={styles.addCommentIcon} />
        </button>

        <div className={styles.comments}>
          {createCommentVisibility && (
            <CreateComment
              setCreateCommentVisibility={setCreateCommentVisibility}
              postID={postID}
              setCommentCreationState={setCommentCreationState}
              commentID={currentCommentID}
              initialCommentText={initialCommentText}
              setInitialCommentText={setInitialCommentText}
              option={commentOption}
            />
          )}
          {comments.length != 0 && comments.map((comment) => (
                <Comment
                  key={comment?._id}
                  resource={comment}
                  onDelete={(id) => {
                    setComments((prev) =>
                      prev.filter((comment) => comment._id != id),
                    );
                  }}
                  setCreateCommentVisibility={setCreateCommentVisibility}
                  setCommentState={handleSetCommentState}
                  modalUpdater={modalUpdater}
                  setModalVisibility={setModalVisibility}
                />
              ))}
        </div>

        {(comments?.length == 0 && !error && !loading) && <p className={styles.error}>No comments yet.</p> }
        {loading && !error && <Loading />}
        {error && <p className={styles.error}>An error occured!</p>}
      </div>

    </>
  );
}
