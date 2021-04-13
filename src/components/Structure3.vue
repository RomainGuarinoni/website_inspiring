<template>
  <div class="box">
    <h1>La clé de Sol et la clé de Fa</h1>

    <!-- Audio à insérer-->
    <audio src="../assets/audio_structure/20201212214121.mp3" controls></audio>

    <p>Ceci est un système : il relie deux portées avec une accolade.</p>

    <!-- Sytème avec clé de Fa et clé de Sol-->
    <div id="systemeVide"></div>

    <p>Comment s'appellent ces clés ?</p>

    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('partition')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('structure2')">Page précédente</p>
        <p class="link" @click="nav('structure4')">Page suivante</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vex from "vexflow";
export default {
  methods: {
    nav(node) {
      this.$router.push({ name: node });
    },
  },
  mounted: function() {
    // on place la portée
    const div2 = document.getElementById("systemeVide");
    const renderer2 = new Vex.Flow.Renderer(
      div2,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Modification de paramètres
    renderer2.resize(500, 200);
    const ctx2 = renderer2.getContext();
    ctx2.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    //Mesure 1
    var stave21 = new Vex.Flow.Stave(20, 0, 300)
      .addTrebleGlyph()
      .setContext(ctx2)
      .draw();

    //Mesure 2
    var stave31 = new Vex.Flow.Stave(20, 100, 300)
      .addClef("bass")
      .setContext(ctx2)
      .draw();

    //Création du système avec une accolade
    new Vex.Flow.StaveConnector(stave21, stave31)
      .setType(Vex.Flow.StaveConnector.type.BRACE)
      .setContext(ctx2)
      .draw();
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
