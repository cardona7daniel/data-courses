import axios from 'axios'

const config = {
  defaultTimeout: 20000,
  baseURL: process.env.REACT_APP_API || 'http://localhost:3001',
}

class AxiosCreate {
  http = null;

  constructor(config = {}) {
    if (!this.http) {
      this.http = axios.create(config);
    }
  }

  get instance() {
    return this.http;
  }
}

const axiosInstance = new AxiosCreate({
  timeout: config.defaultTimeout,
  baseURL: config.baseURL,
});

export default axiosInstance.instance;
