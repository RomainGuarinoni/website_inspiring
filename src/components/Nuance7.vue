<template>
  <div class="box">
    <h1>Signification des nuances</h1>

    <!-- Audio à insérer-->
    <audio src="../assets/nuance8.mp3" controls></audio>

    <p>Il existe aussi d'autres nuances :</p>

    <div class="Acentre">
      <!--Image-->
      <span
        ><img
          alt=""
          class="imageflottante"
          sizes="(max-width: 360px) 344px,  (max-width: 768px) 752px"
          src="../assets/decrescendo.jpg"
        />
      </span>
      <p>decrescendo : de moins en moins fort.</p>
    </div>
    <p class="dessous">Clique sur l'exemple :</p>

    <!-- Audio à insérer-->
    <audio src="" controls></audio>

    <!--Bouton-->
    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('partition')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('Nuance6')">Page précédente</p>
        <p class="link" @click="nav('partition')">Finir le cours</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    nav(node) {
      this.$router.push({ name: node });
    },
  },
};
</script>

<style>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  width: 100%;
  justify-content: space-around;
}
p,
ul,
li {
  font-size: 20px;
}
audio {
  outline: none;
}
.boutons {
  width: 80%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
}
.link {
  text-decoration: none;
  color: white;
  padding: 10px;
  border-radius: 10px;
  margin: 0 10px;
  transition: all ease 200ms;
  display: block;
  cursor: pointer;
}
.right {
  display: flex;
}
.link:nth-child(1) {
  border: 2px solid var(--main);
  background: var(--main);
}
.right .link:nth-child(1) {
  border: 2px solid var(--orange);
  background: var(--orange);
}
.right .link:nth-child(2) {
  border: 2px solid var(--blue);
  background: var(--blue);
}
.link:hover {
  transform: translate(0, -5px);
}
</style>
