import { useEffect } from 'react'
import styles from '../styles/Button.module.css'

export default function Button({ children, variant, ...props }) {
    const variants = {
        "primary": "buttonPrimary",
        "secondary": "buttonSecondary",
        "destructive": 'buttonDestructive',
        "success": "buttonSuccess",
        "warning": "buttonWarning"
    }

    

    useEffect(() => {
        if (!styles[variants[variant]]) {
            console.error(`Err: Variant '${variant}' is invalid or the 'variants' object doesn't support it yet.`)
        }
    }, [])

    const btnClassName = styles[variants[variant]]  || "primary"


    return (
        <div className={styles.wrapper}>
            <button {...props} className={btnClassName}>{children || "Default"}</button>
        </div>
        
    )
}