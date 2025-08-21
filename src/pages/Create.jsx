import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect, useContext, useRef, useState } from "react";
import Modal from "../components/common/Modal";

import styles from "./styles/Create.module.css";

import CreatePost from "../components/post/CreatePost";

export default function Create() {
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const option = searchParams.get('option') || 'create'
  const resource = location.state || {}
  const [modalVisibility, setModalVisibility] = useState(false);
  const modalInfo = useRef({});

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn == false) navigate("/auth");
  }, [isLoggedIn]);

  return (
    <>
      <div className={styles.wrapper}>
        <CreatePost option={option} resource={resource} modalUpdaterFac={() => modalInfo?.current?.modifyModal} setModalVisibility={setModalVisibility} modalInfo={modalInfo}/>
      </div>
      <Modal
        ref={modalInfo}
        visibility={modalVisibility}
        setVisibility={setModalVisibility}
      />
    </>
  );
}
