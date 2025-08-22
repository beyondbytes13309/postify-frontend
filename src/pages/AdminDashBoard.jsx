import styles from './styles/AdminDashBoard.module.css'
import { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminDashBoard() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
  const allowedToVisit = ['admin', 'moderator'].includes(user?.role)
      if (isLoggedIn == false) {
        navigate("/auth");
      } else if (!allowedToVisit) {
        navigate('/')
      }
    }, [isLoggedIn, user]);

  if (isLoggedIn) return (
    <p className={styles.test}>Hey, this is only for testing!</p>
  )
}
