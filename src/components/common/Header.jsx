import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchSharp } from "react-icons/io5";

import postify from '../../assets/postify.png'

import styles from '../styles/Header.module.css'
import { useState } from "react";

function Header({ showOptions={search: false, home: false, create: false, profile: false} }) {
    const [dropDownMenuVisibility, setDropDownMenuVisibility] = useState(true)

    return (
        <div className={styles.wrapper}>
            <img src={postify} alt=""  className={styles.logo}/>
            <div className={styles.navWrapper}>
                <nav className={styles.navigation}>
                    {showOptions.create && (<a className={styles.navItem} href="#"><IoMdAdd className={styles.navIcon} /></a>)}
                    {showOptions.home && (<a className={styles.navItem} href="#"><FaHome className={styles.navIcon} /></a>)}
                    {showOptions.search && (<a className={styles.navItem} href="#"><IoSearchSharp className={styles.navIcon} /></a>)}
                    {showOptions.profile && (<a className={styles.navItem} href="#"><CgProfile className={styles.navIcon}/></a>)}
                    
                </nav>

                {Object.values(showOptions).some((value) => value) && <button className={styles.burgerMenu} onClick={() => setDropDownMenuVisibility(!dropDownMenuVisibility)}><GiHamburgerMenu className={styles.burgerMenuIcon} /></button>}
            </div>
            
        </div>

        
    )
    
}

export default Header