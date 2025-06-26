import { Outlet } from "react-router-dom";
import Header from '../components/common/Header'

export default function RootLayout() {
    return (
        <>
            <Header showOptions={{search: true, home: true, profile: true, create: true}}/>
            <Outlet />
        </>
    )
}