import { useContext, useEffect, useState } from "react";
import Feed from "../components/post/Feed";
import PostShower from '../components/post/PostShower'
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../../apiRoutes";

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn == false) {
      navigate("/auth");
    }
  }, [isLoggedIn]);

  //return <>{isLoggedIn && <Feed />}</>;

  return <>{isLoggedIn && <PostShower url={API.POST.getPosts}/>}</>
}
