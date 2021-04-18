<template>
  <div class="boxAll">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="box" v-if="menu">
      <h1 class="purple">Apprends à lire les notes</h1>
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour</p>
      </div>
      <div class="item solo" @click="goTo('Note1')">
        <p class="orange">Cours</p>
      </div>
      <div class="item chap">
        <p class="blue">S'entraîner</p>
        <div
          class="level"
          v-for="(item, index) in level"
          :key="index"
          @click="playGame(index)"
        >
          <div class="checkStatus green" v-if="checkLevel(index)">
            <font-awesome-icon :icon="['fas', 'check-circle']" />
          </div>
          <p
            class="levelP"
            :class="{
              blue: index == 0 || index == 5,
              orange: index == 1,
              purple: index == 2 || index == 4,
              red: index == 3,
            }"
          >
            Niveau {{ index + 1 }}
          </p>
        </div>
      </div>
      <div class="item solo" @click="goTo('Note-revision')">
        <p class="red">Fiche de révision</p>
      </div>
      <div class="item solo" @click="quizRouter()">
        <p class="blue">Quiz final</p>
        <p v-if="quizState" class="green infoquiz">
          Le quiz à été validé. Bravo !
        </p>
        <p v-else class="orange infoquiz">Le quiz n'a pas encore été validé</p>
        <p v-if="quizAvailable()" class="red infoquiz">
          Validez tous les entraînements pour pouvoir passer le quiz
        </p>
        <div class="checkStatus green" v-if="quizState">
          <font-awesome-icon :icon="['fas', 'check-circle']" />
        </div>
      </div>
    </div>
    <div class="gameBox" v-else>
      <JeuxLectureNote
        :level="currentLevel"
        :year="year"
        :quiz="quiz"
        @RETOUR="menu = true"
      />
    </div>
  </div>
</template>

<script>
import JeuxLectureNote from "./JeuxLectureNote";
import Navbar from "./Navbar";
export default {
  components: {
    Navbar,
    JeuxLectureNote,
  },
  props: ["year"],
  data() {
    return {
      menu: true,
      level: [
        {
          diff: "Niveau 1",
          index: 0,
          note: [
            { note: "Do", value: "c/4" },
            { note: "Re", value: "d/4" },
          ],
        },
        {
          diff: "Niveau 2",
          index: 1,
          note: [
            { note: "Do", value: "c/4" },
            { note: "Re", value: "d/4" },
            { note: "Mi", value: "e/4" },
          ],
        },
        {
          diff: "Niveau 3",
          index: 2,
          note: [
            { note: "Do", value: "c/4" },
            { note: "Re", value: "d/4" },
            { note: "Mi", value: "e/4" },
            { note: "Fa", value: "f/4" },
          ],
        },
        {
          diff: "Niveau 4",
          index: 3,
          note: [
            { note: "Do", value: "c/4" },
            { note: "Re", value: "d/4" },
            { note: "Mi", value: "e/4" },
            { note: "Fa", value: "f/4" },
            { note: "Sol", value: "g/4" },
          ],
        },
        {
          diff: "Niveau 5",
          index: 4,
          note: [
            { note: "Do", value: "c/4" },
            { note: "Re", value: "d/4" },
            { note: "Mi", value: "e/4" },
            { note: "Fa", value: "f/4" },
            { note: "Sol", value: "g/4" },
            { note: "La", value: "a/4" },
          ],
        },
        {
          diff: "Niveau 6",
          index: 5,
          note: [
            { note: "Do", value: "c/4" },
            { note: "Re", value: "d/4" },
            { note: "Mi", value: "e/4" },
            { note: "Fa", value: "f/4" },
            { note: "Sol", value: "g/4" },
            { note: "La", value: "a/4" },
            { note: "Si", value: "b/4" },
          ],
        },
      ],
      currentLevel: Object,
      quiz: false,
    };
  },
  computed: {
    quizState() {
      return this.$store.state.progression[this.year - 1].chapter.note.quiz;
    },
  },
  methods: {
    retour() {
      this.$router.push({ name: "year", params: { annee: this.year } });
    },
    playGame(index) {
      this.currentLevel = this.level[index];
      this.menu = false;
    },
    goTo(node) {
      this.$router.push({ name: node });
    },
    checkLevel(index) {
      return this.$store.state.progression[this.year - 1].chapter.note
        .entrainement[index];
    },
    quizAvailable() {
      let res = false;
      this.$store.state.progression[
        this.year - 1
      ].chapter.note.entrainement.forEach((element) => {
        if (!element) {
          res = true;
        }
      });
      return res;
    },
    quizRouter() {
      if (
        !this.quizAvailable() &&
        !this.$store.state.progression[this.year - 1].chapter.note.quiz
      ) {
        this.quiz = true;
        this.currentLevel = this.level[5];
        this.menu = false;
      }
    },
  },
};
</script>

<style scoped>
.boxAll {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
@media all and (max-width: 743px) {
  .boxAll {
    height: auto !important;
  }
}
.box {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  padding: 0px 0;
}

.item {
  width: 70%;
  border: 3px solid var(--main);
  border-radius: 20px;
  max-width: 1200px;
  min-height: 120px;
  position: relative;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all ease 200ms;
  padding: 10px 20px;
}
.solo {
  cursor: pointer;
}
.item:hover {
  box-shadow: 5px 5px 5px rgba(6, 68, 107, 0.42);
}
.item p {
  font-size: 30px;
  font-weight: bold;
}
.levelP {
  font-weight: 100 !important;
}
.chap {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row !important;
  justify-content: space-around !important;
  align-items: center !important;
  min-height: 220px !important;
}
.chap p {
  width: 100%;
}
.level {
  border: 3px solid var(--main);
  padding: 5px 30px;
  border-radius: 10px;
  margin: 20px 40px;
  cursor: pointer;
  transition: all ease 200ms;
  position: relative;
}
.checkStatus {
  position: absolute;
  top: 2px;
  right: 5px;
}
.level:hover {
  transform: scale(1.05);
}

.retour {
  display: flex;
  align-items: center;
  font-size: 20px;
  border: 2px solid var(--main);
  padding: 8px;
  border-radius: 15px;
  position: absolute;
  top: -5px;
  left: 180px;
  cursor: pointer;
  transition: all ease 200ms;
}
@media all and (max-width: 1774px) {
  .retour {
    left: 10px !important ;
    top: 0px !important;
  }
}
@media all and (max-width: 641px) {
  .retour {
    top: -45px !important;
    border-radius: 100% !important;
  }
  .retour p {
    display: none;
  }
}
#chevron {
  margin: 5px;
}
.retour:hover {
  box-shadow: 2px 2px 10px #06446b5e;
}
.gameBox {
  width: 100%;
  height: 100%;
}
.infoquiz {
  font-size: 15px !important;
  margin-top: 10px;
}
</style>
