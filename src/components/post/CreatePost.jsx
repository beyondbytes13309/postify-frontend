import styles from '../styles/CreatePost.module.css';
import Button from '../common/Button'
import { useRef, useState } from 'react';
import Modal from '../common/Modal.jsx'
import API from '../../../apiRoutes.js';

export default function CreatePost() {
    const [postText, setPostText] = useState("")
    const [modalVisibility, setModalVisibility] = useState(false)
    const modalInfo = useRef({})

    

    const handlePost = async () => {
        modalInfo.current.modifyModal({ setButtonClick: null, variant: 'alert', setModalInput: null})

        // functionality added in future
        //modifyModal(modalInfo, { title: 'Success', text})
        //setModalVisibility(true)

        if (!postText) {
            modalInfo.current.modifyModal({ title: 'Error', text: "Invalid Data" })
            setModalVisibility(true)
            return
        } 
        if (postText.length < 10) {
            modalInfo.current.modifyModal({ title: 'Error', text: "Post is shorter than minimum allowed length" })
            setModalVisibility(true)
            return
        }
        if (postText.length > 300) {
            modalInfo.current.modifyModal({ title: 'Error', text: "Post is longer than maximum allowed length" })
            setModalVisibility(true)
            return
        }

        try {
            const response = await fetch(API.POST.createPost, {method: 'POST', headers: {"Content-Type": 'application/json'}, body: JSON.stringify({postText}), credentials: 'include'})

            if (response.status >= 200 && response.status < 500) {
                const parsed = await response.json()
                console.log(parsed)
                
                
                if (parsed.code == '015') {
                    modalInfo.current.modifyModal({ title: 'Success', text: parsed.data })
                    setModalVisibility(true)
                    setPostText("")
                } else if (parsed.code == '010') {
                    modalInfo.current.modifyModal({ title: 'Error', text: parsed.data })
                    setModalVisibility(true)
                } else if (parsed.code == '022') {
                    modalInfo.current.modifyModal({ title: 'Error', text: parsed.data })
                    setModalVisibility(true)
                }
            }
        } catch(e) {
            modalInfo.current.modifyModal({ title: 'Error', text: "Something went wrong. Please try again later." })
            setModalVisibility(true)
        }

    }

    return (
        <>
            <div className={styles.wrapper}>
                <textarea placeholder='Enter post text...' className={styles.postTextInput} onChange={(e) => setPostText(e.target.value)} value={postText}></textarea>
                <div className={styles.options}>
                    <Button className={styles.postBtn} variant="post" onClick={handlePost}>Post</Button>
                </div>
                
                
            </div>

            <Modal
            ref={modalInfo}
            visibility={modalVisibility}
            setVisibility={setModalVisibility}
        />
        </>
    )
}