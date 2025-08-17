import styles from '../styles/RestrictUser.module.css'
import Button from '../common/Button'
import { useEffect, useState } from 'react'

const format = (number) => {
  return number.toString().padStart(2, "0");
}



export default function RestrictUser({restrictUserArray, resource, setShowRestrictUserMenu}) {
    const [minutes, setMinutes] = useState(15)
    const [hours, setHours] = useState(0)
    const [reason, setReason] = useState('')
    const [duration, setDuration] = useState(0)
    const [error, setError] = useState(null)

    const calculateAndSetDuration = () => {
        let newDuration = hours * 3600 + minutes * 60
        if (newDuration < 300) {
            setDuration(null)
            setError("Duration is too low!")
            setMinutes(5)
        }
        else if (newDuration > 86340) {
            setDuration(null)
            setError("Duration is too high!")
            setHours(23)
            setMinutes(59)
        } 
        else {
            setDuration(newDuration)
            setError(null)
        }
        
    }
    return (
        <div className={styles.restrictUserWrapper}>

            <div className={styles.section}>
                <h3>Type</h3>
                <select id={resource?._id} className={styles.restrictionSelector}>
                    {restrictUserArray[0] && <option value="level-1">Restriction Level 1</option>}
                    {restrictUserArray[1] && <option value="level-2">Restriction Level 2</option>}
                    {restrictUserArray[2] && <option value="level-3">Restriction Level 3</option>}
                </select>
            </div>

            <div className={styles.section}>
                <h3>Time</h3>
                <input type="number" className={styles.timeInput} id="numOfHours" placeholder='HH' min={0} max={23} value={hours} onChange={(e) => setHours(e.target.value)}/>
                <label htmlFor="numOfHours">Hours</label>
                <input type="number" className={styles.timeInput} id="numOfMinutes" placeholder='MM'min={0} max={59} value={minutes} onChange={(e) => setMinutes(e.target.value)}/>
                <label htmlFor="numOfMinutes">Minutes</label>
            </div>
            
            <div className={styles.section}>
                <h3>Reason</h3>
                <textarea className={styles.reasonTextArea} placeholder='I restricted this user because...' value={reason}  onChange={e => setReason(e.target.value)}/>
            </div>

            <div  className={styles.continueBtn}>
                <Button variant="destructive" onClick={calculateAndSetDuration}>Continue</Button>
            </div>
        </div>
    )
}