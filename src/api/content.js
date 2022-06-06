import axios from './axios-instance';

const getContentsByCourseApi = (id, config) => axios.get(`/courses/content?courseId=${id}`, config);
const saveContentByCourseApi = (data, config) => axios.post(`/courses/content`, data, config);

export { getContentsByCourseApi, saveContentByCourseApi };
