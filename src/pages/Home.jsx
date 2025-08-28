import { useContext, useEffect, useRef, useState } from "react";
import PostShower from '../components/post/PostShower'
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../../apiRoutes";
import Modal from '../components/common/Modal'

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const modalInfo = useRef()
  const [modalVisibility, setModalVisibility] = useState(false)

  useEffect(() => {
    if (isLoggedIn == false) {
      navigate("/auth");
    }
  }, [isLoggedIn]);

  //return <>{isLoggedIn && <Feed />}</>;

  return <>
    {isLoggedIn && <PostShower url={API.POST.getRecommendedPosts} modalUpdater={modalInfo?.current?.modifyModal} setModalVisibility={setModalVisibility}/>}
    <Modal 
    ref={modalInfo}
    visibility={modalVisibility}
    setVisibility={setModalVisibility}/>
  </>
}
