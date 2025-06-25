import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";


import styles from '../styles/Header.module.css'

function Header() {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Postify</h2>
            <div className={styles.navWrapper}>
                <nav className={styles.navigation}>
                    <a className={styles.navItem} href="#"><IoMdAdd className={styles.navIcon} /></a>
                    <a className={styles.navItem} href="#"><FaHome className={styles.navIcon} /></a>
                    <a className={styles.navItem} href="#"><CgProfile className={styles.navIcon}/></a>
                </nav>

                <button className={styles.burgerMenu}><GiHamburgerMenu className={styles.burgerMenuIcon} /></button>

            </div>
        </div>
    )
    
}

export default Header