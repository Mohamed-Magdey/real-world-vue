import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvent(perPage, page) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`);
  },
  postEvent(event) {
    return apiClient.post("/events", event);
  },
};
