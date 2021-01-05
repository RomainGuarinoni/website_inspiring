<template>
  <div class="boxAll">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="content">
      <h1>Lire une partition</h1>
      <div class="item">
        <div class="header">
          <p>Les nuances</p>
          <font-awesome-icon :icon="['fas', 'plus-circle']" />
        </div>
        <div class="chapter">
          <p>Cours</p>
          <p>Entrainement</p>
          <p>Quizz</p>
        </div>
      </div>
      <div class="item">
        <div class="header">
          <p>Structure d'une portée</p>
          <font-awesome-icon :icon="['fas', 'plus-circle']" />
        </div>
        <div class="chapter">
          <p>Cours</p>
          <p>Entrainement</p>
          <p>Quizz</p>
        </div>
      </div>
      <div class="item">
        <div class="header">
          <p>Quizz final</p>
          <font-awesome-icon :icon="['fas', 'plus-circle']" />
        </div>
        <div class="chapter">
          <p>Cours</p>
          <p>Entrainement</p>
          <p>Quizz</p>
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
  mounted: () => {
    console.log(document.getElementsByClassName("item"));
    document.getElementsByClassName("item").forEach((element) => {
      element.style.background = "blue";
    });
  },
};
</script>

<style scoped>
* {
  font-family: roboto;
  color: var(--main);
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
  justify-content: space-around;
  align-items: center;
}
.item {
  width: 70%;
  border: 2px solid var(--main);
  border-radius: 20px;
  max-width: 900px;
  padding: 20px;
  transition: all ease 200ms;
}
.header {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  cursor: pointer;
}
.chapter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.chapter p {
  border: 2px solid var(--main);
  padding: 10px;
  border-radius: 10px;
}
.chapter {
  display: none;
}
</style>
