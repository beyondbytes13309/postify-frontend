import { useState } from 'react'
import styles from '../styles/ReactionPicker.module.css'
import API from '../../../apiRoutes'


export default function ReactionPicker({ postID, setShowReactionPicker }) {
    const [selected, setSelected] = useState(0)

    const toggleReaction = (reaction) => {
        if (selected == reaction) {
            setSelected(0)
        } else {
            setSelected(reaction)
        }
    }

    const handleMakeReaction = async (reaction) => {
        let finalReaction = 0
        
        if (selected == reaction) {
            setSelected(0)
            finalReaction = 0
        } else {
            setSelected(reaction)
            finalReaction = reaction
        }
        const response = await fetch(API.REACTION.makeReaction, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ postID: postID, reactionType: finalReaction }),
        });

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
                <button title={label} onClick={() => {handleMakeReaction(key); setShowReactionPicker(null)}} className={selected == key ?  `${styles.reactionBtn} ${styles.reactionBtnSelected}`: styles.reactionBtn}>{emoji}</button>)
            )}
        </div>
    )
}