import { Outlet } from "react-router-dom";
import Header from '../components/common/Header'
import styles from './styles/RootLayout.module.css'

export default function RootLayout() {
    return (
        <>
            <Header showOptions={{search: true, home: true, profile: true, create: true}}/>
            <Outlet className={styles.outlet}/>
        </>
    )
}