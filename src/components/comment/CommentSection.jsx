import Comment from './Comment'
import CreateComment from './CreateComment';
import styles from '../styles/CommentSection.module.css'
import { useEffect, useState } from 'react'

import { IoMdCloseCircle } from "react-icons/io";

import Loading from '../common/Loading'

export default function CommentSection({ postID, toggleCommentSection }) {
    const [comments, setComments] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [failed, setFailed] = useState(false)


    useEffect(() => {
        
        const fetchAndSetComments = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/comments")
                const parsed = await response.json()
                setComments(parsed)
                setIsFetching(false)
            } catch(e) {
                setFailed(true)
            }
            
        }
        setIsFetching(true)
        fetchAndSetComments()

    }, [])

    return (
        <>
            
            <div className={styles.wrapper}>
                <h2>Comments</h2>

                

                <button className={styles.closeBtn}>
                    <IoMdCloseCircle className={styles.closeBtnIcon} onClick={toggleCommentSection}/>
                </button>
                <div className={styles.comments}>
                    <CreateComment />
                    {
                        comments.map((comment, index) => (
                            <Comment 
                            key={index} 
                            commentText={comment.body}
                            commentAuthor={comment.name}
                            commentEmail={comment.email} />
                        ))
                    }
                </div>
                
                {isFetching && !failed && <Loading />}
                {failed && <p className={styles.error}>An error occured!</p>}
            </div>
                


        </>
    )
}