import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import UserCard from "../components/user/UserCard";
import PostShower from '../components/post/PostShower.jsx'

import API from "../../apiRoutes.js";


export default function Profile() {
  const navigate = useNavigate();

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

          {user ? <UserCard resource={user} setIsLoggedIn={setIsLoggedIn} /> : null}
          {user ? <PostShower url={`${API.POST.getUserPosts}/${user?._id}`}/> : null}
        </>
      )}
    </>
  );
}
