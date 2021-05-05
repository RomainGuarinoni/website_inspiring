import Vue from "vue";
import store from "../store/index";
import VueRouter from "vue-router";
import Connect from "../components/Connect";
import yearselect from "../components/YearSelect";
import travaux from "../components/Travaux";
import menu from "../components/Menu";
import Partition from "../components/Partition";
import Note from "../components/Note";
import Rythme from "../components/Rythme";
import CoursPartitionNuance from "../components/CoursPartitionNuance";
import CoursPartitionNote from "../components/CoursPartitionNote";
import Nuance1 from "../components/Nuance1";
import Nuance2 from "../components/Nuance2";
import Nuance3 from "../components/Nuance3";
import Nuance4 from "../components/Nuance4";
import Nuance5 from "../components/Nuance5";
import Nuance6 from "../components/Nuance6";
import Nuance7 from "../components/Nuance7";
import Note1 from "../components/Note1";
import Note2 from "../components/Note2";
import Note3 from "../components/Note3";
import Note4 from "../components/Note4";
import Note5 from "../components/Note5";
import Note6 from "../components/Note6";
import Note7 from "../components/Note7";
import Note8 from "../components/Note8";
import Note9 from "../components/Note9";
import Rythme1 from "../components/Rythme1";
import Rythme2 from "../components/Rythme2";
import Rythme3 from "../components/Rythme3";
import Rythme4 from "../components/Rythme4";
import Rythme5 from "../components/Rythme5";
import Rythme6 from "../components/Rythme6";
import Rythme7 from "../components/Rythme7";
import Rythme8 from "../components/Rythme8";
import Rythme9 from "../components/Rythme9";
import NoteRevision from "../components/Note-revision";
import Instruments from "../components/Instruments";
import ItemInstruments from "../components/ItemInstruments";
import CoursInstrumentsHome from "../components/Cours-instrument-home";
import CoursInstrumentsCorde from "../components/Cours-instruments-cordes";
import coursInstrumentsVent from "../components/cours-instruments-vent";
import coursInstrumentsPercussion from "../components/Cours-instruments-percussion";
import coursPartitionRythme from "../components/coursPartitionRythme";
import PartitionQuiz from "../components/PartitionQuiz";
import CoursStructure from "../components/CoursStructure";
import Structure1 from "../components/Structure1";
import Structure2 from "../components/Structure2";
import Structure3 from "../components/Structure3";
import Structure4 from "../components/Structure4";
import Structure5 from "../components/Structure5";
import Structure7 from "../components/Structure7";
import Structure8 from "../components/Structure8";
import Structure9 from "../components/Structure9";
import Structure10 from "../components/Structure10";
import Structure11 from "../components/Structure11";
import Structure12 from "../components/Structure12";
import Structure13 from "../components/Structure13";
import Structure14 from "../components/Structure14";
import Structure15 from "../components/Structure15";
import Structure16 from "../components/Structure16";
import Structure17 from "../components/Structure17";
import Structure18 from "../components/Structure18";
import Structure19 from "../components/Structure19";
import Structure6 from "../components/Structure6";
import PartitionRevision from "../components/PartitionRevision";
import Admin from "../components/Admin";
import profil from "../components/Profil";
import Credit from "../components/Credit";
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
    path: "/annee-:year/lire-une-partition/quiz",
    component: PartitionQuiz,
    name: "partitionQuiz",
    props: true,
  },
  {
    path: "/annee-:year/fiche-revision-rythme",
    component: PartitionRevision,
    name: "Partition-revision",
    props: true,
  },
  {
    path: "/annee-:year/lire-les-notes",
    component: Note,
    name: "note",
    props: true,
  },
  {
    path: "/annee-:year/ameliore-ton-rythme",
    component: Rythme,
    name: "rythme",
    props: true,
  },
  {
    path: "/annee-:year/ecoute-les-instruments",
    component: Instruments,
    name: "instruments",
    props: true,
  },
  {
    path: "/annee-:year/ecoute-les-instruments/description",
    component: ItemInstruments,
    name: "ItemInstruments",
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
    path: "/annee-:year/cours-les-nuances",
    component: CoursPartitionNuance,
    props: true,
    children: [
      {
        path: "page-1",
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
  {
    path: "/annee-:year/cours-les-notes",
    component: CoursPartitionNote,
    props: true,
    children: [
      {
        path: "page-1",
        name: "Note1",
        component: Note1,
      },
      {
        path: "page-2",
        name: "Note2",
        component: Note2,
      },
      {
        path: "page-3",
        name: "Note3",
        component: Note3,
      },
      {
        path: "page-4",
        name: "Note4",
        component: Note4,
      },
      {
        path: "page-5",
        name: "Note5",
        component: Note5,
      },
      {
        path: "page-6",
        name: "Note6",
        component: Note6,
      },
      {
        path: "page-7",
        name: "Note7",
        component: Note7,
      },
      {
        path: "page-8",
        name: "Note8",
        component: Note8,
      },
      {
        path: "page-9",
        name: "Note9",
        component: Note9,
      },
    ],
  },
  {
    path: "/annee-:year/cours-le-rythme",
    name: "CoursPartitionRythme",
    component: coursPartitionRythme,
    props: true,
    children: [
      {
        path: "page-2",
        name: "Rythme1",
        component: Rythme1,
      },
      {
        path: "page-2",
        name: "rythme2",
        component: Rythme2,
      },
      {
        path: "page-3",
        name: "rythme3",
        component: Rythme3,
      },
      {
        path: "page-4",
        name: "rythme4",
        component: Rythme4,
      },
      {
        path: "page-5",
        name: "rythme5",
        component: Rythme5,
      },
      {
        path: "page-6",
        name: "rythme6",
        component: Rythme6,
      },
      {
        path: "page-7",
        name: "rythme7",
        component: Rythme7,
      },
      {
        path: "page-8",
        name: "rythme8",
        component: Rythme8,
      },
      {
        path: "page-9",
        name: "rythme9",
        component: Rythme9,
      },
    ],
  },
  {
    path: "/annee-:year/structure-d-une-partition",
    component: CoursStructure,
    props: true,
    children: [
      {
        path: "page-1",
        component: Structure1,
        name: "structure1",
      },
      {
        path: "page-2",
        component: Structure2,
        name: "structure2",
      },
      {
        path: "page-3",
        component: Structure3,
        name: "structure3",
      },
      {
        path: "page-4",
        component: Structure4,
        name: "structure4",
      },
      {
        path: "page-5",
        component: Structure5,
        name: "structure5",
      },
      {
        path: "page-6",
        component: Structure6,
        name: "structure6",
      },
      {
        path: "page-7",
        component: Structure7,
        name: "structure7",
      },
      {
        path: "page-8",
        component: Structure8,
        name: "structure8",
      },
      {
        path: "page-9",
        component: Structure9,
        name: "structure9",
      },
      {
        path: "page-10",
        component: Structure10,
        name: "structure10",
      },
      {
        path: "page-11",
        component: Structure11,
        name: "structure11",
      },
      {
        path: "page-12",
        component: Structure12,
        name: "structure12",
      },
      {
        path: "page-13",
        component: Structure13,
        name: "structure13",
      },
      {
        path: "page-14",
        component: Structure14,
        name: "structure14",
      },
      {
        path: "page-15",
        component: Structure15,
        name: "structure15",
      },
      {
        path: "page-16",
        component: Structure16,
        name: "structure16",
      },
      {
        path: "page-17",
        component: Structure17,
        name: "structure17",
      },
      {
        path: "page-18",
        component: Structure18,
        name: "structure18",
      },
      {
        path: "page-19",
        component: Structure19,
        name: "structure19",
      },
    ],
  },
  {
    path: "/annee-:year/lire-les-notes/fiche-de-revision",
    name: "Note-revision",
    component: NoteRevision,
    props: true,
  },
  {
    path: "/annee-:year/cours-instruments-home",
    name: "cours-instruments-home",
    component: CoursInstrumentsHome,
    props: true,
  },
  {
    path: "/annee-:year/cours-instruments-corde",
    name: "cours-instruments-corde",
    component: CoursInstrumentsCorde,
    props: true,
  },
  {
    path: "/annee-:year/cours-instruments-vent",
    name: "cours-instruments-vent",
    component: coursInstrumentsVent,
    props: true,
  },
  {
    path: "/annee-:year/cours-instruments-percussion",
    name: "cours-instruments-percussion",
    component: coursInstrumentsPercussion,
    props: true,
  },
  {
    path: "/Admin",
    component: Admin,
    name: "admin",
  },
  {
    path: "/profil",
    component: profil,
    name: "changeMDP",
  },
  {
    path: "/credit",
    name: "credit",
    component: Credit,
  },
];

const router = new VueRouter({
  routes,
});

//vérifier avant chaque rtouter si le user est connecté sinon on le redirect à la page connect
router.beforeEach((to, from, next) => {
  if (store.state.connect || to.path == "/credit") {
    next();
  } else {
    if (to.path !== "/") {
      next({ name: "Connect" });
    } else {
      next();
    }
  }
});
export default router;
