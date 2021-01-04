<template>
  <div class="navbar">
    <div class="navbar1" v-show="type == 1">
      <img src="../assets/logo.png" alt="Logo Inspiring Music Theory" />
      <h1>Inspiring Music Theory</h1>
    </div>
    <div class="navbar2" v-show="type == 2">
      <div class="navBox">
        <router-link :to="{ name: 'yearselect' }"
          ><img class="logo_navbar2" src="../assets/logo.png" alt="logo"
        /></router-link>
        <h1>Inspiring Music Theory</h1>
        <router-link :to="{ name: 'travaux' }"
          ><button>Mon profil</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
  },
};
</script>

<style scoped>
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
</style>
