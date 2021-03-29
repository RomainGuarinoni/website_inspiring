<template>
  <div class="boxCours">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="content">
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour</p>
      </div>
      <h1 class="red">Les familles d'instruments</h1>
      <h2 class="blue">Les instruments à vent</h2>
      <h3>1) La voix</h3>
      <p>
        Les chanteurs jouent aussi d’un instrument ! C’est leur propre voix.
      </p>
      <h3>2) Les bois</h3>
      <p>
        Certains instruments à vent font partie des bois, non pas parce qu’ils
        sont fabriqués en bois, mais par leur manière de produire le son.
      </p>
      <p>
        C’est le cas du saxophone, de la clarinette, du haut-bois et du basson
        dont le son est créé grâce à la vibration d’une anche. La flûte
        traversière et la flûte à bec font aussi partie des bois, mais leur son
        est créé par la vibration de l’air lorsqu’il se projette sur leurs
        parois.
      </p>
      <div class="itemBox">
        <div class="item" @click="pushTo(3)">
          <p>Fiche instrument : la clarinette</p>
        </div>
        <div class="item" @click="pushTo(0)">
          <p>Fiche instrument : le saxophone</p>
        </div>
        <div class="item" @click="pushTo(6)">
          <p>Fiche instrument : la flûte traversière</p>
        </div>
      </div>
      <h3>3) Les cuivres</h3>
      <p>
        D’autres instruments à vent, les cuivres, utilisent la vibration de
        leurs lèvres dans une embouchure pour créer le son.
      </p>
      <p>
        C’est le cas de la trompette, du trombone, du cor ou encore du tuba.
      </p>
      <div class="itemBox">
        <div class="item" @click="pushTo(1)">
          <p>Fiche instrument : la trompette, le bugle, le cornet</p>
        </div>
        <div class="item" @click="pushTo(7)">
          <p>Fiche instrument : l’euphonium</p>
        </div>
        <div class="item" @click="pushTo(10)">
          <p>Fiche instrument : le cor</p>
        </div>
        <div class="item" @click="pushTo(8)">
          <p>Fiche instrument : le trombone</p>
        </div>
      </div>
      <div class="nav">
        <div class="item last" @click="goTo('cours-instruments-percussion')">
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
  border: 2px solid var(--blue);
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
