import styles from '../styles/AuthForm.module.css'
import { useContext, useRef, useState } from 'react'
import { FaEyeSlash, FaEye, FaGithub, FaTwitter, FaUser } from "react-icons/fa";

import { IoLockClosed } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

import API from '../../../apiRoutes'

import googleIcon from '../../assets/googleIcon.svg'
import Button from '../common/Button'
import Modal from '../common/Modal'
import { AuthContext } from '../../contexts/AuthContext';




export default function AuthForm({ type, toggleMethod }) {
    const titles = {
        'signin': "Sign in now",
        'signup': "Sign up now"
    }

    const { setIsLoggedIn, setUser } = useContext(AuthContext)

    const [showPassword, setShowPassword]= useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const [modalVisibility, setModalVisibility] = useState(false)
    const modalInfo = useRef({})

    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}

        const isValidPasswordFormat = /^[A-Za-z0-9!@#$%^&*()_+=\[\]{}|:;<>?.\/~-]+$/.test(password)
        const isValidEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        const isValidUsernameFormat = /^[A-Za-z0-9!@#$%^&*()_+=\[\]{}|:;<>?.\/~-]+$/.test(username)

        if (!password) {
            newErrors.password = "Password is required!"
        } else if (!isValidPasswordFormat) {
            newErrors.password = "Used characters not allowed in password!"
        } else if (password.length < 8) {
            newErrors.password = "Password cannot be less than 8 characters!"
        } else if (password.length > 32) {
            newErrors.password = "Password cannot be greater than 32 characters!"
        }

        if (type == 'signup') {
            if (!email.trim()) {
                newErrors.email = "Email is required!"
            } else if (!isValidEmailFormat) {
                newErrors.email = "Email format is incorrect!"
            }
        } else if (type == 'signin') {
            if (!username.trim()) {
                newErrors.username = "Username is required!"
            } else if (!isValidUsernameFormat) {
                newErrors.username = "Used characters not allowed in username!"
        }
        }

        if (Object.values(newErrors).length != 0) {
            setErrors(newErrors)
            return false
        } else {
            return true
        }
    }

    const handleAuth = async (authType) => {
        // no need to cut muahs here cuz im only doing frontend rightnow backend will be later
        // alert(`In the future, you will probably ${titles[type] || 'do something great'}`)

        setUser(null)

        if (authType == 'local_auth') {
            if (type == 'signin') {
                try {
                    const response = await fetch(API.AUTH.loginLocal, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({username, password}), credentials: 'include'})
                    const parsed = await response.json()
                    if (parsed?.code == '005') {
                        setUser(parsed.user)
                        setIsLoggedIn(true)
                    } else if (parsed?.code == '001') {
                        setErrors({username: 'Username does not exist!'})
                    } else if (parsed?.code == '002') {
                        setErrors({password: 'Password is incorrect!'})
                    }
                } catch(e) {
                    modalInfo.current.modifyModal({
                        variant: 'alert',
                        title: 'Error',
                        text: "Couldn't make request to the server due to internet",
                        setButtonClick: null
                    })
                    setModalVisibility(true)
                }
                
            } else if (type == 'signup') {
               
                const response = await fetch(API.AUTH.registerLocal, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email, password})})
                const parsed = await response.json()
                
                if (parsed?.code == '003') {
                    setErrors({email: 'User with this email already exists!'})
                } else if (parsed?.code == '004') {
                    setUser(parsed.user)
                    setIsLoggedIn(true)
                } 
               
                
            }
        }

        if (authType == 'google_auth') {
            window.location.href = API.AUTH.googleAuth
        }

        if (authType == 'github_auth') {
            window.location.href = API.AUTH.githubAuth
        }
    }

    return (
        <>
        
        <div className={styles.wrapper}>
            <div className={styles.form}>
                
                <h2 className={styles.title}>{titles[type] || 'Undefined'}</h2>

                {type == 'signup' ? (
                    <div className={styles.auth_email}>

                        <input type="email" placeholder=' ' id="email_input" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <label htmlFor="email_input"><MdEmail />Email</label>

                    </div>
                ) : type == 'signin' ? (
                    <div className={styles.auth_username} >

                        <input type="text" placeholder=' ' id="username_input" onChange={(e) => setUsername(e.target.value)} value={username}/>
                        <label htmlFor="username_input"><FaUser />Username</label>

                    </div>
                ) : "You didn't pass a valid argument for 'type'"}
                
            
                <p className={styles.errors}>{errors[type=='signin' ? 'username' : 'email']} &#8203;</p>

                <div className={styles.auth_password}>

                    <input type={showPassword ? 'text' : 'password'} placeholder=' ' id="password_input" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <label htmlFor="password_input"><IoLockClosed />Password</label>
                    <button className={styles.passwordShowBtn} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                    
                </div>

                <p className={styles.errors}>{errors['password']} &#8203;</p>

                

                <div className={styles.signup_btn}>
                    
                    <Button onClick={() => {
                        if (validateForm()) handleAuth('local_auth')
                    }} variant="primary">{type == 'signin' ? 'Sign in' : type == 'signup' ? 'Sign up' : 'Undefined'}</Button>
                </div>

                

                <div className={styles.social_buttons}>
                    <p>Or continue with</p>
                    <button onClick={() => handleAuth('google_auth')} className={styles.google_btn}><img src={googleIcon} className={styles.google_icon} /> Google</button>
                    <button onClick={() => handleAuth('github_auth')} className={styles.github_btn}><FaGithub /> Github</button>
                    {/*<button onClick={() => handleAuth('twitter_auth')} className={styles.twitter_btn}><FaTwitter /> Twitter</button>*/ null}
                </div>

                <p onClick={toggleMethod} className={styles.auth_toggle_text}>{type=='signin' ? "Don't have an account? Create one now" : 
                    type=='signup' ? "Already have an account? Sign in now"  : null}</p>

                
            </div>
        </div>
        
        <Modal 
        ref={modalInfo}
        visibility={modalVisibility}
        setVisibility={setModalVisibility}/>

        
        </>
    )
}