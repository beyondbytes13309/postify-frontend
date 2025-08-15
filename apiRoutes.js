const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const API = {
  AUTH: {
    loginLocal: `${BASE_URL}/auth/login`,
    registerLocal: `${BASE_URL}/auth/register`,
    googleAuth: `${BASE_URL}/auth/google`,
    githubAuth: `${BASE_URL}/auth/github`,
    logout: `${BASE_URL}/auth/logout`,
  },
  USER: {
    uploadPfp: `${BASE_URL}/user/uploadPfp`,
    editUser: `${BASE_URL}/user/editUser`,
    getUserData: `${BASE_URL}/user/getUserData`,
    getAnyUserData: `${BASE_URL}/user/getAnyUserData`
  },
  POST: {
    createPost: `${BASE_URL}/post/createPost`,
    getPosts: `${BASE_URL}/post/getPosts`,
    deletePost: `${BASE_URL}/post/deletePost`,
    getUserPosts: `${BASE_URL}/post/getUserPosts`,
    editPost: `${BASE_URL}/post/editPost`
  },
  REACTION: {
    makeReaction: `${BASE_URL}/reaction/makeReaction`,
    deleteReaction: `${BASE_URL}/reaction/deleteReaction`,
  },
  COMMENT: {
    makeComment: `${BASE_URL}/comment/createComment`,
    getComments: `${BASE_URL}/comment/getComments`,
    deleteComment: `${BASE_URL}/comment/deleteComment`,
    editComment: `${BASE_URL}/comment/editComment`
  },
};

export default API;
