import axios from './axios-instance';

const loginUserApi = user => axios.post('/auth', user);

export { loginUserApi };
