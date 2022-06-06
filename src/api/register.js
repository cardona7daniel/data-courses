import axios from './axios-instance';

const saveRegisterUserApi = user => axios.post('/users', { ...user });

export { saveRegisterUserApi };
