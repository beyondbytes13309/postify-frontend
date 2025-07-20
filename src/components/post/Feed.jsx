import { useState } from 'react'
import PostCard from './PostCard'

import ReactionPicker from '../reaction/ReactionPicker';

import { motion, AnimatePresence } from 'motion/react';
import CommentSection from '../comment/CommentSection'

import styles from '../styles/Feed.module.css'

export default function Feed() {
    const commentSectionVariants = {
        initial: {opacity: 0},
        animate: {opacity: 1},
        exit: {opacity: 0}
    }

    const [showReactionPicker, setShowReactionPicker] = useState(false)
    const [showCommentSection, setShowCommentSection] = useState(null)

    const [selected, setSelected] = useState(null)

    const [posts, setPosts] = useState([
    {
        postID: "4328942389048",
        authorName: "Muhalay_wali_Influencer",
        authorPfpURL: "https://i.pinimg.com/736x/db/1f/9a/db1f9a3eaca4758faae5f83947fa807c.jpg",
        postText: "Me ek influencer hon. Mera kaam logo ko bewaqoof banana 🍌 hai",
        postCommentsNum: 4,
        postReactionsNum: 9
    },
    {
        postID: "9182374619283",
        authorName: "Sohaib Karak",
        authorPfpURL: "https://cdn.discordapp.com/avatars/1390683404105945119/f28a9d64185d0288a81a9a98055bb5b3.webp?size=240",
        postText: "mere damag me koi ideas nahi arahay yaar",
        postCommentsNum: 2,
        postReactionsNum: 12
    },
    {
        postID: "7283947283947",
        authorName: "20rs wala chooza",
        authorPfpURL: "https://cdn.britannica.com/07/183407-050-C35648B5/Chicken.jpg",
        postText: "Mujhay murghay khana boht acha lagta hai 😋",
        postCommentsNum: 0,
        postReactionsNum: 10
    },
]);

    
    return (
        <>
            <div className={styles.wrapper}>
                {posts.map((post, index) => {
                    return <PostCard 
                    key={index}
                    postID={post.postID} 
                    authorName={post.authorName} 
                    authorPfpURL={post.authorPfpURL} 
                    postText={post.postText}
                    postCommentsNum={post.postCommentsNum}
                    postReactionsNum={post.postReactionsNum}
                    setShowReactionPicker={setShowReactionPicker}
                    setShowCommentSection={setShowCommentSection}
                    showCommentSection={showCommentSection}
                    selected={selected}/>
                })}
            </div>

            {showReactionPicker && <ReactionPicker postID={showReactionPicker} setShowReactionPicker={setShowReactionPicker}/>}
            <AnimatePresence mode="wait">
                    {showCommentSection&& <motion.div
                    method={showCommentSection.toString()}
                    variants={commentSectionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{duration: 0.2, ease: "easeInOut"}}>
                        {<CommentSection 
                        postID={showCommentSection}
                        toggleCommentSection={() => setShowCommentSection(prev => !prev)}/>}
                    </motion.div>}
            </AnimatePresence>

        </>
    )
}