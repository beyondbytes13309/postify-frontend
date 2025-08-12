import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect, useContext } from "react";

import styles from "./styles/Create.module.css";

import CreatePost from "../components/post/CreatePost";

export default function Create() {
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const option = searchParams.get('option') || 'create'
  const resource = location.state || {}

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn == false) navigate("/auth");
  }, [isLoggedIn]);

  return (
    <>
      <div className={styles.wrapper}>
        <CreatePost option={option} resource={resource}/>
      </div>
    </>
  );
}
