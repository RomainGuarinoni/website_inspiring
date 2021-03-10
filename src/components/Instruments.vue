<template>
  <div class="boxAll">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="menu">
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour</p>
      </div>
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="pushTo(index)"
      >
        <img src="@/assets/saxoThumb.jpeg" alt="img d'instruments" />
        <p>{{ item.nom }}</p>
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
        },
      });
    },
  },
};
</script>

<style scoped>
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
  border: 3px solid var(--main);
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
  min-height: 100px;
  cursor: pointer;
  transition: all ease 200ms;
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
</style>
