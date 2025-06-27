import Comment from './Comment'
import styles from '../styles/CommentSection.module.css'
import { useEffect, useState } from 'react'



export default function CommentSection({ postID }) {
    const [comments, setComments] = useState([])


    useEffect(() => {
        const fetchAndSetComments = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/comments")
            const parsed = await response.json()
            setComments(parsed)
        }
        fetchAndSetComments()

    }, [])

    return (
        <>
            
            <div className={styles.wrapper}>
                <h2>Comments</h2>
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
                


        </>
    )
}