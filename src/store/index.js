import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    progression: [
      {
        year: 90,
        chapter: {
          note: 75,
          rythme: 25,
          partition: 55,
          instrument: 100,
        },
      },
      {
        year: 50,
        chapter: {},
      },
      {
        year: 25,
        chapter: {},
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
