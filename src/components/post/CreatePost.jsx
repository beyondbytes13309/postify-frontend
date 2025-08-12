import styles from "../styles/CreatePost.module.css";
import Button from "../common/Button";
import { useEffect, useRef, useState } from "react";
import { useSafeFetch } from "../../hooks/useSafeFetch.jsx";
import Modal from "../common/Modal.jsx";
import API from "../../../apiRoutes.js";

export default function CreatePost({ option="create", resource }) {
  const [postText, setPostText] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const modalInfo = useRef({});

  const [url, setUrl] = useState('')
  const [options, setOptions] = useState({})
  const { data, error, loading, abort } = useSafeFetch(url, options)

  const handlePost = async () => {
    modalInfo.current.modifyModal({
      setButtonClick: null,
      variant: "alert",
      setModalInput: null,
    });

    // functionality added in future
    //modifyModal(modalInfo, { title: 'Success', text})
    //setModalVisibility(true)
    
    if (!postText) {
      modalInfo.current.modifyModal({ title: "Error", text: "Invalid Data" });
      setModalVisibility(true);
      return;
    }
    if (postText.length < 10) {
      modalInfo.current.modifyModal({
        title: "Error",
        text: "Post is shorter than minimum allowed length",
      });
      setModalVisibility(true);
      return;
    }
    if (postText.length > 300) {
      modalInfo.current.modifyModal({
        title: "Error",
        text: "Post is longer than maximum allowed length",
      });
      setModalVisibility(true);
      return;
    }

    if (option == "create") {
      setOptions({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postText }),
        credentials: "include",
      })
      setUrl(API.POST.createPost)
      
    } else if (option == "edit") {
      setOptions({
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postText }),
        credentials: "include",
      })
      setUrl(`${API.POST.editPost}/${resource?._id}`)
    }
    
    
  };

  useEffect(() => {
    setPostText(resource?.postText || "")
  }, [])

  useEffect(() => {
    if (data?.code == "015") {
      modalInfo.current.modifyModal({
        title: "Success",
        text: data.data,
      });
      setModalVisibility(true);
      setPostText("");
    } else if (data?.code == "010") {
      modalInfo.current.modifyModal({ title: "Error", text: data.data });
      setModalVisibility(true);
    } else if (data?.code == "022") {
      modalInfo.current.modifyModal({ title: "Error", text: data.data });
      setModalVisibility(true);
    } else if (data?.code == "037") {
      modalInfo.current.modifyModal({
        title: "Success",
        text: data?.data?.message,
      });
      setModalVisibility(true);
      setPostText("");
    }

  }, [data])

  return (
    <>
      <div className={styles.wrapper}>
        <textarea
          placeholder="Enter post text..."
          className={styles.postTextInput}
          onChange={(e) => {
            postText.length <= 300 && setPostText(e.target.value)
          }
          }
          value={postText}
        ></textarea>
        <div className={styles.options}>
          <Button
            className={styles.postBtn}
            variant="post"
            onClick={handlePost}
          >
            {option=="create" ? 'Post' : 'Save'}
          </Button>
        </div>

        <span
          className={styles.postLengthCount}
        >{`${postText?.length}/300`}</span>
      </div>

      <Modal
        ref={modalInfo}
        visibility={modalVisibility}
        setVisibility={setModalVisibility}
      />
    </>
  );
}
