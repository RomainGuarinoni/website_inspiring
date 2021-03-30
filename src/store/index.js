import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    progression: [
      {
        year: 20,
        chapter: {
          note: {
            progression: 100,
            entrainement: [true, true, true, true, true, false],
            quiz: false,
          },
          rythme: {
            progression: 25,
            entrainement: [true, true, true],
            quiz: false,
          },
          partition: {
            progression: 55,
            quiz: false,
          },
          instrument: {
            progression: 100,
            quiz: true,
          },
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
  mutations: {
    entrainementValide(state, payload) {
      state.progression[payload.year - 1].chapter[payload.chapter].entrainement[
        payload.level
      ] = true;
    },
    quizValide(state, payload) {
      state.progression[payload.year - 1].chapter[payload.chapter].quiz = true;
    },
  },
  actions: {
    ENTRAINEMENT_VALIDE(context, payload) {
      context.commit("entrainementValide", payload);
      // envoyer a hugo les valeurs !!
    },
    QUIZ_VALIDE(context, payload) {
      context.commit("quizValide", payload);
      // envoyer a hugo les valeurs !!
    },
  },
  modules: {},
});
