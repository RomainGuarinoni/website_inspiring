import Vue from "vue";
import VueRouter from "vue-router";
import Connect from "../components/Connect";
import yearselect from "../components/YearSelect";
import travaux from "../components/Travaux";
import menu from "../components/Menu";
import Partition from "../components/Partition";
import Note from "../components/Note";
import Rythme from "../components/Rythme";
import CoursPartitionNuance from "../components/CoursPartitionNuance";
import Nuance1 from "../components/Nuance1";
import Nuance2 from "../components/Nuance2";
import Nuance3 from "../components/Nuance3";
import Nuance4 from "../components/Nuance4";
import Nuance5 from "../components/Nuance5";
import Nuance6 from "../components/Nuance6";
import Nuance7 from "../components/Nuance7";
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
  {
    path: "/anne-:year/cours-les-nuances",
    name: "CoursPartitionNuance",
    component: CoursPartitionNuance,
    props: true,
    children: [
      {
        path: "",
        name: "Nuance1",
        component: Nuance1,
      },
      {
        path: "page-2",
        name: "Nuance2",
        component: Nuance2,
      },
      {
        path: "page-3",
        name: "Nuance3",
        component: Nuance3,
      },
      {
        path: "page-4",
        name: "Nuance4",
        component: Nuance4,
      },
      {
        path: "page-5",
        name: "Nuance5",
        component: Nuance5,
      },
      {
        path: "page-6",
        name: "Nuance6",
        component: Nuance6,
      },
      {
        path: "page-7",
        name: "Nuance7",
        component: Nuance7,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
