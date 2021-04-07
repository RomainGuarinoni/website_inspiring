import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: new Object(),
    progression: new Array(),
    chapterProgression: new Array(),
    yearProgression: new Array(),
    connect: false,
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
    modifyChapterProgression(state, payload) {
      state.chapterProgression[payload.year - 1][payload.chapter] =
        payload.progression;
    },
    calculYearProgression(state, payload) {
      state.yearProgression = payload;
    },
    disconnect(state) {
      state.connect = false;
      state.user = new Object();
      state.progression = new Object();
      state.yearProgression = new Object();
      state.chapterProgression = new Object();
    },
  },
  actions: {
    ENTRAINEMENT_VALIDE(context, payload) {
      context.commit("entrainementValide", payload);
      // envoyer a hugo les valeurs !!
      let total = 0;
      let nbTrue = 0;

      //recompte le nombre d'entraienement et de quizz validé sur le nombre de total en tout
      context.state.progression[payload.year - 1].chapter[
        payload.chapter
      ].entrainement.forEach((element) => {
        if (element) {
          nbTrue++;
        }
        total++;
      });

      // si le chapitre contient un quizz, le compter en plus
      if (
        "quiz" in
        context.state.progression[payload.year - 1].chapter[payload.chapter]
      ) {
        if (
          context.state.progression[payload.year - 1].chapter[payload.chapter]
            .quiz
        ) {
          nbTrue++;
        }
        total++;
      }

      // changer les pourcentages chapitres et année
      context.commit("modifyChapterProgression", {
        year: payload.year,
        chapter: payload.chapter,
        progression: Math.round((nbTrue * 100) / total),
      });
      context.dispatch("CALCUL_YEAR_PROGRESSION");
    },
    QUIZ_VALIDE(context, payload) {
      context.commit("quizValide", payload);
      // envoyer a hugo les valeurs !!
      let total = 0;
      let nbTrue = 0;
      context.state.progression[payload.year - 1].chapter[
        payload.chapter
      ].entrainement.forEach((element) => {
        if (element) {
          nbTrue++;
        }
        total++;
      });

      if (
        context.state.progression[payload.year - 1].chapter[payload.chapter]
          .quiz
      ) {
        nbTrue++;
      }
      total++;
      context.commit("modifyChapterProgression", {
        year: payload.year,
        chapter: payload.chapter,
        progression: Math.round((nbTrue * 100) / total),
      });
      context.dispatch("CALCUL_YEAR_PROGRESSION");
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
    CALCUL_YEAR_PROGRESSION(context) {
      let yearProgression = [];
      context.state.chapterProgression.forEach((annee) => {
        let total = 0;
        let sum = 0;
        if (Object.keys(annee).length > 0) {
          for (const value in annee) {
            total++;
            sum += annee[value];
          }
          yearProgression.push(Math.round(sum / total));
        } else {
          yearProgression.push(0);
        }
      });
      context.commit("calculYearProgression", yearProgression);
    },
    DISCONNECT(context) {
      context.commit("disconnect");
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
});
