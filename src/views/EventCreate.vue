<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        :selected="option === value"
      />

      <h3>Name & describe your event</h3>
      <BaseInput
        type="text"
        label="Title"
        v-model="event.title"
        placeholder="Title"
        class="field"
      />

      <BaseInput
        type="text"
        label="Description"
        v-model="event.description"
        placeholder="Description"
        class="field"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        type="text"
        label="Location"
        v-model="event.location"
        placeholder="Location"
        class="field"
      />

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        :selected="option === value"
        class="field"
      />

      <BaseButton type="submit" class="button -fill-gradient">
        Submit
      </BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";

export default {
  components: {
    Datepicker,
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      event: this.createFreshEventObject(),
      times,
      categories: this.$store.state.categories,
    };
  },
  methods: {
    createEvent() {
      NProgress.start();
      this.$store
        .dispatch("event/createEvent", this.event)
        .then(() => {
          this.$router.push({
            name: "event-list",
          });
          this.event = this.createFreshEventObject();
        })
        .catch(() => {
          NProgress.done();
        });
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);
      return {
        id,
        user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: [],
      };
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
