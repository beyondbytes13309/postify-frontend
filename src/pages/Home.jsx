import { useContext, useEffect, useState } from "react"
import Feed from "../components/post/Feed"
import { AuthContext } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

import Modal from "../components/common/Modal"




export default function Home() {

    const navigate = useNavigate()
    const { isLoggedIn } = useContext(AuthContext)

    const [m1Visibility, setM1Visibility] = useState(true)
    const [buttonClick, setButtonClick] = useState(-1)
    const [modalInput, setModalInput] = useState('')


    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/auth')
        }
    }, [isLoggedIn])

    

    return (
        <>
            {isLoggedIn && <Feed />}
            
            

            <Modal 
            visibility={m1Visibility}
            setVisibility={setM1Visibility}
            variant="input"
            buttonTexts={["Edit", "Cancel"]}
            title="Done"
            text="Please edit it"
            setButtonClick={setButtonClick}
            modalInput={modalInput}
            setModalInput={setModalInput}
            />

            {modalInput}

        </>
    )
}
