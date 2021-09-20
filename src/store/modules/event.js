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
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);

        const notification = {
          type: "success",
          message: "Your event has been created!",
        };

        dispatch("notification/add", notification, { root: true });
      })
      .catch((e) => {
        const notification = {
          type: "error",
          message: `There was a problem creating your event: ${e.message}`,
        };

        dispatch("notification/add", notification, { root: true });
        throw e;
      });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvent(perPage, page)
      .then((response) => {
        commit("SET_TOTAl", response.headers["x-total-count"]);
        commit("SET_EVENTS", response.data);
      })
      .catch((e) => {
        const notification = {
          type: "error",
          message: `There was a problem fetching events: ${e.message}`,
        };

        dispatch("notification/add", notification, { root: true });
      });
  },
};
