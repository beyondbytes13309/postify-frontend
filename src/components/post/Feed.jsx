import { useEffect, useState } from "react";
import PostCard from "./PostCard";

import ReactionPicker from "../reaction/ReactionPicker";

import { motion, AnimatePresence } from "motion/react";
import CommentSection from "../comment/CommentSection";

import styles from "../styles/Feed.module.css";
import API from "../../../apiRoutes";

export default function Feed() {
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

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPosts = async () => {
      const response = await fetch(API.POST.getPosts, {
        method: "GET",
        credentials: "include",
        signal: abortController.signal,
      });

      if (response.status >= 200 && response.status < 500) {
        const parsed = await response.json();
        if (parsed.code == "014") {
          setPosts(parsed.data);
        }
      }
    };

    fetchPosts();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        {posts.length > 0 ? (
          posts.map((post) => {
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
              />
            );
          })
        ) : (
          <p className={styles.noPosts}>No posts yet.</p>
        )}
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
            method={showCommentSection.toString()}
            variants={commentSectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {
              <CommentSection
                postID={showCommentSection}
                toggleCommentSection={() =>
                  setShowCommentSection((prev) => !prev)
                }
              />
            }
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
