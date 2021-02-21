<template>
  <div class="boxAll">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="menu" v-if="menu">
      <h1 class="orange">Améliore ton ryhtme</h1>
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour</p>
      </div>
      <div class="item solo">
        <p class="blue">Cours</p>
      </div>
      <div class="item chap">
        <p class="purple">S'entrainer</p>
        <div
          class="level"
          v-for="(item, index) in diff"
          :key="index"
          @click="playGame(index)"
        >
          <p
            class="levelP"
            :class="{ orange: index == 0, blue: index == 1, red: index == 2 }"
          >
            Niveau {{ index + 1 }}
          </p>
        </div>
      </div>
      <div class="item solo">
        <p class="red">Fiche de révision</p>
      </div>
    </div>
    <div class="boxAll" v-else>
      <JeuxRythme :level="prop" @RETOUR="menu = true" @AGAIN="again()" />
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
    let noteGlobal = [
      {
        name: "ronde.svg",
        value: 1,
        duration: 4,
      },
      {
        name: "blanche.svg",
        value: 2,
        duration: 2,
      },
      {
        name: "noir.svg",
        value: 3,
        duration: 1,
      },
      {
        name: "blanchepoint.svg",
        value: 4,
        duration: 3,
      },
      {
        name: "croche.svg",
        value: 5,
        duration: 0.5,
      },
      {
        name: "pause.svg",
        value: 6,
        duration: 1,
      },
      {
        name: "demiPause.svg",
        value: 7,
        duration: 0.5,
      },
      {
        name: "soupir.svg",
        value: 8,
        duration: 1,
      },
      {
        name: "demiSoupirPoint.svg",
        value: 9,
        duration: 1.5,
      },
      {
        name: "demiSoupir.svg",
        value: 10,
        duration: 0.5,
      },
    ];
    return {
      menu: true,
      prop: Object, // le prop qui sera donnée au jeux => audio + notes + réponse
      diff: [
        [
          {
            mp3: require("@/assets/level1_1.mp3"),
            result: [2, 2],
            note: [noteGlobal[0], noteGlobal[1], noteGlobal[2], noteGlobal[4]],
          },
          {
            mp3: require("@/assets/level1_2.mp3"),
            result: [3, 3, 2],
            note: [noteGlobal[0], noteGlobal[1], noteGlobal[2], noteGlobal[4]],
          },
          {
            mp3: require("@/assets/level1_3.mp3"),
            result: [3, 3, 3, 3],
            note: [noteGlobal[0], noteGlobal[1], noteGlobal[2], noteGlobal[4]],
          },
          {
            mp3: require("@/assets/level1_4.mp3"),
            result: [2, 3, 3],
            note: [noteGlobal[0], noteGlobal[1], noteGlobal[2], noteGlobal[4]],
          },
          {
            mp3: require("@/assets/level1_5.mp3"),
            result: [3, 2, 3],
            note: [noteGlobal[0], noteGlobal[1], noteGlobal[2], noteGlobal[4]],
          },
          {
            mp3: require("@/assets/level1_6.mp3"),
            result: [3, 3, 2],
            note: [noteGlobal[0], noteGlobal[1], noteGlobal[2], noteGlobal[4]],
          },
        ],
        [
          {
            mp3: require("@/assets/level2_1.mp3"),
            result: [3, 8, 3, 3],
            note: [noteGlobal[2], noteGlobal[1], noteGlobal[7], noteGlobal[4]],
          },
          {
            mp3: require("@/assets/level2_2.mp3"),
            result: [2, 3, 8],
            note: [noteGlobal[7], noteGlobal[1], noteGlobal[2], noteGlobal[4]],
          },
          {
            mp3: require("@/assets/level2_3.mp3"),
            result: [8, 3, 2],
            note: [noteGlobal[7], noteGlobal[1], noteGlobal[2], noteGlobal[4]],
          },
          {
            mp3: require("@/assets/level2_4.mp3"),
            result: [3, 8, 3, 8],
            note: [noteGlobal[7], noteGlobal[1], noteGlobal[2], noteGlobal[4]],
          },
        ],
        [],
      ],
      level: Number,
    };
  },
  methods: {
    retour() {
      this.$router.push({ name: "year", params: { annee: this.year } });
    },
    playGame(level) {
      let random = Math.floor(Math.random() * this.diff[level].length);
      this.prop = { level: this.diff[level][random], index: level };
      this.menu = false;
      this.level = level;
      console.log(level);
    },
    again() {
      this.menu = true;
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
}
.level:hover {
  transform: scale(1.05);
}
.levelP {
  font-weight: 100 !important;
}
</style>
