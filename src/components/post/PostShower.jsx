import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSafeFetch } from "../../hooks/useSafeFetch";
import { motion, AnimatePresence } from "motion/react";
import InfiniteScroll from 'react-infinite-scroll-component'
import { Loader } from "lucide-react";

import PostCard from "./PostCard";
import ReactionPicker from "../reaction/ReactionPicker";
import CommentSection from "../comment/CommentSection";

import styles from "../styles/PostShower.module.css";
import { useCan } from '../../hooks/useCan'


export default function PostShower({ url, modalUpdater, setModalVisibility }) {
  const can = useCan()
  const navigate = useNavigate();

  const allowedToViewPosts = can(
    ['view_posts']
  )
    
  const [pageNumber, setPageNumber] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [curUrl, setCurUrl] = useState(`${url}?page=${pageNumber || 1}`)
  const { data, error, loading, abort } = useSafeFetch(curUrl, {method: 'GET', credentials: 'include'})

  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(null);

  const [userReaction, setUserReaction] = useState(null);
  const [userReactionID, setUserReactionID] = useState(null);

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null)
  const [editingPost, setEditingPost] = useState(null)

  const commentSectionVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  if (!allowedToViewPosts) {
    return (
      <p className={styles.noPosts}>You are not allowed to view posts.</p>
    )
  }


  useEffect(() => {
    if (data?.code == '013') {
      const newPosts = data?.data;
      if (newPosts?.length==0) {
        setHasMore(false)
        return;
      }
      setPosts(prev => [...prev, ...newPosts])
    }
  }, [data])

  useEffect(() => {
    if (editingPost) {
      navigate('/create?option=edit', { state: selectedPost })
    }
  }, [editingPost])

  const fetchMorePosts = () => {
    const newPageNum = pageNumber+1
    setPageNumber(newPageNum)
    setCurUrl(`${url}?page=${newPageNum}`)
  }

  return (
    <>
      <InfiniteScroll
        dataLength={data?.data?.length || 0}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<Loader className={styles.postShowerLoader}/>}>
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

          {!loading && !error && Array.isArray(data?.data) && posts?.length === 0 && (
            <p className={styles.noPosts}>No posts yet</p>
          )}

          {loading && <p className={styles.noPosts}>Loading posts...</p>}

          <p className={styles.noPosts}>
            {data?.code == '403' && 'You are not allowed to view posts.'}
          </p>

        </div>
      </InfiniteScroll>

      {showReactionPicker && (
        <ReactionPicker
          resourceID={showReactionPicker}
          setShowReactionPicker={setShowReactionPicker}
          userReaction={userReaction}
          userReactionID={userReactionID}
          resType="post"
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
