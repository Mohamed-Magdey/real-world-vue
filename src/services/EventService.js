import axios from "axios";
import NProgress from "nprogress";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((res) => {
  NProgress.start();
  return res;
});

apiClient.interceptors.response.use((config) => {
  NProgress.done();
  return config;
});

export default {
  getEvent(perPage, page) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`);
  },
  postEvent(event) {
    return apiClient.post("/events", event);
  },
};
