<template>
  <div class="boxCours">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="content">
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour</p>
      </div>
      <h1 class="red">Les familles d'instruments</h1>
      <h2 class="orange">Les percussions</h2>
      <p>
        Les percussions sont des instruments qui peuvent avoir deux
        particularités:
      </p>
      <ul>
        <li>
          Certains se jouent en frappant sur une membrane : c’est le cas des
          timbales, mais aussi de la caisse claire et de la grosse caisse qui
          composent la batterie.
        </li>
        <li>
          D’autres percussions, qui n’ont pas de membranes, émettent aussi un
          son lorsqu’ils sont frappés : c’est le cas du triangle, du xylophone,
          du carillon ou encore des cymbales.
        </li>
      </ul>
      <div class="itemBox">
        <div class="item" @click="pushTo(11)">
          <p>Fiche instrument : la batterie</p>
        </div>
        <div class="item" @click="pushTo(12)">
          <p>Fiche instrument : le carillon</p>
        </div>
      </div>
      <div class="nav">
        <div class="item last" @click="goTo('cours-instruments-home')">
          <p>Retour au menu</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import instruments from "../assets/instruments.json";
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
      this.$router.push({ name: "cours-instruments-home" });
    },
    goTo(node) {
      this.$router.push({ name: node });
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
.boxCours {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  padding: 50px 50px;
  position: relative;
}
h1 {
  text-align: center;
  letter-spacing: 5px;
}
h2 {
  margin: 20px 0px;
}
h3 {
  text-decoration: underline;
  margin: 30px;
}
.itemBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.item {
  text-align: center;
  border: 2px solid var(--orange);
  padding: 20px;
  border-radius: 20px;
  margin: 20px 0;
  max-width: 500px;
  width: 100%;
  cursor: pointer;
  transition: all ease 200ms;
}
.last {
  color: var(--main) !important;
  border: 2px solid var(--main);
  max-width: 200px;
}
ul {
  margin-left: 50px;
}
.nav {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.item:hover {
  box-shadow: 2px 2px 5px;
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
