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
              <div class="contour"></div>
              <div class="fill"></div>
            </div>
            <p>{{ progression[year].chapter.note }}</p>
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
              <div class="contour"></div>
              <div class="fill"></div>
            </div>
            <p>{{ progression[year].chapter.rythme }}</p>
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
              <div class="contour"></div>
              <div class="fill"></div>
            </div>
            <p>{{ progression[year].chapter.partition }}</p>
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
              <div class="contour"></div>
              <div class="fill"></div>
            </div>
            <p>{{ progression[year].chapter.instrument }}</p>
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
};
</script>

<style scoped>
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
  align-items: center;
}
</style>
