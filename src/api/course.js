import axios from './axios-instance';

const getCoursesByUserApi = (id, config) => axios.get(`/courses/coursesByUser?userId=${id}`, config);

export { getCoursesByUserApi };
