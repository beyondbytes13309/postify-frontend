import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchSharp } from "react-icons/io5";

import Search from "./Search";

import HBMenu from "./HBMenu";

import { AuthContext } from "../../contexts/AuthContext";

import postify from '../../assets/postify.avif'

import styles from '../styles/Header.module.css'
import { useContext, useState } from "react";

function Header({ showOptions={search: false, home: false, create: false, profile: false} }) {
    const [HBMenuVisibility, setHBMenuVisibility] = useState(false)
    const { isLoggedIn } = useContext(AuthContext)
    const [showSearch, setShowSearch] = useState(false)
    
    return (
        <div className={styles.wrapper}>
            <img src={postify} alt=""  className={styles.logo}/>
            {isLoggedIn && <div className={styles.navWrapper}>
                <nav className={styles.navigation}>
                    {showOptions.create && (<Link className={styles.navItem} to="/create"><IoMdAdd className={styles.navIcon} /></Link>)}
                    {showOptions.home && (<Link className={styles.navItem} to="/"><FaHome className={styles.navIcon} /></Link>)}
                    {showOptions.search && (<button className={styles.navItem} onClick={() => setShowSearch(!showSearch)}><IoSearchSharp className={styles.navIcon} /></button>)}
                    {showOptions.profile  && (<Link className={styles.navItem} to="/profile"><CgProfile className={styles.navIcon}/></Link>)}
                    
                </nav>

                {Object.values(showOptions).some((value) => value) && <button className={styles.burgerMenu} onClick={() => setHBMenuVisibility(!HBMenuVisibility)}><GiHamburgerMenu className={styles.burgerMenuIcon} /></button>}
            </div>}
            {showSearch && <Search />}

            {HBMenuVisibility && <HBMenu showOptions={showOptions}/>}
        </div>

        
    )
    
}

export default Header