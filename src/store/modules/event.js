import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  totalEvents: 0,
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_TOTAl(state, total) {
    state.totalEvents = total;
  },
};

export const actions = {
  createEvent({ commit }, event) {
    return EventService.postEvent(event).then(() => {
      commit("ADD_EVENT", event);
    });
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvent(perPage, page)
      .then((response) => {
        commit("SET_TOTAl", response.headers["x-total-count"]);
        commit("SET_EVENTS", response.data);
      })
      .catch((e) => {
        console.log("Error: " + e);
      });
  },
};
