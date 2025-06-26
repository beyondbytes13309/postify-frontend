import { useState } from 'react'
import PostCard from './PostCard'

import styles from '../styles/Feed.module.css'

export default function Feed() {
    const [posts, setPosts] = useState([
    {
        postID: "4328942389048",
        authorName: "Muhalay_wali_Influencer",
        authorPfpURL: "https://i.pinimg.com/736x/db/1f/9a/db1f9a3eaca4758faae5f83947fa807c.jpg",
        postText: "Me ek influencer hon. Mera kaam logo ko bewaqoof banana 🍌 hai"
    },
    {
        postID: "9182374619283",
        authorName: "Sohaib Karak",
        authorPfpURL: "https://cdn.discordapp.com/attachments/1378991454931910658/1387711466848780359/sohaib_flippi.jpeg?ex=685e5684&is=685d0504&hm=38d93483299fda8489f9548f749f1e463f621244b3a7638f61c3e0d64685cdaf&",
        postText: "mere damag me koi ideas nahi arahay yaar"
    },
    {
        postID: "7283947283947",
        authorName: "20rs wala chooza",
        authorPfpURL: "https://cdn.britannica.com/07/183407-050-C35648B5/Chicken.jpg",
        postText: "Mujhay murghay khana boht acha lagta hai 😋"
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
                    postText={post.postText}/>
                })}
            </div>
        </>
    )
}