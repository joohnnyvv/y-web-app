export const apiUrl = process.env.REACT_APP_API_URL;
export const wsUrl = process.env.REACT_APP_WS_URL;

export const ApiPaths = {
    USER: { USER: '/user', REGISTER: 'user/register', LOGIN: 'user/login'},
    POSTS: {ALL_POSTS: '/posts/all', POSTS: '/posts', LIKE: '/posts/like'},
    COMMENTS: {COMMENTS: '/comments', LIKE: '/comments/like'}
}