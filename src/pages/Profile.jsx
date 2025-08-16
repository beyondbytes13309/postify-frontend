import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";


import UserCard from "../components/user/UserCard";
import PostShower from '../components/post/PostShower.jsx'

import API from "../../apiRoutes.js";
import { useSafeFetch } from "../hooks/useSafeFetch.jsx";


export default function Profile() {
  const location = useLocation()
  const params = new URLSearchParams(location.search);

  const [url, setUrl] = useState(null)
  const [options, setOptions] = useState(null)
  const { data, error, loading, abort } = useSafeFetch(url, options)
  const [fetchedUser, setFetchedUser] = useState()

  const userID = params.get("userID"); 
  
  useEffect(() => {
    setOptions({
      method: 'GET',
      credentials: 'include'
    })
    setUrl(`${API.USER.getAnyUserData}/${userID}`)
  }, [])

  useEffect(() => {
    if (data?.code == '055') {
      setFetchedUser(data?.user)
    }
  }, [data])

  const { isLoggedIn, user, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn == false) {
      navigate("/auth");
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn == true && (
        <>
          {
            /*<UserCard userID={} username={user.username} pfpURL={user.profilePicURL} />*/ null
          }

          {<UserCard resource={fetchedUser} setIsLoggedIn={setIsLoggedIn} />}
          {user ? <PostShower url={`${API.POST.getUserPosts}/${fetchedUser?._id}`}/> : null}
        </>
      )}
    </>
  );
}
