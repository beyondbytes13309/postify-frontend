import { useState } from 'react'
import styles from '../styles/Modal.module.css'

import Button from './Button'

export default function Modal({
     visibility=true, 
     setVisibility, 
     variant="alert", 
     buttonTexts=[], 
     title="Default title", 
     text="Default text", 
     setButtonClick= ()=>{console.warn("You're seeing this probably because you didn't pass 'setButtonClick' function as a prop to the Modal component")},
     modalInput="",
     setModalInput=()=>{console.warn("You're seeing this probably because you didn't pass the 'setModalInput' function as a prop to the Modal component")}}) {

    const handleButtonClick = (btnNum) => {
        setButtonClick(btnNum)
        setVisibility(false)
    }

    const variants = {
        alert: "alertModal",
        warning: "warningModal",
        input: "inputModal"
        
    }


    return (
        <>
            
            
              
            {visibility && <div className={styles.modalOverlay}>
                <div className={`${styles.wrapper} ${styles[variants[variant] || 'alertModal']}`}>
                    <h2 className={styles.title}>{title}</h2>

                    <p className={styles.text}>{text}</p>
                    
                    {variant == 'warning' ? (
                        <div className={styles.buttons}>
                            <Button variant="destructive" onClick={() => handleButtonClick(0)}>{buttonTexts[0] || "Yes"}</Button>
                            <Button variant="secondary" onClick={() => handleButtonClick(1)}>{buttonTexts[1] || "Cancel"}</Button>
                        </div>   
                    ) : variant == 'alert' ? (
                        <div  className={styles.buttons}>
                            <Button variant="success" onClick={() => handleButtonClick(0)}>{buttonTexts[0] || "Okay" }</Button>
                        </div>
                    ) : variant == 'input' ? (
                        <div className={styles.miniWrapper}>
                            <input type="text" onChange={(e) => setModalInput(e.target.value)} value={modalInput}/>
                            <div>
                                <Button variant="primary" onClick={() => handleButtonClick(0)}>{buttonTexts[0] || "Done"}</Button>
                                <Button variant="secondary" onClick={() => handleButtonClick(1)}>{buttonTexts[1] || "Cancel"}</Button>
                            </div>
                            
                        </div>
                    ) : null}

                </div>
            </div>}

            
            
        </>
    )
}