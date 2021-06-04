import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: new Object(), // information globale sur le user
    progression: new Array(), // progression générale
    chapterProgression: new Array(), // progression chapitre en % pour chaque année
    yearProgression: new Array(), // progression année en %
    connect: false, // état de la connection du user
    token: "", //token de l'utilsateur
    userType: new Number(),
  },
  mutations: {
    entrainementValide(state, payload) {
      state.progression[payload.year - 1].chapter[payload.chapter].entrainement[
        payload.level
      ] = true;
    },
    entrainementValidePartition(state, payload) {
      state.progression[payload.year - 1].chapter.partition[
        payload.chapter
      ].entrainement[0] = true;
    },
    quizValide(state, payload) {
      state.progression[payload.year - 1].chapter[payload.chapter].quiz = true;
    },
    createUser(state, payload) {
      state.user = payload;
    },
    create_progression(state, payload) {
      state.progression = payload;
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
    modifyQuizFinalPartition(state, payload) {
      state.progression[payload.year - 1].chapter.partition.quiz = true;
    },
    modifyQuizPartition(state, payload) {
      state.progression[payload.year - 1].chapter.partition[
        payload.chapter
      ].quiz = true;
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
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    SET_TOKEN(context, token) {
      context.commit("setToken", token);
    },
    //payload : year , chapter, level
    ENTRAINEMENT_VALIDE(context, payload) {
      console.log(payload);
      if (payload.score > 0.75) {
        context.commit("entrainementValide", payload);
      }

      let total = 0;
      let nbTrue = 0;
      var bodyFormData = new FormData();
      bodyFormData.append("mgq_id", payload.id);
      bodyFormData.append("level", payload.level);
      bodyFormData.append("score", payload.score);
      if (payload.score > 0.75) {
        bodyFormData.append("evaluated", 1);
      } else {
        bodyFormData.append("evaluated", 0);
        console.log(`entrainement ${payload.id} : pas réussi`);
      }
      axios({
        method: "post",
        url: "http://api.diesy.fr/api/mgq",
        data: bodyFormData,
        headers: { Authorization: `Bearer ${context.state.token}` },
      })
        .then((res) => console.log(res.data))
        .catch((e) => console.log("error update : " + e));

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
    //payload : year,chapter
    ENTRAINEMENT_VALIDE_PARTITION(context, payload) {
      var bodyFormData = new FormData();
      bodyFormData.append("score", payload.score);

      bodyFormData.append("level", 1);
      if (payload.chapter == "nuance") {
        bodyFormData.append("mgq_id", 3);
      } else {
        bodyFormData.append("mgq_id", 1);
      }
      if (payload.validate) {
        bodyFormData.append("evaluated", 1);
      } else {
        bodyFormData.append("evaluated", 0);
      }
      axios({
        method: "post",
        url: "http://api.diesy.fr/api/mgq",
        headers: { Authorization: `Bearer ${context.state.token}` },
        data: bodyFormData,
      }).catch((e) => console.log("error update entrainement: " + e));
      context.commit("entrainementValidePartition", payload);
      let total = 5;
      let nbTrue = 0;

      if (
        context.state.progression[payload.year - 1].chapter.partition.nuance
          .entrainement[0]
      ) {
        nbTrue++;
      }
      if (
        context.state.progression[payload.year - 1].chapter.partition.nuance
          .quiz
      ) {
        nbTrue++;
      }
      if (
        context.state.progression[payload.year - 1].chapter.partition.structure
          .entrainement[0]
      ) {
        nbTrue++;
      }
      if (
        context.state.progression[payload.year - 1].chapter.partition.structure
          .quiz
      ) {
        nbTrue++;
      }
      if (context.state.progression[payload.year - 1].chapter.partition.quiz) {
        nbTrue++;
      }
      context.commit("modifyChapterProgression", {
        year: payload.year,
        chapter: "partition",
        progression: Math.round((nbTrue * 100) / total),
      });
      context.dispatch("CALCUL_YEAR_PROGRESSION");
    },

    //payload : quizFinal, year, chapter
    QUIZ_VALIDE_PARTITION(context, payload) {
      var bodyFormData = new FormData();
      if (payload.quizFinal) {
        context.commit("modifyQuizFinalPartition", payload);

        bodyFormData.append("mgq_id", 5);
        bodyFormData.append("score", payload.score);
        bodyFormData.append("evaluated", 1);
        axios({
          method: "post",
          url: "http://api.diesy.fr/api/mgq",
          headers: { Authorization: `Bearer ${context.state.token}` },
          data: bodyFormData,
        }).catch((e) => console.log("error update : " + e));
      } else {
        bodyFormData.append("score", 1);
        bodyFormData.append("evaluated", 1);
        context.commit("modifyQuizPartition", payload);
        if (payload.chapter == "nuance") {
          bodyFormData.append("mgq_id", 4);
        } else {
          bodyFormData.append("mgq_id", 2);
        }
        axios({
          method: "post",
          url: "http://api.diesy.fr/api/mgq",
          headers: { Authorization: `Bearer ${context.state.token}` },
          data: bodyFormData,
        }).catch((e) => console.log("error update : " + e));
      }
      let total = 5;
      let nbTrue = 0;
      if (
        context.state.progression[payload.year - 1].chapter.partition.nuance
          .entrainement[0]
      ) {
        nbTrue++;
      }
      if (
        context.state.progression[payload.year - 1].chapter.partition.nuance
          .quiz
      ) {
        nbTrue++;
      }
      if (
        context.state.progression[payload.year - 1].chapter.partition.structure
          .entrainement[0]
      ) {
        nbTrue++;
      }
      if (
        context.state.progression[payload.year - 1].chapter.partition.structure
          .quiz
      ) {
        nbTrue++;
      }
      if (context.state.progression[payload.year - 1].chapter.partition.quiz) {
        nbTrue++;
      }
      context.commit("modifyChapterProgression", {
        year: payload.year,
        chapter: "partition",
        progression: Math.round((nbTrue * 100) / total),
      });
      context.dispatch("CALCUL_YEAR_PROGRESSION");
    },
    QUIZ_VALIDE(context, payload) {
      var bodyFormData = new FormData();
      bodyFormData.append("mgq_id", payload.id);
      bodyFormData.append("score", payload.score);
      bodyFormData.append("evaluated", 1);
      axios({
        method: "post",
        url: "http://api.diesy.fr/api/mgq",
        headers: { Authorization: `Bearer ${context.state.token}` },
        data: bodyFormData,
      }).catch((e) => console.log("error update : " + e));
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
      let progression = [context.state.user.progression, {}, {}];
      context.commit("create_progression", progression);
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
      axios({
        method: "post",
        url: "http://api.diesy.fr/api/logout",
        headers: { Authorization: `Bearer ${context.state.token}` },
      })
        .then(() => console.log("disconnect"))
        .catch((e) => console.log("error on disonnect : " + e));
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
