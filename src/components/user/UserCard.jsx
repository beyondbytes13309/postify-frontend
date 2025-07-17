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
    const [userBio, setUserBio] = useState(bio || 'No bio yet.')
    const [userUsername, setUserUsername] = useState(username)
    const [userDisplayName, setUserDisplayName] = useState(displayName)
    const [preview, setPreview] = useState(profilePicURL)
    const [modalVisibility, setModalVisibility] = useState(false)
    const modalInfo = useRef({})
    const [modalBtnClick, setModalBtnClick] = useState(-1)

    const [editStuff, setEditStuff] = useState(false)
    
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

    

    const modifyModal = ({title, text, variant, buttons, setButtonClick}) => {
        modalInfo.current.title = title || modalInfo.current.title
        modalInfo.current.text = text || modalInfo.current.text
        modalInfo.current.variant = variant || modalInfo.current.variant
        modalInfo.current.buttons = buttons || modalInfo.current.buttons
        modalInfo.current.setButtonClick = setButtonClick || modalInfo.current.setButtonClick
    }

    const logout = () => {
        modifyModal({text: 'Are you sure you want to logout?', title: 'Danger', variant: 'warning', setButtonClick: setModalBtnClick})
        setModalVisibility(true)
    }

    const save = async () => {
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
                modifyModal({variant: 'alert', title: 'Success', text: `Successfuly updated ${Object.keys(updateObject)}`, setButtonClick: null})
                setModalVisibility(true)
                setEditStuff(false)
              } else if (parsed.code == '021') {
                modifyModal({variant: 'alert', title: 'Error', text: parsed.data, setButtonClick: null})
                setModalVisibility(true)
              }

              console.log(parsed)
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
            modifyModal({
                title: "Error",
                text: parsed.data,
                variant: "alert",
                buttonClickHandle: null,
              });
              setModalVisibility(true);
              setPreview(profilePicURL);
            } else if (parsed.code == "031") {
              modifyModal({
                title: "Error",
                text: parsed.data,
                variant: "alert",
                buttonClickHandle: null,
              });
              setModalVisibility(true);
              setPreview(profilePicURL);
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
              </div>

              <div className={styles.bio}>
                {!editStuff && <p>{userBio}</p>}
                {editStuff && (
                  <textarea className={styles.bioInput}
                    type="text"
                    value={userBio}
                    onChange={(e) => setUserBio(e.target.value)}
                  />
                )}
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
              visibility={modalVisibility}
              setVisibility={setModalVisibility}
              variant={modalInfo.current.variant}
              buttonTexts={modalInfo.current.buttons}
              title={modalInfo.current.title}
              text={modalInfo.current.text}
              setButtonClick={modalInfo.current.setButtonClick}
            />
          </div>
        </div>
      </>
    );
}