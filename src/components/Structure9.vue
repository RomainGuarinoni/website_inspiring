<template>
  <div class="box">
    <h1>Le chiffrage de mesure</h1>

    <!-- Audio à insérer-->
    <audio src="../assets/audio_structure/20201212215112.mp3" controls></audio>

    <p>
      Le chiffrage de mesure est constitué de <strong>deux chiffres</strong>.
    </p>
    <p>Cette année on va étudier le chiffre du <strong>dessus</strong> :</p>

    <ul>
      <li>2 signifie qu’il va y avoir 2 noires par mesure</li>
      <li>3 signifie qu’il va y avoir 3 noires par mesure</li>
      <li>
        4 signifie qu’il va y avoir 4 noires par mesure : c’est le cas de
        l’exemple ci-dessous :
      </li>
    </ul>

    <!-- Portée-->
    <div><img src="@/assets/pulsation.png" alt="" /></div>

    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('partition')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('structure8')">Page précédente</p>
        <p class="link" @click="nav('structure10')">Page suivante</p>
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

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  width: 100%;
  justify-content: space-around;
}
audio {
  outline: none;
}
p {
  font-size: 20px;
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
