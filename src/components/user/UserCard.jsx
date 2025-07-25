import { useEffect, useRef, useState } from 'react';
import styles from '../styles/UserCard.module.css'
import { FaEdit } from "react-icons/fa";

import Button from '../common/Button'
import Modal from '../common/Modal'

import API from '../../../apiRoutes';

export default function UserCard({ user: {_id, username, displayName, email, bio, profilePicURL, numOfPosts, numOfMembers, createdAt }, setIsLoggedIn }) {
    /* 
    This will greet the user
    show their pfp, their userID
    */

    const [file, setFile] = useState(null)
    const [userBio, setUserBio] = useState(bio)
    const [userUsername, setUserUsername] = useState(username)
    const [userDisplayName, setUserDisplayName] = useState(displayName)
    const [preview, setPreview] = useState(profilePicURL)
    const [modalVisibility, setModalVisibility] = useState(false)
    const modalInfo = useRef({})
    const [modalBtnClick, setModalBtnClick] = useState(-1)

    const [editStuff, setEditStuff] = useState(false)
    const [errors, setErrors] = useState({})
    
    const formatToMMDDYYYY = (isoString) => {
      const date = new Date(isoString);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day   = String(date.getDate()).padStart(2, '0');
      const year  = date.getFullYear();
      return `${month}/${day}/${year}`;
    }

    useEffect(() => {
        if (file) {
            const objectURL = URL.createObjectURL(file)
            setPreview(objectURL)

            return () => URL.revokeObjectURL(objectURL);
        }

    }, [file])

    const continueLogout = async () => {
            
            try {

                const response = await fetch(API.AUTH.logout, {method: 'POST', credentials: 'include'})
                if (response.ok) {
                    const parsed = await response.json()
                    if (parsed.code == '011') {
                        setIsLoggedIn(false)
                    } else if (parsed.code == '010') {
                        setModalVisibility(true)
                        modalInfo.current.text = parsed.data
                        setModalVariant('alert')
                    }
                }
            } catch(err) {
                console.log("fk")
            }
        }

    useEffect(() => {
        if (modalBtnClick==0) {
            continueLogout()
            setModalBtnClick(-1)
        }
    }, [modalBtnClick])

    

    const logout = () => {
        modalInfo.current.modifyModal({text: 'Are you sure you want to logout?', title: 'Danger', variant: 'warning', setButtonClick: setModalBtnClick})
        setModalVisibility(true)
    }

    const validateUserData = () => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp'];
      const validationErrors = {}

      modalInfo.current.modifyModal({ variant: 'alert', title: 'Error', setButtonClick: null })

      if (userBio.length > 160) {
        validationErrors.bio = "Bio is too long"
        setUserBio(bio)
      }
      if (userUsername.length < 6) {
        validationErrors.username = 'Username is too short'
        setUserUsername(username)
      }
      if (userUsername.length > 32) {
        validationErrors.username = 'Username is too long'
        setUserUsername(username)
      }
      if (userDisplayName.length < 3) {
        validationErrors.displayName = 'Display name is too short'
        setUserDisplayName(displayName)

      }
      if (userDisplayName.length > 32) {
        validationErrors.displayName = 'Display name is too long'
        setUserDisplayName(displayName)
      }

      if (file && file.size > 1 * 1024 * 1024) {
        validationErrors.pfp = 'File exceeds 1MB limit'
        setFile(null)
        setPreview(profilePicURL)
      }
      if (file && !allowedTypes.includes(file?.type)) {
        validationErrors.pfp = 'Unsupported file type'
        setFile(null)
        setPreview(profilePicURL)
      }

      
 
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return true
      } else {
        return false
      }
      
    }

    const save = async () => {
        
      if (validateUserData()) {
        return
      }

        const updateObject = {}
        if (userBio != bio) {
            updateObject.bio = userBio
        }
        if (userUsername != username) {
            updateObject.username = userUsername
        }
        if (userDisplayName != displayName) {
            updateObject.displayName = userDisplayName
        }

        if (Object.values(updateObject).length > 0) {
            const otherResponse = await fetch(API.USER.editUser, {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(updateObject), credentials: 'include'})
           
            
            if (otherResponse.status >=200 && otherResponse.status < 500) {
              const parsed = await otherResponse.json()
              if (parsed.code == '020') {
                modalInfo.current.modifyModal({variant: 'alert', title: 'Success', text: `Successfuly updated ${Object.keys(updateObject)}`, setButtonClick: null})
                setModalVisibility(true)
                setEditStuff(false)
              } else if (parsed.code == '021') {
                modalInfo.current.modifyModal({variant: 'alert', title: 'Error', text: parsed.data, setButtonClick: null})
                setModalVisibility(true)
              }

            }
            
        }
        
        if (file) {
          const formData = new FormData();
          formData.append("image", file);
          const response = await fetch(API.USER.uploadPfp, {
            method: "POST",
            body: formData,
            credentials: "include",
          });
          


          if (response.status >= 200 && response.status < 500) {
            const parsed = await response.json()
           

            if (parsed.code == "030") {
            modalInfo.current.modifyModal({
                title: "Error",
                text: parsed.data,
                variant: "alert",
                buttonClickHandle: null,
              });
              setModalVisibility(true);
              setPreview(profilePicURL);
            } else if (parsed.code == "031") {
              modalInfo.current.modifyModal({
                title: "Error",
                text: parsed.data,
                variant: "alert",
                buttonClickHandle: null,
              });
              setModalVisibility(true);
              setPreview(profilePicURL);
            } else if (parsed.code == "032") {
              modalInfo.current.modifyModal({
                title: "Success",
                text: parsed.data,
                variant: 'alert',
                buttonClickHandle: null
              })
              setModalVisibility(true)
            }
          }
          
         
        }
        
    }

    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.info}>

            <div className={styles.upperWrapper}>
              <div className={styles.pfpRelated}>
                <img
                  className={`${styles.profilePicURL}`}
                  src={preview}
                  alt="Pfp"
                />
                {editStuff && (
                  <>
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png, .gif, .webp, .svg, .bmp"
                      className={styles.editPfp}
                      id="fileInput"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label
                      className={`${styles.editPfp} ${styles.label}`}
                      htmlFor="fileInput"
                    >
                      <FaEdit />
                    </label>
                  </>
                )}
                
              </div>
              

              <div className={styles.btnWrapper}>
                <Button
                  variant="secondary"
                  onClick={() => setEditStuff((prev) => !prev)}
                >
                  {editStuff ? "Cancel" : "Edit Profile"}
                </Button>

                <Button variant="destructive" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>

            <div>
                {editStuff && <span className={styles.error}>{errors.pfp}</span>}
            </div>

            <div className={styles.changeStuff}>
              <div className={styles.displayName}>
                  {!editStuff && <p>{userDisplayName}</p>}
                  {editStuff && (
                  <input
                    className={styles.displayNameInput}
                    type="text"
                    value={userDisplayName}
                    onChange={(e) => setUserDisplayName(e.target.value)}
                  /> 
                )}
                {editStuff && <span className={styles.error}>{errors.displayName}</span>}
              </div>

              <div className={styles.username}>
                {!editStuff && <p>@{userUsername}</p>}
                {editStuff && (
                  <input
                    className={styles.usernameInput}
                    type="text"
                    value={userUsername}
                    onChange={(e) => setUserUsername(e.target.value)}
                  />
                )}
                 {editStuff && <span className={styles.error}>{errors.username}</span>}
              </div>

              <div className={styles.bio}>
                {!editStuff && <p>{userBio || 'No bio yet.'}</p>}
                {editStuff && (
                  <textarea className={styles.bioInput}
                    type="text"
                    value={userBio}
                    placeholder={`My name is ${displayName}...`}
                    onChange={(e) => e.target.value.length < 160 && setUserBio(e.target.value)}
                  />
                )}
                {editStuff && (<span className={styles.bioLengthCount}>{`${userBio.length}/159`}</span>)}
                {editStuff && <span className={styles.error}>{errors.bio}</span>}
              </div>
            </div>

            {editStuff && (<div className={styles.saveBtn}>
              <Button variant="success" onClick={save}>
                Save
              </Button>
              </div>)}

            <div className={styles.basicNumbers}>
              <div className={styles.numDiv}>
                <p className={styles.item1}>{numOfPosts || 0}</p>
                <p className={styles.item2}>Posts</p>
              </div>

              <div className={styles.numDiv}>
                <p className={styles.item1}>{numOfMembers || 0}</p>
                <p className={styles.item2}>Members</p>
              </div>

               <div className={styles.numDiv}>
                <p className={styles.item1}>Joined</p>
                <p className={styles.item2}>{formatToMMDDYYYY(createdAt)}</p>
              </div>
            </div>

            <Modal
              ref={modalInfo}
              visibility={modalVisibility}
              setVisibility={setModalVisibility}
            />
          </div>
        </div>
      </>
    );
}