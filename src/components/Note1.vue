<template>
  <div class="box">
    <h1>Apprends à lire les notes</h1>
    <p>Nous allons maintenant apprendre à lire les notes sur une portée.</p>
    <div id="note_portee"></div>
    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('note')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('note')">Page précédente</p>
        <p class="link" @click="nav('Note2')">Page suivante</p>
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
    const monDiv = document.getElementById("note_portee");
    const monRenderer = new Vex.Flow.Renderer(
      monDiv,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Modification de paramètres
    monRenderer.resize(1110, 200); //attention de ne pas mettre trop fin
    const monContexte = monRenderer.getContext();
    monContexte.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    ///////////////////
    /////Mesure n°1////
    //////////////////

    var Mesure_1 = new Vex.Flow.Stave(250, 0, 310);
    Mesure_1.addClef("treble")
      .addTimeSignature("4/4")
      .setContext(monContexte)
      .draw(); // Ajout d'une clé, chiffrage et dessin

    //Créations de notes

    var notesMesure_1 = [
      new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "q" }),
    ];

    //Création de 2 voix de 4 temps

    var maVoix1 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var maVoix2 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    // On ajoute les notes et les nuances aux voix.

    maVoix1.addTickables(notesMesure_1);
    maVoix2.addTickables(notesMesure_1); //bien ajouter aux deux voix s'il n'y a pas de nuances "text"

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var monFormatter = new Vex.Flow.Formatter()
      .joinVoices([maVoix1, maVoix2])
      .format([maVoix1, maVoix2], 220);

    // on dessine la voix avec les notes sur la mesure 1

    maVoix1.draw(monContexte, Mesure_1);

    ///////////////////
    /////Mesure n°2////
    ///////////////////

    var Mesure_2 = new Vex.Flow.Stave(560, 0, 330); //attention à bien modifier la première valeur

    //On l'ajoute au contexte et on la dessine
    Mesure_2.setEndBarType(Vex.Flow.Barline.type.END);
    Mesure_2.setContext(monContexte).draw();

    //Création de notes

    var notesMesure_2 = [
      new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["c##/5"], duration: "q" }),
    ];

    //Création de 2 voix de 4 temps

    var maVoix3 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var maVoix4 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    // On ajoute les notes
    maVoix4.addTickables(notesMesure_2);
    maVoix3.addTickables(notesMesure_2);

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var monFormatter2 = new Vex.Flow.Formatter()
      .joinVoices([maVoix3, maVoix4])
      .format([maVoix3, maVoix4], 300);

    // on dessine la voix avec les notes sur la mesure et on dessine le texte des nuances

    maVoix3.draw(monContexte, Mesure_2);
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
