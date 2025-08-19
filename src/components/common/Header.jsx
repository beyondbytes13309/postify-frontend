import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import Search from "./Search";

import HBMenu from "./HBMenu";

import { AuthContext } from "../../contexts/AuthContext";

import postify from "../../assets/postify.avif";

import styles from "../styles/Header.module.css";
import { useContext, useEffect, useState } from "react";

const showOptions = { search: false, home: false, profile: false, create: false }

function Header() {
  const [HBMenuVisibility, setHBMenuVisibility] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showOptions, setShowOptions] = useState({ search: false, home: false, profile: false, create: false, admin: false })

  useEffect(() => {
    let newObj = showOptions
    if (isLoggedIn) {
      newObj = Object.fromEntries(Object.keys(newObj).map(key => [key, true]))
    }
    if (['moderator', 'admin'].includes(user?.role)) {
      newObj.admin = true
    }
    setShowOptions(newObj)
  }, [isLoggedIn, user])

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper2}>
        <img src={postify} alt="" className={styles.logo} />
        {isLoggedIn && (
          <div className={styles.navWrapper}>
            <nav className={styles.navigation}>
              {showOptions.create && (
                <Link title="Create" className={styles.navItem} to="/create">
                  <IoMdAdd className={styles.navIcon} />
                </Link>
              )}
              {showOptions.home && (
                <Link title="Home" className={styles.navItem} to="/">
                  <FaHome className={styles.navIcon} />
                </Link>
              )}
              {showOptions.search && (
                <button
                  title="Search"
                  className={styles.navItem}
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <IoSearchSharp className={styles.navIcon} />
                </button>
              )}
              {showOptions.admin && (
                <Link title="Admin dashboard" className={styles.navItem} to="/dashboard">
                  <MdOutlineAdminPanelSettings className={styles.navIcon}/>
                </Link>
              )}
              {showOptions.profile && (
                <Link title="Profile" className={styles.navItem} to="/profile">
                  <img
                    className={`${styles.navIcon} ${styles.profilePicURL}`}
                    src={user?.profilePicURL}
                    alt="pfp"
                  />
                </Link>
              )}
            </nav>

            {Object.values(showOptions).some((value) => value) && (
              <button
                className={styles.burgerMenu}
                onClick={() => setHBMenuVisibility(!HBMenuVisibility)}
              >
                <GiHamburgerMenu className={styles.burgerMenuIcon} />
              </button>
            )}
          </div>
        )}
        {showSearch && <Search />}

        {HBMenuVisibility && <HBMenu showOptions={showOptions} />}
      </div>
    </div>
  );
}

export default Header;
