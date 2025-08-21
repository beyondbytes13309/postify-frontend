import { useEffect, useMemo, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import styles from "../styles/UserCard.module.css";

import Button from "../common/Button";
import RestrictUser from './RestrictUser'
import { motion, AnimatePresence } from "motion/react";

import { useSafeFetch } from "../../hooks/useSafeFetch";
import { useCan } from '../../hooks/useCan'
import API from "../../../apiRoutes";

import { formatToMMDDYYYY } from '../../utils/conversion'


export default function UserCard({
  resource,
  setIsLoggedIn,
  option="ownProfile" /* ownProfile or othersProfile */,
  modalUpdater,
  setModalVisibility
}) {
  // State
  const [file, setFile] = useState(null);
  const [userBio, setUserBio] = useState();
  const [userUsername, setUserUsername] = useState();
  const [userDisplayName, setUserDisplayName] = useState();
  const [preview, setPreview] = useState();
  const [modalBtnClick, setModalBtnClick] = useState(-1);
  const [editStuff, setEditStuff] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [url, setUrl] = useState('')
  const [options, setOptions] = useState({})
  const [showRestrictUserMenu, setShowRestrictUserMenu] = useState(false)

  const restrictUserVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Hooks
  const { data, error, loading, abort } = useSafeFetch(url, options)
  const can = useCan()

  // Permission checks
  const allowedToEditProfile = useMemo(
    () => can(['edit_own_profile', 'edit_any_profile'], resource),
    [resource, can]
  )

  const allowedToLogOut = useMemo(
    () => can(['logout_own_user'],  resource),
    [resource, can]
  )

  const allowedToRestrictUserL1 = useMemo(
    () => can(['restrict_any_user_level_1'], resource),
    [resource, can]
  );

  const allowedToRestrictUserL2 = useMemo(
    () => can(['restrict_any_user_level_2'], resource),
    [resource, can]
  );

  const allowedToRestrictUserL3 = useMemo(
    () => can(['restrict_any_user_level_3'], resource),
    [resource, can]
  );

  const restrictUserArray = [allowedToRestrictUserL1, allowedToRestrictUserL2, allowedToRestrictUserL3]

  // Effects
  useEffect(() => {
    setUserBio(resource?.bio)
    setUserUsername(resource?.username)
    setUserDisplayName(resource?.displayName)
    setPreview(resource?.profilePicURL)
  }, [resource])

  useEffect(() => {
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setPreview(objectURL);

      return () => URL.revokeObjectURL(objectURL);
    }
  }, [file]);

  useEffect(() => {
    if (modalBtnClick == 0) {
      continueLogout();
      setModalBtnClick(-1);
    }
  }, [modalBtnClick]);

  useEffect(() => {
    if (data?.code == "011") {
      // logged out successfully
      setIsLoggedIn(false);
    } else if (data?.code == "020") {
      // success in updating fields
      modalUpdater({
        variant: "alert",
        title: "Success",
        text: `Successfuly updated fields.`,
        setButtonClick: null,
      });
      setModalVisibility(true);
      setEditStuff(false);
    } else if (data?.code == "021") {
      // error in updating fields
      modalUpdater({
        variant: "alert",
        title: "Error",
        text: data.data,
        setButtonClick: null,
      });
      setModalVisibility(true);
    }

    if (data?.code == "030") {
      modalUpdater({
        title: "Error",
        text: data.data,
        variant: "alert",
        buttonClickHandle: null,
      });
      setModalVisibility(true);
      setPreview(resource?.profilePicURL);
    } else if (data?.code == "031") {
      modalUpdater({
        title: "Error",
        text: data.data,
        variant: "alert",
        buttonClickHandle: null,
      });
      setModalVisibility(true);
      setPreview(resource?.profilePicURL);
    } else if (data?.code == "032") {
      modalUpdater({
        title: "Success",
        text: data.data,
        variant: "alert",
        buttonClickHandle: null,
      });
      setModalVisibility(true);
      setEditStuff(false);
    }
  }, [data, error]);


  // Helpers
  const validateUserData = () => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "image/bmp",
    ];
    const validationErrors = {};

    modalUpdater({
      variant: "alert",
      title: "Error",
      setButtonClick: null,
    });

    if (userBio.length > 160) {
      validationErrors.bio = "Bio is too long";
      setUserBio(resource?.bio);
    }
    if (userUsername.length < 6) {
      validationErrors.username = "Username is too short";
      setUserUsername(resource?.username);
    }
    if (userUsername.length > 32) {
      validationErrors.username = "Username is too long";
      setUserUsername(resource?.username);
    }
    if (userDisplayName.length < 3) {
      validationErrors.displayName = "Display name is too short";
      setUserDisplayName(resource?.displayName);
    }
    if (userDisplayName.length > 32) {
      validationErrors.displayName = "Display name is too long";
      setUserDisplayName(resource?.displayName);
    }

    if (file && file.size > 1 * 1024 * 1024) {
      validationErrors.pfp = "File exceeds 1MB limit";
      setFile(null);
      setPreview(profilePicURL);
    }
    if (file && !allowedTypes.includes(file?.type)) {
      validationErrors.pfp = "Unsupported file type";
      setFile(null);
      setPreview(profilePicURL);
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return true;
    } else {
      return false;
    }
  };


  // Handlers
  const logout = () => {
    modalUpdater({
      text: "Are you sure you want to logout?",
      title: "Danger",
      variant: "warning",
      setButtonClick: setModalBtnClick,
    });
    setModalVisibility(true);
  };
  
  const continueLogout = async () => {
     setOptions({ method: 'POST', credentials: 'include'})
     setUrl(API.AUTH.logout)
  };

  const save = async () => {
    if (!allowedToEditProfile) {
      return
    }

    if (validateUserData()) {
      return;
    }

    const updateObject = {};
    if (userBio != resource?.bio) {
      updateObject.bio = userBio;
    }
    if (userUsername != resource?.username) {
      updateObject.username = userUsername;
    }
    if (userDisplayName != resource?.displayName) {
      updateObject.displayName = userDisplayName;
    }

    if (Object.values(updateObject).length > 0) {
      setOptions({
        method: "PATCH",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updateObject),
      });
      const url = option=="ownProfile" ? API.USER.editUser 
                : option=="othersProfile" ? `${API.USER.editSpecificUser}/${resource?._id}`
                : null
      setUrl(url)
    }

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      setOptions({
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      const url = option=="ownProfile" ? API.USER.editPfp 
                : option=="othersProfile" ? `${API.USER.editSpecificPfp}/${resource?._id}`
                : null
      setUrl(url)
    }
  };

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

              {allowedToEditProfile && <Button
                variant="secondary"
                onClick={() => setEditStuff((prev) => !prev)}
              >
                {editStuff ? "Cancel" : "Edit Profile"}
              </Button>}

              {allowedToLogOut  && <Button variant="destructive" onClick={logout}>
                Logout
              </Button>}

                {(allowedToRestrictUserL1 || allowedToRestrictUserL2 || allowedToRestrictUserL3) && <Button
                variant="destructive"
                onClick={() => setShowRestrictUserMenu(true)}>
                  Restrict
                </Button>}
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
              {editStuff && (
                <span className={styles.error}>{errors.displayName}</span>
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
              {editStuff && (
                <span className={styles.error}>{errors.username}</span>
              )}
            </div>

            <div className={styles.bio}>
              {!editStuff && <p>{userBio || "No bio yet."}</p>}
              {editStuff && (
                <textarea
                  className={styles.bioInput}
                  type="text"
                  value={userBio}
                  placeholder={`My name is ${resource?.displayName}...`}
                  onChange={(e) =>
                    e.target.value.length < 160 && setUserBio(e.target.value)
                  }
                />
              )}
              {editStuff && (
                <span
                  className={styles.bioLengthCount}
                >{`${userBio.length}/159`}</span>
              )}
              {editStuff && <span className={styles.error}>{errors.bio}</span>}
            </div>
          </div>

          {editStuff && (
            <div className={styles.saveBtn}>
              <Button variant="success" onClick={save}>
                Save
              </Button>
            </div>
          )}

          <div className={styles.basicNumbers}>
            <div className={styles.numDiv}>
              <p className={styles.item1}>{resource?.numOfPosts || 0}</p>
              <p className={styles.item2}>Posts</p>
            </div>

            <div className={styles.numDiv}>
              <p className={styles.item1}>{resource?.numOfMembers || 0}</p>
              <p className={styles.item2}>Members</p>
            </div>

            <div className={styles.numDiv}>
              <p className={styles.item1}>Joined</p>
              <p className={styles.item2}>{formatToMMDDYYYY(resource?.createdAt)}</p>
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence mode="wait">
        {showRestrictUserMenu && option!='ownProfile' && 
        <motion.div
          style={{ position: 'relative', zIndex: 5 }}
          variants={restrictUserVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          <RestrictUser 
            restrictUserArray={restrictUserArray} 
            resource={resource} 
            setShowRestrictUserMenu={setShowRestrictUserMenu}
            setModalVisibility={setModalVisibility}
            modalUpdater={modalUpdater}
          />
        </motion.div>}
      </AnimatePresence>
    </>
  );
}
