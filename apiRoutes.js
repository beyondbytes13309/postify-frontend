const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000"

const API = {
    AUTH: {
        loginLocal: `${BASE_URL}/auth/login`,
        registerLocal: `${BASE_URL}/auth/register`
    }
}

export default API