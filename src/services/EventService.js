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
  getEvent() {
    return apiClient.get("/events");
  },
  postEvent(event) {
    return apiClient.post("/events", event);
  },
};
