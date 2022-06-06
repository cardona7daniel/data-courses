import axios from './axios-instance';

const getTeachersApi = (config) => axios.get('/users/teachers', config);

export { getTeachersApi };
