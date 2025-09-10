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
    editPfp: `${BASE_URL}/user/editPfp`,
    editSpecificPfp: `${BASE_URL}/user/editSpecificPfp`,
    editUser: `${BASE_URL}/user/editUser`,
    editSpecificUser: `${BASE_URL}/user/editSpecificUser`,
    getUserData: `${BASE_URL}/user/getUserData`,
    getAnyUserData: `${BASE_URL}/user/getAnyUserData`,
  },
  POST: {
    createPost: `${BASE_URL}/post/createPost`,
    getPosts: `${BASE_URL}/post/getPosts`,
    getRecommendedPosts: `${BASE_URL}/post/getRecommendedPosts`,
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
  ADMIN: {
    getAnyUserData: `${BASE_URL}/admin/getAnyUserData`,
    restrictUser: `${BASE_URL}/admin/restrictUser`
  }
};

export default API;
