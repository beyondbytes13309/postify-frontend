import styles from "../styles/HBMenu.module.css";

import { Link } from "react-router-dom";

export default function HBMenu() {
  return (
    <>
      <div className={styles.wrapper}>
        <Link className={styles.option} to="/profile">
          Your Profile
        </Link>
        <Link className={styles.option} to="/">
          Home
        </Link>
        <Link className={styles.option} to="/create">
          Create
        </Link>
      </div>
    </>
  );
}
