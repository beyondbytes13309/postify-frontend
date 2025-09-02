import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

import UserCard from "../components/user/UserCard";
import PostShower from '../components/post/PostShower.jsx'
import Modal from "../components/common/Modal";

import { useSafeFetch } from "../hooks/useSafeFetch.jsx";
import API from "../../apiRoutes.js";


export default function Profile() {
  const location = useLocation()
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate()
  const modalInfo = useRef({});
  const [modalVisibility, setModalVisibility] = useState(false);
  const [url, setUrl] = useState(null)
  const [options, setOptions] = useState(null)
  const { data, error, loading, abort } = useSafeFetch(url, options)
  const [userToPass, setUserToPass] = useState(null)
  const [option, setOption] = useState(null)

  const userID = params.get("userID"); 

  const { isLoggedIn, user, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn == false) {
      navigate("/auth");
    }
  }, [isLoggedIn]);  

  useEffect(() => {
    if (userID) {
      setOptions({
        method: 'GET',
        credentials: 'include'
      })
      setUrl(`${API.USER.getAnyUserData}/${userID}`)
    } else {
       setUserToPass(user)
       setOption('ownProfile')
    }
  }, [userID, user])

  useEffect(() => {
    if (data?.code == '056') {
      setUserToPass(data.user)
      setOption('othersProfile')
    }
  }, [data])

  return (
    <>
      {isLoggedIn == true && (
        <>
          {<UserCard resource={userToPass} setIsLoggedIn={setIsLoggedIn} option={option} modalUpdater={modalInfo?.current?.modifyModal} setModalVisibility={setModalVisibility}/>}
          {user && userToPass?._id ? <PostShower url={`${API.POST.getUserPosts}/${userToPass?._id}`} modalUpdater={modalInfo?.current?.modifyModal} setModalVisibility={setModalVisibility}/> : null}
          <Modal
            ref={modalInfo}
            visibility={modalVisibility}
            setVisibility={setModalVisibility}
          />
        </>
      )}
    </>
  );
}
