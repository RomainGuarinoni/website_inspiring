<template>
  <div class="box">
    <div class="content">
      <h1>Améliore ton rythme</h1>
      <h2>La pulsation</h2>
      <p>
        Dans une partition, on remarque que la musique est divisée en mesures,
        et ces mesures sont divisées en temps réguliers. On peut donc battre une
        pulsation pour indiquer ces temps. Durant tout ce cours, nous allons
        utiliser une mesure à quatre temps.<br />Ainsi, dans cette mesure, il y
        a 4 pulsations : <br />
      </p>
      <div id="rythme_portee"></div>
    </div>
    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('rythme')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('rythme')">Page précédente</p>
        <p class="link" @click="nav('rythme2')">Page suivante</p>
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
    const monDiv = document.getElementById("rythme_portee");
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

    var Mesure_1 = new Vex.Flow.Stave(335, 0, 410);
    Mesure_1.addClef("treble")
      .addTimeSignature("4/4")
      .setContext(monContexte)
      .draw(); // Ajout d'une clé, chiffrage et dessin

    //Créations de notes

    var notesMesure_1 = [
      new Vex.Flow.GhostNote({ keys: ["a/4"], duration: "4" }),
      new Vex.Flow.GhostNote({ keys: ["a/4"], duration: "4" }),
      new Vex.Flow.GhostNote({ keys: ["a/4"], duration: "4" }),
      new Vex.Flow.GhostNote({ keys: ["a/4"], duration: "4" }),
    ];

    //Créations des batons
    var text1 = new Vex.Flow.TextNote({
      text: "|",
      font: {
        family: "Arial",
        size: 14,
        weight: "",
      },
      duration: "q",
    })
      .setLine(11)
      .setStave(Mesure_1)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text2 = new Vex.Flow.TextNote({
      text: "|",
      font: {
        family: "Arial",
        size: 14,
        weight: "",
      },
      duration: "q",
    })
      .setLine(11)
      .setStave(Mesure_1)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text3 = new Vex.Flow.TextNote({
      text: "|",
      font: {
        family: "Arial",
        size: 14,
        weight: "",
      },
      duration: "q",
    })
      .setLine(11)
      .setStave(Mesure_1)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);
    var text4 = new Vex.Flow.TextNote({
      text: "|",
      font: {
        family: "Arial",
        size: 14,
        weight: "",
      },
      duration: "q",
    })
      .setLine(11)
      .setStave(Mesure_1)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    //Création de 2 voix de 4 temps

    var maVoix1 = new Vex.Flow.Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION,
    });
    var maVoix2 = new Vex.Flow.Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION,
    });
    // eslint-disable-next-line no-unused-vars
    var maVoix3 = new Vex.Flow.Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION,
    });

    // On ajoute les notes et les nuances aux voix.

    maVoix1.addTickables(notesMesure_1);
    maVoix2.addTickables([text1]); //bien ajouter aux deux voix s'il n'y a pas de nuances "text"
    maVoix2.addTickables([text2]);
    maVoix2.addTickables([text3]);
    maVoix2.addTickables([text4]);
    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var monFormatter = new Vex.Flow.Formatter()
      .joinVoices([maVoix1, maVoix2])
      .format([maVoix1, maVoix2], 355);

    // on dessine la voix avec les notes sur la mesure 1

    maVoix1.draw(monContexte, Mesure_1);
    text1.setContext(monContexte).draw();
    text2.setContext(monContexte).draw();
    text3.setContext(monContexte).draw();
    text4.setContext(monContexte).draw();
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
  text-align: center;
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
.content {
  text-align: center;
  width: 80%;
}
h1,
h2 {
  margin: 20px 0;
}
</style>
