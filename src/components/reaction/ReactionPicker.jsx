import { useEffect, useState } from 'react'
import styles from '../styles/ReactionPicker.module.css'
import API from '../../../apiRoutes'
import { MdCancel } from "react-icons/md";


const reactionHandler = async ({action="create", reactionType, postID, reactionID}) => {
    console.log(reactionID)
    if (action!="create" && action!="delete") {
        console.error(`Wrong parameter passed to 'reactionHandler': ${action}`)
        return;
    }
    const response = await fetch(action==="create" ? API.REACTION.makeReaction : action=="delete" ? API.REACTION.deleteReaction : null, {
        method: action == 'create' ? 'POST' : 'DELETE',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(action == "create" ? {
            postID: postID,
            reactionType
        }: action == 'delete' ? {
            reactionID
        }: null),
    });

    
    console.log("deleting it", await response.json())
}

export default function ReactionPicker({ postID, setShowReactionPicker, userReaction, userReactionID }) {
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        setSelected(userReaction)
    }, [])

    const handleMakeReaction = async (reaction) => {
        let finalReaction = 0
        
        if (selected == reaction) {
            setSelected(0)
            reactionHandler({action: 'delete', reactionID: userReactionID})
            return
        } else {
            setSelected(reaction)
            finalReaction = reaction
        }
        reactionHandler({action: 'create', reactionType: finalReaction, postID: postID})

    }

    const reactions = {
        1: ['👍', 'Like'],
        2: ['👎', 'Dislike'],
        3: ['💗', 'Love'],
        4: ['😂', 'Funny'],
        5: ['😮', 'Surprised'],
        6: ['😢', 'Sad'],
        7: ['😡', 'Angry'],
        8: ['🧐', 'Curious'],
        9: ['🤝', 'Respect'],
        10: ['💡', 'Insightful']
    }

    return (
        <div className={styles.wrapper}>
            {Object.entries(reactions).map(([key, [emoji, label]]) => (
                <button key={key} title={label} onClick={() => {handleMakeReaction(key); setShowReactionPicker(null)}} className={selected == key ?  `${styles.reactionBtn} ${styles.reactionBtnSelected}`: styles.reactionBtn}>{emoji}</button>)
            )}
            <button className={styles.cancelBtn} onClick={() => setShowReactionPicker(null)}><MdCancel /></button>
        </div>
    )
}