<template>
  <div class="boxCours">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="content">
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour</p>
      </div>
      <h1 class="red">Les familles d'instruments</h1>
      <h2 class="purple">Les instruments à cordes</h2>
      <h3>1) Les instruments à cordes frottées</h3>
      <p>
        Certains instruments à cordes sont joués en frottant leurs cordes, la
        plupart du temps avec un archet. C’est le cas du violon, de l’alto, du
        violoncelle et de la contrebasse.
      </p>
      <div class="itemBox">
        <div class="item" @click="pushTo(5)">
          <p>Fiche instrument : le violon</p>
        </div>
        <div class="item" @click="pushTo(14)">
          <p>Fiche instrument : la contrebasse</p>
        </div>
      </div>
      <h3>2) Les instruments à cordes pincées</h3>
      <p>D’autres instruments à cordes sont joués en pinçant leurs cordes.</p>
      <p>
        C’est le cas de la guitare classique, de la mandoline ou encore de la
        harpe.
      </p>
      <div class="itemBox">
        <div class="item" @click="pushTo(9)">
          <p>Fiche instrument : la guitare</p>
        </div>
      </div>
      <h3>3) Les instruments à cordes frappées</h3>
      <p>
        Enfin, certains instruments à cordes ne sont pas joués en frottant ou
        pinçant leurs cordes mais en les frappant.
      </p>
      <p>
        C’est le cas du piano : lorsque l’on joue une note au clavier, un
        marteau frappe une corde.
      </p>
      <div class="itemBox">
        <div class="item" @click="pushTo(4)">
          <p>Fiche instrument : le piano</p>
        </div>
      </div>
      <div class="nav">
        <div class="item last" @click="goTo('cours-instruments-vent')">
          <p>Famille Suivante</p>
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
  border: 2px solid var(--purple);
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
