<template>
  <div class="container">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="content">
      <div class="item">
        <div class="left">
          <img :src="img[0]" alt="" />
        </div>
        <div class="right">
          <p>Apprends à lire les notes</p>
          <div class="bottom">
            <div class="bar">
              <div class="contour purple"></div>
              <div
                class="fill purple fillPurple"
                :style="{ width: getProgress(0) + '%' }"
              ></div>
            </div>
            <p>{{ getProgress(0) }} %</p>
          </div>
        </div>
      </div>

      <div class="item">
        <div class="left">
          <img :src="img[1]" alt="" />
        </div>
        <div class="right">
          <p>Apprends à lire les notes</p>
          <div class="bottom">
            <div class="bar">
              <div class="contour orange"></div>
              <div
                class="fill orange fillOrange"
                :style="{ width: getProgress(1) + '%' }"
              ></div>
            </div>
            <p>{{ getProgress(1) }} %</p>
          </div>
        </div>
      </div>

      <div class="item">
        <div class="left">
          <img :src="img[2]" alt="" />
        </div>
        <div class="right">
          <p>Apprends à lire les notes</p>
          <div class="bottom">
            <div class="bar">
              <div class="contour blue"></div>
              <div
                class="fill blue fillBlue"
                :style="{ width: getProgress(2) + '%' }"
              ></div>
            </div>
            <p>{{ getProgress(2) }} %</p>
          </div>
        </div>
      </div>

      <div class="item">
        <div class="left">
          <img :src="img[3]" alt="" />
        </div>
        <div class="right">
          <p>Apprends à lire les notes</p>
          <div class="bottom">
            <div class="bar">
              <div class="contour red"></div>
              <div
                class="fill red fillRed"
                :style="{ width: getProgress(3) + '%' }"
              ></div>
            </div>
            <p>{{ getProgress(3) }} %</p>
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
      img: [
        require("@/assets/sol.png"),
        require("@/assets/croche.png"),
        require("@/assets/partition.png"),
        require("@/assets/violon.png"),
      ],
    };
  },
  computed: {
    ...mapState(["progression"]),
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    getProgress(index) {
      let indexYear = this.year - 1;
      let result = [
        this.progression[indexYear].chapter.note,
        this.progression[indexYear].chapter.rythme,
        this.progression[indexYear].chapter.partition,
        this.progression[indexYear].chapter.instrument,
      ];
      console.log(result);
      return result[index];
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
  border: 2px solid var(--main);
  width: 500px;
  height: 200px;
  border-radius: 30px;
  transition: all ease 200ms;
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
