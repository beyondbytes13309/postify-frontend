import { useEffect, useState } from "react";
import styles from "../styles/ReactionPicker.module.css";
import API from "../../../apiRoutes";
import { MdCancel } from "react-icons/md";
import { useSafeFetch } from "../../hooks/useSafeFetch";
import { useCan } from '../../hooks/useCan'


export default function ReactionPicker({
  postID,
  setShowReactionPicker,
  userReaction,
  userReactionID,
}) {
  const can = useCan()
  const [selected, setSelected] = useState(0);
  const [url, setUrl] = useState('')
  const [options, setOptions] = useState({})
  const { data, error, loading, abort } = useSafeFetch(url, options)

  const allowedToMakeReaction = can(
    ["make_reaction"]
  );

  const reactionHandler = async ({
    action = "create",
    reactionType,
    postID,
    reactionID,
  }) => {
    if (action == "create") {
      setOptions({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          postID: postID,
          reactionType,
        }),
      })
      setUrl(API.REACTION.makeReaction)
      
    } else if (action == "delete") {

      setOptions({
        method: "DELETE",
        credentials: "include",
      })
      setUrl(`${API.REACTION.deleteReaction}/${reactionID}`)
    }
  };

  useEffect(() => {
    if (data?.code == '017' || data?.code == '018') {
      setShowReactionPicker(null);
    }
  }, [data])
  

  useEffect(() => {
    setSelected(userReaction);
  }, []);

  const handleMakeReaction = async (reaction) => {
    let finalReaction = 0;

    if (selected == reaction) {
      setSelected(0);
      reactionHandler({ action: "delete", reactionID: userReactionID });
      return;
    } else {
      setSelected(reaction);
      finalReaction = reaction;
    }
    reactionHandler({
      action: "create",
      reactionType: finalReaction,
      postID: postID,
    });
  };

  const reactions = {
    1: ["👍", "Like"],
    2: ["👎", "Dislike"],
    3: ["💗", "Love"],
    4: ["😂", "Funny"],
    5: ["😮", "Surprised"],
    6: ["😢", "Sad"],
    7: ["😡", "Angry"],
    8: ["🧐", "Curious"],
    9: ["🤝", "Respect"],
    10: ["💡", "Insightful"],
  };

  if (!allowedToMakeReaction) {
    return (
      <p>You cannot make reactions</p>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wheel}>
        {Object.entries(reactions).map(([key, [emoji, label]]) => (
          <button
            key={key}
            title={label}
            onClick={() => {
              handleMakeReaction(key);
            }}
            className={
              selected == key
                ? `${styles.reactionBtn} ${styles.reactionBtnSelected}`
                : styles.reactionBtn
            }
          >
            {emoji}
          </button>
        ))}
        <button
          className={styles.cancelBtn}
          onClick={() => setShowReactionPicker(null)}
        >
          <MdCancel />
        </button>
      </div>
    </div>
  );
}
