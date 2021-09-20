import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import EventCreate from "../views/EventCreate.vue";
import NProgress from "nprogress";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true,
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true,
  },
  {
    path: "*",
    redirect: { name: "404", params: { resource: "page" } },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach((routeTo, routeFrom) => {
  NProgress.done();
});

export default router;
