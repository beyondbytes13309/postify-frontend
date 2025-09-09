import Comment from "./Comment";
import CreateComment from "./CreateComment";
import ReactionPicker from "../reaction/ReactionPicker";
import styles from "../styles/CommentSection.module.css";
import { useEffect, useState, useRef } from "react";

import { IoMdCloseCircle } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

import Loading from "../common/Loading";
import InfiniteScroll from 'react-infinite-scroll-component'
import API from "../../../apiRoutes.js";
import { useSafeFetch } from '../../hooks/useSafeFetch'

export default function CommentSection({ postID, toggleCommentSection, modalUpdater, setModalVisibility }) {
  const [comments, setComments] = useState([]);
  const [createCommentVisibility, setCreateCommentVisibility] = useState(false);
  const [commentOption, setCommentOption] = useState("create")
  const [currentCommentID, setCurrentCommentID] = useState(null)
  const [showReactionPicker, setShowReactionPicker] = useState(false)

  const [initialCommentText, setInitialCommentText] = useState("")

  const [commentCreationState, setCommentCreationState] = useState(false);

  const [userReaction, setUserReaction] = useState(null);
  const [userReactionID, setUserReactionID] = useState(null);

  const [pageNumber, setPageNumber] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [curUrl, setCurUrl] = useState(`${API.COMMENT.getComments}/${postID}?page=${pageNumber || 1}`)

  const [url, setUrl] = useState('')
  const [options, setOptions] = useState({ method: 'GET', credentials: 'include' })
  const { data, error, loading, abort } = useSafeFetch(curUrl, options)

  useEffect(() => {
    if (data?.code == '032') {
      const newComments = data?.data;
      if (newComments?.length==0) {
        setHasMore(false)
        return;
      }
      console.log(newComments)
      setComments(prev => [...prev, ...newComments])
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

  const fetchMoreComments = () => {
    const newPageNum = pageNumber+1
    setPageNumber(newPageNum)
    setCurUrl(`${API.COMMENT.getComments}/${postID}?page=${newPageNum}`)
  }

  return (
    <>
      <div className={styles.commentSectionOverlay}>
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

          <InfiniteScroll
              dataLength={data?.data?.length || 0}
              next={fetchMoreComments}
              hasMore={hasMore}
              scrollableTarget="comments-container">
          
            <div className={styles.comments} id="comments-container">
              
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
                      setShowReactionPicker={setShowReactionPicker}
                      updateCurrentReactionForComment={() => {
                        setUserReaction(comment?.userReaction);
                        setUserReactionID(comment?.userReactionID);
                      }}
                    />
                  ))}
            </div>
          </InfiniteScroll>

          {(comments?.length == 0 && !error && !loading) && <p className={styles.error}>No comments yet.</p> }
          {loading && !error && <Loading />}
          {error && <p className={styles.error}>An error occured!</p>}
          
        </div>        

        {showReactionPicker && (
          <ReactionPicker
            resourceID={showReactionPicker}
            setShowReactionPicker={setShowReactionPicker}
            userReaction={userReaction}
            userReactionID={userReactionID}
            resType="comment"
          />
        )}
    </div>
    </>
  );
}
