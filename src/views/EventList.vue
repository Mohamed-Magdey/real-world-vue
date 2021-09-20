<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page
      </router-link>
      |
    </template>
    <template v-if="lastPage > 0">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
      >
        Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    EventCard,
  },
  created() {
    this.fetchEvents({
      perPage: 3,
      page: this.page,
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    lastPage() {
      return this.event.totalEvents - 3 * this.page;
    },
    ...mapState(["event", "user"]),
  },
  methods: mapActions("event", ["fetchEvents"]),
};
</script>
