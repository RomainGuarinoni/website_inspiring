<template>
  <div class="boxAll">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="content">
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour</p>
      </div>
      <div class="box">
        <h1>Lire une partition</h1>
        <div class="item first">
          <div class="header">
            <p class="purple">Les nuances</p>
          </div>
          <div class="chapter ">
            <p class="orange" @click="cours()">Cours</p>
            <p class="orange">Entraînement</p>
            <p class="orange">Quiz</p>
          </div>
        </div>
        <div class="item second">
          <div class="header">
            <p class="purple">Structure d'une portée</p>
          </div>
          <div class="chapter ">
            <p class="orange">Cours</p>
            <p class="orange">Entraînement</p>
            <p class="orange">Quiz</p>
          </div>
        </div>
        <div class="item third">
          <p class="red">Quiz final</p>
        </div>
        <div class="item fourth">
          <p class="blue">Fiche de révisions</p>
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
      this.$router.push({ name: "year", params: { annee: this.year } });
    },
    cours() {
      this.$router.push({ name: "Nuance1" });
    },
  },
  mounted: function() {
    console.log(this.year);
  },
};
</script>

<style scoped>
* {
  font-family: roboto;
}
h1 {
  color: var(--blue);
}

.boxAll {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
}
.item {
  width: 70%;
  border: 3px solid var(--main);
  border-radius: 20px;
  max-width: 1200px;
  min-height: 100px;
  position: relative;
  margin: 10px 0;
  display: flex;
  font-weight: bold;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: all ease 200ms;
}
.item p {
  font-size: 30px;
}
@media all and (max-width: 767px) {
  .header {
    justify-content: center !important;
  }
}
@media all and (max-width: 543px) {
  .chapter {
    justify-content: center !important;
  }
}
.item:hover {
  box-shadow: 5px 5px 5px rgba(6, 68, 107, 0.42);
}
.header {
  width: 95%;
  margin: 11px 0px 20px 0px;

  display: flex;
  margin-bottom: 10px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  cursor: pointer;
}
.header p {
  font-size: 30px;
  font-weight: bold;
}
.chapter {
  display: flex;
  width: 70%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.chapter p {
  border: 3px solid var(--main);
  padding: 10px;
  font-size: 25px;
  padding: 10px 20px;
  max-width: 120px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px 0;
  transition: all ease 200ms;
}
.chapter p:hover {
  transform: scale(1.05);
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
@media all and (max-width: 1774px) {
  .retour {
    left: 10px !important ;
    top: 0px !important;
  }
}
@media all and (max-width: 641px) {
  .retour {
    top: -45px !important;
    border-radius: 100% !important;
  }
  .retour p {
    display: none;
  }
}
#chevron {
  margin: 5px;
}
.retour:hover {
  box-shadow: 2px 2px 10px #06446b5e;
}
.fourth,
.third {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  font-weight: bold;
}
@media all and (max-width: 375px) {
  .header p,
  .third,
  .fourth {
    font-size: 20px;
  }
  .chapter p {
    font-size: 18px;
  }
  h1 {
    font-size: 28px;
    margin-top: 10px;
  }
}
</style>
