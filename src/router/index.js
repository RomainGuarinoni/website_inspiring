import Vue from "vue";
import VueRouter from "vue-router";
import Connect from "../components/Connect";
import yearselect from "../components/YearSelect";
import travaux from "../components/Travaux";
import menu from "../components/Menu";
import Partition from "../components/Partition";
import Note from "../components/Note";
import Rythme from "../components/Rythme";
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
    name: "partition",
    props: true,
  },
  {
    path: "/annee-:year/lire-les-notes",
    component: Note,
    name: "note",
    props: true,
  },
  {
    path: "/anne-:year/ameliore-ton-rythme",
    component: Rythme,
    name: "rythme",
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
