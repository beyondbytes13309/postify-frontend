import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import AuthForm from "../components/auth/AuthForm";

import styles from './styles/AuthPage.module.css'

export default function AuthPage() {
    const [method, setMethod] = useState('signup');

    const toggleMethod = () =>
        setMethod((prevMethod) => (prevMethod === 'signup' ? 'signin' : 'signup'));

    // Animation variants for sliding from left
    const cardVariants = {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    };

    return (
        <div className={styles.mainDiv}>
            <AnimatePresence mode="wait">
                <motion.div className={styles.authFormDiv}
                    key={method}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    
                >
                    <AuthForm className={styles.authForm} type={method} toggleMethod={toggleMethod} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
