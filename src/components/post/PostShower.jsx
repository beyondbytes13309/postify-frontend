import { useEffect, useRef, useState } from "react";
import { useSafeFetch } from "../../hooks/useSafeFetch";
import { motion, AnimatePresence } from "motion/react";

import PostCard from "./PostCard";
import ReactionPicker from "../reaction/ReactionPicker";
import CommentSection from "../comment/CommentSection";

import styles from "../styles/Feed.module.css";
import { useNavigate } from "react-router-dom";
import { useCan } from '../../hooks/useCan'


export default function PostShower({ url, modalUpdater, setModalVisibility }) {
  const can = useCan()
  const allowedToViewPosts = can(
    ['view_posts']
  )

  if (!allowedToViewPosts) {
    return (
      <p className={styles.noPosts}>You are not allowed to view posts.</p>
    )
  }
  
  const { data, error, loading, abort } = useSafeFetch(url, {method: 'GET', credentials: 'include'})
  const commentSectionVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(null);

  const [userReaction, setUserReaction] = useState(null);
  const [userReactionID, setUserReactionID] = useState(null);

  const [posts, setPosts] = useState([]);
  
  const [selectedPost, setSelectedPost] = useState(null)
  
  const [editingPost, setEditingPost] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    setPosts(data?.data || [])
  }, [data])

  useEffect(() => {
    if (editingPost) {
      navigate('/create?option=edit', { state: selectedPost })
    }
  }, [editingPost])


  return (
    <>
      <div className={styles.wrapper}>
        {posts?.length > 0 ? (
          posts?.map?.((post) => {
            return (
              <PostCard
                key={post._id}
                resource={post}
                setShowReactionPicker={setShowReactionPicker}
                setShowCommentSection={setShowCommentSection}
                updateCurrentReactionForPost={() => {
                  setUserReaction(post?.userReaction);
                  setUserReactionID(post?.userReactionID);
                }}
                onDelete={(id) => {
                  setPosts((prev) => prev.filter((post) => post._id !== id));
                }}
                modalUpdater={modalUpdater}
                setModalVisibility={setModalVisibility}
                setSelectedPost={setSelectedPost}
                setEditingPost={setEditingPost}
              />
            );
          })
        ) : (
          <p className={styles.noPosts}></p>
        )}

          <p className={styles.noPosts}>
          {error && !loading}
          </p>

        {!loading && !error && Array.isArray(data?.data) && data.data.length === 0 && (
          <p className={styles.noPosts}>No posts yet.</p>
        )}

        {loading && <p className={styles.noPosts}>Loading posts...</p>}

        <p className={styles.noPosts}>
          {data?.code == '403' && 'You are not allowed to view posts.'}
        </p>

        
        
      </div>

      {showReactionPicker && (
        <ReactionPicker
          postID={showReactionPicker}
          setShowReactionPicker={setShowReactionPicker}
          userReaction={userReaction}
          userReactionID={userReactionID}
        />
      )}
      <AnimatePresence mode="wait">
        {showCommentSection && (
          <motion.div
            style={{ position: 'relative', zIndex: 5 }}
            method={showCommentSection.toString()}
            variants={commentSectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {
              <CommentSection
                postID={showCommentSection}
                toggleCommentSection={() =>
                  setShowCommentSection((prev) => !prev)
                }
                modalUpdater={modalUpdater}
                setModalVisibility={setModalVisibility}
              />
            }
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
