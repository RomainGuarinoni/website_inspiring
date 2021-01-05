import Vue from "vue";
import VueRouter from "vue-router";
import Connect from "../components/Connect";
import yearselect from "../components/YearSelect";
import travaux from "../components/Travaux";
import menu from "../components/Menu";
import Partition from "../components/Partition";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Connect",
    component: Connect,
  },
  {
    path: "/yearselect",
    name: "yearselect",
    component: yearselect,
  },
  {
    path: "/menu/annee-:year",
    name: "year",
    component: menu,
    props: true,
  },
  {
    path: "/annee-:year/lire-une-partition",
    component: Partition,
    name: "Note",
    props: true,
  },
  {
    path: "/menu/inwork",
    name: "yearundefined",
    component: travaux,
  },
  {
    path: "/travaux",
    name: "travaux",
    component: travaux,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
