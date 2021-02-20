<template>
  <div class="navbar">
    <div class="navbar1" v-if="type == 1">
      <img src="../assets/logo.png" alt="Logo Inspiring Music Theory" />
      <h1 class="font">Inspiring Music Theory</h1>
    </div>
    <div class="navbar2" v-if="type == 2">
      <div class="navBox">
        <router-link :to="{ name: 'yearselect' }"
          ><img class="logo_navbar2" src="../assets/logo.png" alt="logo"
        /></router-link>
        <h1 class="font">Inspiring Music Theory</h1>
        <router-link :to="{ name: 'travaux' }"
          ><button>Mon profil</button></router-link
        >
        <font-awesome-icon
          @click="pushTo('travaux')"
          class="user"
          :icon="['fas', 'user']"
        />
      </div>
    </div>
    <div class="navbar3" v-if="type == 3">
      <div class="espace">
        <div class="title" @click="pushTo('yearselect')">
          <img class="logo3" src="../assets/logo.png" alt="logo" />
          <h1 class="font">Inspiring music Theory</h1>
        </div>
        <button @click="pushTo('travaux')">Mon profil</button>
        <font-awesome-icon
          @click="pushTo('travaux')"
          class="user"
          :icon="['fas', 'user']"
        />
      </div>

      <div class="centre" @click="pushTo('yearselect')">
        <div class="annee">
          <div class="top">
            <div class="topBox">
              <p>Année {{ year }}</p>
              <font-awesome-icon :icon="['fas', 'arrow-down']" />
            </div>
          </div>
          <div class="bottom">
            <div class="barBox">
              <div class="around"></div>
              <div class="fill" id="fillnav" :style="{ width: fill }"></div>
            </div>
            <p>{{ progress }} %</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["type", "year"],
  computed: {
    ...mapState(["progression"]),
    progress() {
      let index = this.year - 1;
      let result = this.progression[index].year;
      return result;
    },
    fill() {
      let index = this.year - 1;
      let bar = this.progression[index].year;
      let result = bar + "%";
      return result;
    },
  },
  methods: {
    pushTo(node) {
      this.$router.push({ name: node });
    },
  },
};
</script>

<style scoped>
@media all and (max-width: 1312px) {
  .navbar3 .title h1 {
    display: none;
  }
}
@media all and (max-width: 647px) {
  .logo3 {
    display: none;
  }
  button {
    display: none;
  }
  .user {
    display: block !important;
    border: 2px solid var(--main);
    color: var(--main);
    padding: 15px;
    position: absolute;
    top: 10px;
    cursor: pointer;
    right: 5px;
    border-radius: 100%;
  }
  .centre {
    position: static !important;
    z-index: 0 !important;
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
  }
  .navbar3 {
    display: block !important;
    position: static !important;
  }
}
.user {
  display: none;
}
.navbar3 {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.espace {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.centre {
  position: absolute;
  z-index: 2;
}
.navbar3 .title {
  display: flex;
  cursor: pointer;
  align-items: center;
}
.navbar3 .title img {
  width: 150px;
}
.navbar3 button {
  margin-right: 5%;
}
.navbar3 .annee {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
}
.annee .top {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--main);
  font-size: 30px;
}
.topBox {
  display: flex;
  width: 55%;
  align-items: center;
  justify-content: space-between;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.barBox {
  position: relative;
  width: 80%;
  height: 5px;
}
.around {
  position: absolute;
  border: 2px solid var(--main);
  width: 100%;
  height: 100%;
  border-radius: 20px;
  left: 0;
}
.fill {
  position: absolute;
  background: var(--main);
  border: 2px solid var(--main);
  height: 100%;

  border-radius: 20px;
  left: 0;
}
@media all and (max-width: 1985px) {
  .navbar2 h1 {
    font-size: 30px !important;
  }
  .navBox {
    width: 100% !important;
  }
}
@media all and (max-width: 1801px) {
  .navbar1 h1 {
    font-size: 40px !important;
  }
}
@media all and (max-width: 1024px) {
  .navbar1 h1 {
    font-size: 30px !important;
  }
  .navbar1 img {
    width: 150px !important;
  }
}
@media all and (max-width: 856px) {
  .logo_navbar2 {
    width: 200px !important;
  }
}
@media all and (max-width: 592px) {
  .navbar2 h1 {
    display: none;
  }
}
.navbar2 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.navBox {
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.logo_navbar2 {
  width: 250px;
}
.navbar2 h1 {
  font-size: 50px;
}
button {
  height: 50px;
  width: 150px;
  background: white;
  color: var(--main);
  font-family: roboto;
  border-radius: 30px;
  font-size: 1.5em;
  border: 3px solid var(--main);
  cursor: pointer;
  transition: all ease 200ms;
  outline: none;
}
button:hover {
  transform: scale(1.1);
}
.navbar {
  width: 100%;
}
.navbar1 {
  padding-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.navbar1 img {
  width: 200px;
}
h1 {
  color: var(--red);
  letter-spacing: 5px;
  margin-bottom: 40px;
}
.navbar1 h1 {
  font-size: 60px;
}
.font {
  font-family: "Redressed", cursive;
}
</style>
