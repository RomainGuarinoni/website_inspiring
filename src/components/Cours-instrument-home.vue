<template>
  <div class="box">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="menu">
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour</p>
      </div>
      <h1 class="red">Les Familles d'instruments</h1>
      <div class="center">
        <h2>Il existe 3 grandes familles d'instruments :</h2>
        <div class="item purple" @click="goTo('cours-instruments-corde')">
          <p>Les instruments à cordes</p>
        </div>
        <div class="item blue" @click="goTo('cours-instruments-vent')">
          <p>les instruments à vent</p>
        </div>
        <div class="item orange" @click="goTo('cours-instruments-percussion')">
          <p>Les percussions</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
export default {
  components: {
    Navbar,
  },
  props: ["year"],
  methods: {
    retour() {
      this.$router.push({ name: "instruments" });
    },
    goTo(node) {
      this.$router.push({ name: node });
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
  padding: 100px 0;
}
.box {
  height: 100vh;
  text-align: center;
}
h1 {
  font-size: 30px;
}
h2 {
  font-weight: 100;
}
.center {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.item {
  border: 2px solid;
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  cursor: pointer;
}
.item:hover {
  box-shadow: 2px 2px 10px;
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
