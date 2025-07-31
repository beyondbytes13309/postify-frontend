import { div } from "motion/react-client";
import styles from "../styles/Search.module.css";

import { IoIosSearch } from "react-icons/io";

export default function Search() {
  return (
    <div className={styles.wrapper}>
      <input type="text" autofocus={true} />
      <button className={styles.searchBtn}>
        <IoIosSearch className={styles.searchIcon} />
      </button>
    </div>
  );
}
