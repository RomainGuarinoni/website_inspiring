<template>
  <div class="box">
    <h1>La portée</h1>
    <!-- Audio à insérer-->
    <audio src="../assets/audio_structure/20201212213603.mp3" controls></audio>
    <p>
      La portée est constituée de 5 lignes. On les numérote du bas vers le haut
      :
    </p>

    <!-- portée vierge avec numéros des lignes à ajouter-->
    <div id="porteestructure1"></div>

    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('partition')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('partition')">Page précédente</p>
        <p class="link" @click="nav('structure2')">Page suivante</p>
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
    const monDiv = document.getElementById("porteestructure1");
    const monRenderer = new Vex.Flow.Renderer(
      monDiv,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Modification de paramètres
    monRenderer.resize(350, 120); //attention de ne pas mettre trop fin
    const monContexte = monRenderer.getContext();
    monContexte.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    ///////////////////
    /////Mesure n°1////
    //////////////////

    var Mesure_1 = new Vex.Flow.Stave(10, 0, 310);
    Mesure_1.setContext(monContexte).draw(); // dessin
    var notes = [
      new Vex.Flow.TabNote({
        positions: [
          {
            str: 1,
            fret: 5,
          },
          {
            str: 2,
            fret: 4,
          },
          {
            str: 3,
            fret: 3,
          },
          {
            str: 4,
            fret: 2,
          },
          {
            str: 5,
            fret: 1,
          },
        ],
        duration: "q",
      }),
    ];
    Vex.Flow.Formatter.FormatAndDraw(monContexte, Mesure_1, notes);
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
