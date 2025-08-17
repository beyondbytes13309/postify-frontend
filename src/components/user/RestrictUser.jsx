import styles from '../styles/RestrictUser.module.css'
import Button from '../common/Button'

export default function RestrictUser({restrictUserArray, resource, setShowRestrictUserMenu}) {
    return (
        <div className={styles.restrictUserWrapper}>

            <select id={resource?._id}>
                {restrictUserArray[0] && <option value="level-1">Restrict Level 1</option>}
                {restrictUserArray[1] && <option value="level-2">Restrict Level 2</option>}
                {restrictUserArray[2] && <option value="level-3">Restrict Level 3</option>}
            </select> <br />

            <input type="number" placeholder='HH' min={0} max={23}/>
            <input type="number" placeholder='MM'min={0} max={59}/> <br />
            
            <input type="text" defaultValue='I restricted this user because...'/> <br />

            <button onClick={() => setShowRestrictUserMenu(prev => !prev)}>Go</button>
        </div>
    )
}