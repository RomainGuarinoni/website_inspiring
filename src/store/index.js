import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: new Object(),
    progression: new Array(),
    chapterProgression: new Array(),
    yearProgression: new Array(),
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
    createUser(state, payload) {
      state.user = payload;
    },
    create_progression(state) {
      state.progression = state.user.progression;
    },
    createChapterProgression(state, payload) {
      state.chapterProgression = payload;
    },
    createYearProgression(state, payload) {
      state.yearProgression = payload;
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
    CREATE_USER(context, payload) {
      context.commit("createUser", payload);
      context.commit("create_progression");
    },
    CREATE_CHAPTER_PROGRESSION(context, payload) {
      context.commit("createChapterProgression", payload);
    },
    CREATE_YEAR_PROGRESSION(context, payload) {
      context.commit("createYearProgression", payload);
    },

    //fonction qui affiche dans la console toutes les valeurs du state ( pour debug)
    toString(context) {
      console.log(
        `user : ${JSON.stringify(
          context.state.user
        )}\n \nprogression : ${JSON.stringify(
          context.state.progression
        )}\n \nchapter progression : ${JSON.stringify(
          context.state.chapterProgression
        )}\n \nyear progression : ${context.state.yearprogression}`
      );
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) =>
        Cookies.set(key, state, { expires: 3, secure: true }),
    }),
  ],
});
