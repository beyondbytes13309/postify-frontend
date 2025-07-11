import { useEffect, useState } from 'react';
import styles from '../styles/UserCard.module.css'
import { FaEdit } from "react-icons/fa";

import Button from '../common/Button'
import Modal from '../common/Modal'

import API from '../../../apiRoutes';

export default function UserCard({ user: {_id, username, email, bio, profilePicURL }}) {
    /* 
    This will greet the user
    show their pfp, their userID
    */

    const [file, setFile] = useState(null)
    const [userBio, setUserBio] = useState(bio)
    const [userUsername, setUserUsername] = useState(username)
    const [preview, setPreview] = useState(profilePicURL)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (file) {
            const objectURL = URL.createObjectURL(file)
            setPreview(objectURL)

            return () => URL.revokeObjectURL(objectURL);
        }

    }, [file])

    const save = async () => {
        const formData = new FormData();
        formData.append('image', file)
        const response = await fetch(API.USER.uploadPfp, {method: 'POST', body: formData, credentials: 'include'})
        if (response.ok) {
            const parsed = await response.json()

            if (parsed.code == '030') {
                setError(parsed.data)
                setModalVisibility(true)
                setPreview(profilePicURL)
            } else if (parsed.code == '031') {
                setError(parsed.data)
                setModalVisibility(true)
                setPreview(profilePicURL)
            }

            console.log(parsed)
        }
    }

    return (
        <>
 
            <div className={styles.info}>
                <div className={styles.pfpRelated}>
                    <img className={`${styles.profilePicURL}`} src={ preview } alt="Pfp" />
                    <input 
                    type='file'
                    accept=".jpg, .jpeg, .png, .gif, .webp, .svg, .bmp" 
                    className={styles.editPfp} 
                    id="fileInput"
                    onChange={(e) => setFile(e.target.files[0])} />
                    <label className={`${styles.editPfp} ${styles.label}`} htmlFor="fileInput"><FaEdit /></label>
                </div>

                

                <div className={styles.username}>
                    <p>{userUsername}</p>
                    
                    <input type="text" defaultValue={userUsername}  onChange={(e) => setUserUsername(e.target.value)}/>
                    <button onClick={async () => {
                        const response = await (await fetch(API.USER.editUser, {method: 'POST', headers: {"Content-Type": 'application/json'}, credentials: 'include', body: JSON.stringify({username: userUsername})})).json()
                        if (response.code == '021') {
                            setError(response.data)
                            setModalVisibility(true)
                        }
                        
                    }}><FaEdit /></button>
                </div>

                <div className={styles.bio}>
                    <p>{userBio}</p>
                    <input type="text" defaultValue={userBio} onChange={(e) => setUserBio(e.target.value)}/>
                    <button onClick={async () => {
                        const response = await (await fetch(API.USER.editUser, {method: 'POST', headers: {"Content-Type": 'application/json'}, credentials: 'include', body: JSON.stringify({bio: userBio})})).json()
                        if (response.code == '021') {
                            setError(response.data)
                            setModalVisibility(true)
                        }
                    }}><FaEdit /></button>
                </div>

                <Button variant="success" onClick={save}>Save</Button>
                
                <Modal
                visibility={modalVisibility}
                setVisibility={setModalVisibility}
                buttonTexts={['OK']}
                title="Error"
                text={error}
                />
                
            </div>
            

            
        </>
    )
}