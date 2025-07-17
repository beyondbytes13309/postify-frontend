import { createContext, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import Modal from '../components/common/Modal'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [user, setUser] = useState(null)
    const location = useLocation()
    const [modalVisibility, setModalVisibility] = useState(false)
    const modalInfo = useRef({variant: 'alert'})

    const modifyModal = ({title, text, variant, buttons, setButtonClick}) => {
        modalInfo.current.title = title || modalInfo.current.title
        modalInfo.current.text = text || modalInfo.current.text
        modalInfo.current.variant = variant || modalInfo.current.variant
        modalInfo.current.buttons = buttons || modalInfo.current.buttons
        modalInfo.current.setButtonClick = setButtonClick || modalInfo.current.setButtonClick
    }

    
    const fetchUserData = async () => {
        try {
        
            const response = await fetch("http://localhost:3000/", { credentials: "include" })
            
            if (response.ok) {
                const parsed = await response.json()
                if (parsed.code == "055") {
                    setUser(parsed.user);
                    setIsLoggedIn(true);
                    return
                } else if (parsed.code == '006') {
                    setIsLoggedIn(false);
                    return
                } else {
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false)
            }

            
        } catch(e) {
            modifyModal({ title: 'Error', text: 'Cannot connect to server. Please try again later.' })
            setModalVisibility(true)
            setIsLoggedIn(false)
        }
    };

    useEffect(() => {
        if (location.pathname == '/auth' || location.pathname == '/' || location.pathname == '/profile') {
            fetchUserData()
        }


        
    }, [location.pathname])



    return (
        <>
            <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user: user?.user || user, setUser }}>
                { children }
            </AuthContext.Provider>

            <Modal 
            visibility={modalVisibility}
            setVisibility={setModalVisibility}
            variant={modalInfo.current.variant}
            title={modalInfo.current.title}
            text={modalInfo.current.text}/>
        </>
    )
}

export default AuthProvider

