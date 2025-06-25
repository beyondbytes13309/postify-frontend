import { useState } from "react";
import AuthForm from "../components/auth/AuthForm";

export default function AuthPage() {
    const [method, setMethod] = useState('signup')

    const toggleMethod = () => setMethod(prevMethod => prevMethod ==='signup' ? 'signin' : 'signup')


    return (
        <>
            <AuthForm type={method} toggleMethod={toggleMethod}/>
        </>
    )
}