<template>
  <div class="boxAll">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="menu" v-if="menu">
      <h1 class="orange">Améliore ton ryhtme</h1>
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour</p>
      </div>
      <div class="item solo" @click="goToCours()">
        <p class="blue">Cours</p>
      </div>
      <div class="item chap">
        <p class="purple">S'entraîner</p>
        <div
          class="level"
          v-for="(item, index) in 3"
          :key="index"
          @click="playGame(index)"
        >
          <p
            class="levelP"
            :class="{ orange: index == 0, blue: index == 1, red: index == 2 }"
          >
            Niveau {{ index + 1 }}
          </p>
          <div class="checkStatus green" v-if="checkLevel(index)">
            <font-awesome-icon :icon="['fas', 'check-circle']" />
          </div>
        </div>
      </div>
      <div class="item solo">
        <p class="red" @click="fiche()">Fiche de révision</p>
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
    <div class="boxAll" v-else>
      <JeuxRythme
        :levelIndex="levelIndex"
        @RETOUR="menu = true"
        :year="year"
        :quiz="quiz"
        @AGAIN="again()"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import JeuxRythme from "./JeuxRythme";
export default {
  components: {
    Navbar,
    JeuxRythme,
  },
  props: ["year"],
  data() {
    return {
      menu: true,
      prop: Object, // le prop qui sera donnée au jeux => audio + notes + réponse
      levelIndex: Number,
      quiz: false,
    };
  },
  computed: {
    quizState() {
      return this.$store.state.progression[this.year - 1].chapter.rythme.quiz;
    },
  },
  methods: {
    retour() {
      this.$router.push({ name: "year", params: { annee: this.year } });
    },
    playGame(index) {
      this.levelIndex = index;
      this.menu = false;
    },
    again() {
      this.menu = true;
    },
    goToCours() {
      this.$router.push({ name: "Rythme1" });
    },
    fiche() {
      //this.$router.push({ name: "Partition-revision" });
    },
    quizAvailable() {
      let res = false;
      this.$store.state.progression[
        this.year - 1
      ].chapter.rythme.entrainement.forEach((element) => {
        if (!element) {
          res = true;
        }
      });
      return res;
    },
    checkLevel(index) {
      return this.$store.state.progression[this.year - 1].chapter.rythme
        .entrainement[index];
    },
    quizRouter() {
      if (
        !this.quizAvailable() &&
        !this.$store.state.progression[this.year - 1].chapter.rythme.quiz
      ) {
        this.quiz = true;
        this.levelIndex = 2;
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

.menu {
  display: flex;
  position: relative;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
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
.retour:hover {
  box-shadow: 2px 2px 10px #06446b5e;
}
#chevron {
  margin: 5px;
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
.chap {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row !important;
  justify-content: space-around !important;
  align-items: center !important;
  position: relative;
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
  position: relative;
  transition: all ease 200ms;
}
.level:hover {
  transform: scale(1.05);
}
.levelP {
  font-weight: 100 !important;
}
.infoquiz {
  font-size: 15px !important;
  margin-top: 10px;
}
.checkStatus {
  position: absolute;
  top: 2px;
  right: 5px;
}
</style>
