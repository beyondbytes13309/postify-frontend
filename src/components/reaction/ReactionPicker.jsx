import { useState } from 'react'
import styles from '../styles/ReactionPicker.module.css'


export default function ReactionPicker() {
    const [selected, setSelected] = useState(0)

    const toggleReaction = (reaction) => {
        if (selected == reaction) {
            setSelected(0)
        } else {
            setSelected(reaction)
        }
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
            {Object.values(reactions).map((reaction) => (
                <button title={reaction[1]} onClick={() => toggleReaction(reaction[0])} className={selected == reaction[0] ?  `${styles.reactionBtn} ${styles.reactionBtnSelected}`: styles.reactionBtn}>{reaction[0]}</button>)
            )}
        </div>
    )
}