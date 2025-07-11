const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000"

const API = {
    AUTH: {
        loginLocal: `${BASE_URL}/auth/login`,
        registerLocal: `${BASE_URL}/auth/register`,
        googleAuth: `${BASE_URL}/auth/google`,
        githubAuth: `${BASE_URL}/auth/github`
    },
    USER: {
        uploadPfp: `${BASE_URL}/user/uploadPfp`,
        editUser: `${BASE_URL}/user/editUser`
    }
}

export default API