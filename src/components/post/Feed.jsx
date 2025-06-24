import { useState } from 'react'
import PostCard from './PostCard'

export default function Feed() {
    const [posts, setPosts] = useState(null)
    
    return (
        <>
            <PostCard postID={"5435534"} authorName={"Rana Emmar"} authorPfpURL={"https://i.pinimg.com/736x/db/1f/9a/db1f9a3eaca4758faae5f83947fa807c.jpg"} postText="I ate food for breakfast today"></PostCard>
        </>
    )
}