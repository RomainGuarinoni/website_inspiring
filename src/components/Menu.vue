<template>
  <div class="container">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in chapter"
        :key="index"
        @click="pushTo(item.node)"
      >
        <div class="left">
          <img :src="item.img" alt="" />
        </div>
        <div class="right">
          <p>{{ item.title }}</p>
          <div class="bottom">
            <div class="bar">
              <div
                class="contour"
                :class="{
                  purple: item.color == 'purple',
                  orange: item.color == 'orange',
                  blue: item.color == 'blue',
                  red: item.color == 'red',
                }"
              ></div>
              <div
                class="fill"
                :class="{
                  purple: item.color == 'purple',
                  orange: item.color == 'orange',
                  blue: item.color == 'blue',
                  red: item.color == 'red',
                  fillPurple: item.color == 'purple',
                  fillOrange: item.color == 'orange',
                  fillBlue: item.color == 'blue',
                  fillRed: item.color == 'red',
                }"
                :style="{ width: getProgress(index) + '%' }"
              ></div>
            </div>
            <p>{{ getProgress(index) }} %</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import { mapState } from "vuex";
export default {
  props: ["year"],
  components: {
    Navbar,
  },
  data() {
    return {
      chapter: [
        {
          title: "Apprends à lire les notes",
          img: require("@/assets/sol.png"),
          color: "purple",
          node: "note",
        },
        {
          title: "Améliore ton rythme",
          img: require("@/assets/croche.png"),
          color: "orange",
          node: "rythme",
        },
        {
          title: "Lis une partition",
          img: require("@/assets/partition.png"),
          color: "blue",
          node: "partition",
        },
        {
          title: "Ecoute les instruments",
          img: require("@/assets/violon.png"),
          color: "red",
          node: "instruments",
        },
      ],
    };
  },
  computed: {
    ...mapState(["chapterProgression"]),
  },
  methods: {
    getProgress(index) {
      let indexYear = this.year - 1;
      let result = [
        this.chapterProgression[indexYear].note,
        this.chapterProgression[indexYear].rythme,
        this.chapterProgression[indexYear].partition,
        this.chapterProgression[indexYear].instrument,
      ];
      return result[index];
    },
    pushTo(node) {
      this.$router.push({ name: node });
    },
  },
};
</script>

<style scoped>
@media all and (max-width: 434px) {
  .bar {
    width: 60% !important;
  }
}
* {
  font-family: roboto;
}
.container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.content {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  margin: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 3px solid var(--main);
  width: 500px;
  height: 200px;
  border-radius: 30px;
  transition: all ease 100ms;
  cursor: pointer;
}
.item:hover {
  box-shadow: 2px 2px 10px #06446ba8;
}
.item:nth-child(1) {
  color: var(--purple);
}
.item:nth-child(2) {
  color: var(--orange);
}
.item:nth-child(3) {
  color: var(--blue);
}
.item:nth-child(4) {
  color: var(--red);
}
.right {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.right p {
  font-size: 25px;
  font-weight: bold;
}
.left img {
  width: 100px;
}
.bottom {
  display: flex;
  width: 100%;
  justify-content: space-around;
  height: 10px;
  align-items: center;
}
.bar {
  position: relative;
  width: 80%;
  height: 8px;
}
.contour {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  left: 0;
}
.fill {
  position: absolute;
  background: var(--main);
  height: 100%;
  border-radius: 20px;
  left: 0;
}
.purple {
  border: 2px solid var(--purple);
}
.orange {
  border: 2px solid var(--orange);
}
.blue {
  border: 2px solid var(--blue);
}
.red {
  border: 2px solid var(--red);
}
.fillPurple {
  background: var(--purple);
}
.fillOrange {
  background: var(--orange);
}
.fillBlue {
  background: var(--blue);
}
.fillRed {
  background: var(--red);
}
</style>
