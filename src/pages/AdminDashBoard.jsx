import styles from './styles/AdminDashBoard.module.css'
import { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminDashBoard() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
      if (isLoggedIn == false) {
        navigate("/auth");
      }
    }, [isLoggedIn]);

  if (isLoggedIn) return (
    <p className={styles.test}>Hey, this is only for testing!</p>
  )
}
