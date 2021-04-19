<template>
  <div class="boxAll">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="menu">
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour</p>
      </div>
      <div class="item cours" @click="goTo('cours-instruments-home')">
        Cours instruments
      </div>
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="pushTo(index)"
      >
        <img :src="img(index)" alt="img d'instruments" />
        <p>{{ item.nom }}</p>
        <div class="checkStatus green" v-if="checkLevel(index)">
          <font-awesome-icon :icon="['fas', 'check-circle']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instruments from "../assets/instruments.json";
import Navbar from "./Navbar";
export default {
  components: {
    Navbar,
  },
  props: ["year"],
  data() {
    return {
      list: instruments.instruments,
    };
  },
  methods: {
    retour() {
      this.$router.push({ name: "year", params: { annee: this.year } });
    },
    pushTo(index) {
      this.$router.push({
        name: "ItemInstruments",
        params: {
          info: this.list[index],
          index: index,
        },
      });
    },
    goTo(node) {
      this.$router.push({ name: node });
    },
    img(index) {
      return require(`@/assets/instruments/${this.list[index].thumb}`);
    },
    checkLevel(index) {
      return this.$store.state.progression[this.year - 1].chapter.instrument
        .entrainement[index];
    },
  },
};
</script>

<style scoped>
.cours {
  font-size: 25px;
}
.menu {
  padding-top: 40px;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item {
  width: 80%;
  max-width: 1300px;
  border: 3px solid var(--main);
  border-radius: 20px;
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
  min-height: 140px;
  cursor: pointer;
  transition: all ease 200ms;
}
.item img {
  width: 150px;
}
.item:hover {
  box-shadow: 2px 2px 10px var(--placeholder);
}
.item p {
  font-weight: 500;
  font-size: 25px;
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
.checkStatus {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 20px;
}
</style>
