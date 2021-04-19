<template>
  <div class="box">
    <h1>La portée</h1>

    <!-- Audio à insérer-->
    <audio src="../assets/audio_structure/20201212213830.mp3" controls></audio>

    <p>
      Elle est aussi composée de 4 interlignes, elles aussi numérotées du bas
      vers le haut.
    </p>
    <!-- portée vierge avec numéros des interlignes à ajouter-->
    <div><img src="@/assets/quizPartition/portee/Q2/Q2R3.png" alt="" /></div>

    <p>Une interligne correspond à l’espace entre deux lignes.</p>

    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('partition')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('structure1')">Page précédente</p>
        <p class="link" @click="nav('structure3')">Page suivante</p>
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
