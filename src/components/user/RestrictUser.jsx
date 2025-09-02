import styles from '../styles/RestrictUser.module.css'
import Button from '../common/Button'
import { useEffect, useState } from 'react'
import { useSafeFetch } from '../../hooks/useSafeFetch'
import API from '../../../apiRoutes'


const commonDurations = {
    '5m': 300,
    '15m': 900,
    '30m': 1800,
    '1h': 3600,
    '6h': 21600,
    '24h': 86400,
    'Custom': null
}

export default function RestrictUser({restrictUserArray, resource, setShowRestrictUserMenu, setModalVisibility, modalUpdater}) {
    const [minutes, setMinutes] = useState(5)
    const [hours, setHours] = useState(0)
    const [reason, setReason] = useState('')
    const [chosenDuration, setChosenDuration] = useState(null)
    const [selectedType, setSelectedType] = useState('level-1')
    const [duration, setDuration] = useState(0)
    const [stage, setStage] = useState(0)
    const [url, setUrl] = useState(null)
    const [options, setOptions] = useState(null)
    const { data, error, loading, abort } = useSafeFetch(url, options)


    const handleContinue = () => {
        modalUpdater({
            variant: 'alert',
            title: 'Error',
            setButtonClick: null
        })

        // first we will do checks

        // first the restriction type
        if (!selectedType) {
            modalUpdater({
                text: "You didn't choose a restriction type!"
            })
            return setModalVisibility(true)
        }

        // now the duration
        let newDuration = 0

        if (!chosenDuration) {
            modalUpdater({
                text: "You didn't choose a duration!"
            })
            return setModalVisibility(true)
        } 

        if (chosenDuration != 'Custom') {
            newDuration = commonDurations[chosenDuration]
        } else {
            newDuration = hours * 3600 + minutes * 60 // if it is custom
        }

        if (newDuration < 300) {
            modalUpdater({
                text: "Duration is too low!"
            })
            setModalVisibility(true)
            setMinutes(5)
            return
        }
        else if (newDuration > 86400) {
            modalUpdater({
                text: "Duration is too high!"
            })
            setModalVisibility(true)
            setHours(23)
            setMinutes(59)
            return
        } 

        setDuration(newDuration)

        if (!reason) {
            modalUpdater({
                text: "You didn't write a reason!"
            })
            return setModalVisibility(true)
        }

        if (reason.length > 50) {
            modalUpdater({
                text: "Reason length cannot exceed 50 characters!"
            })
            return setModalVisibility(true)
        }
        
        setStage(1)
    }

    const finalContinue = () => {
        setOptions({ method: 'PATCH', credentials: 'include'})
        const url = `${API.USER.restrictUser}/${resource?._id}?type=${selectedType}&duration=${duration}&reason=${reason}`
        setUrl(url)
    }

    useEffect(() => {
        if (data?.code == '001') {
            modalUpdater({
                title: 'Error',
                text: data.data,
            })
            setModalVisibility(true)
        } else if (data?.code == '038') {
            modalUpdater({
                title: 'Success',
                text: data.data,
                variant: 'alert'
            })
            setModalVisibility(true)
            setShowRestrictUserMenu(false)
        } else if (data?.code == '040') {
            modalUpdater({
                title: 'Error',
                text: data.data,
            })
            setModalVisibility(true)
        } else if (data?.code == '042') {
            modalUpdater({
                title: 'Error',
                text: data.data,
            })
            setModalVisibility(true)
        } else if (data?.code == '043') {
            modalUpdater({
                title: 'Error',
                text: data.data,
            })
            setModalVisibility(true)
        } else if (data?.code == '550') {
            modalUpdater({
                title: 'Error',
                text: data.data,
            })
            setModalVisibility(true)
        }

    }, [data])

    if (stage==0) {
        return (
            <div className={styles.restrictUserOverlay}>
                <div className={styles.restrictUserWrapper}>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>Restriction Type</h2>
                        <select id={resource?._id} className={styles.restrictionSelector} value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                            {restrictUserArray[0] && <option value="level-1">Restriction Level 1</option>}
                            {restrictUserArray[1] && <option value="level-2">Restriction Level 2</option>}
                            {restrictUserArray[2] && <option value="level-3">Restriction Level 3</option>}
                        </select>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>Time</h2>
                        <div className={styles.presetsDiv}>
                            {Object.keys(commonDurations).map(dur => (
                                <button key={dur} className={`${styles.durationBtn} ${chosenDuration==dur ? styles.selectedDuration : ''}`} onClick={() => setChosenDuration(dur)}>{dur}</button>
                            ))}
                        </div>
                        {chosenDuration=='Custom' && (
                            <div className={styles.customDuration}>
                                <input type="number" className={styles.timeInput} id="numOfHours" placeholder='HH' min={0} max={23} value={hours} onChange={(e) => setHours(e.target.value)}/>
                                <label htmlFor="numOfHours" className={styles.timeLabel}>Hours</label>
                                <input type="number" className={styles.timeInput} id="numOfMinutes" placeholder='MM'min={0} max={59} value={minutes} onChange={(e) => setMinutes(e.target.value)}/>
                                <label htmlFor="numOfMinutes" className={styles.timeLabel}>Minutes</label>
                            </div>
                        )}
                    </div>
                    
                    <div className={styles.section}>
                        <h2 className={styles.heading}>Reason</h2>
                        <div className={styles.textAreaWrapper}>
                            <textarea className={styles.reasonTextArea} placeholder='I restricted this user because...' value={reason}  onChange={e => setReason(e.target.value)}/>
                            <p className={`${styles.charactersLeft} ${50-reason.length<0 ? styles.reasonLimitExceed : ''}`}>{`${50-reason.length} characters left`}</p>
                        </div>
                    </div>

                    <div  className={styles.continueBtn}>
                        <Button variant="secondary" onClick={() => setShowRestrictUserMenu(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleContinue}>Continue</Button>
                    </div>
                </div>
            </div>
        )
    }

    if (stage==1) {
        return (
            <div className={styles.restrictUserOverlay}>
                <div className={styles.restrictUserWrapper}>
                    <div className={styles.section}>
                        <h2 className={styles.confirmationHeading}>Confirmation</h2>
                        <p className={styles.confirmationMessage}>Are you sure you want to restrict user "{resource?.username}" with a {selectedType} restriction for {chosenDuration!='Custom'?chosenDuration : `${hours} hours & ${minutes} minutes?`}?</p>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <Button variant="secondary" onClick={() =>  setStage(0)}>Back</Button>
                        <Button variant="destructive" onClick={finalContinue}>Yes</Button>
                    </div>
                    
                </div>
            </div>
            
        )
    }


}