<template>
  <div class="box">
    <h1>Améliore ton rythme</h1>
    <h2>Les Silences</h2>
    <h3>La demi-pause pointée</h3>
    <p>
      Pour un silence de 3 pulsations, on utilise une demi-pause (2 pulsations)
      à laquelle on ajoute un point. Ce silence s'appelle la demi-pause
      pointée.<br />
    </p>
    <div id="rythme_portee8"></div>
    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('rythme')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('rythme8')">Page précédente</p>
        <p class="link" @click="nav('rythme')">Terminer le cours</p>
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
    const monDiv = document.getElementById("rythme_portee8");
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
    var Mesure_1 = new Vex.Flow.Stave(220, 0, 310);
    Mesure_1.addClef("treble")
      .addTimeSignature("4/4")
      .setContext(monContexte)
      .draw(); // Ajout d'une clé, chiffrage et dessin

    //Créations de notes
    var notesMesure_1 = [
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "2d" }).addDotToAll(),
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "4" }),
    ];

    //On écrit le texte sous la partition
    var text11 = new Vex.Flow.TextNote({
      text: "1",
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

    var text12 = new Vex.Flow.TextNote({
      text: "2",
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

    var text13 = new Vex.Flow.TextNote({
      text: "3",
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
    var text14 = new Vex.Flow.TextNote({
      text: "4",
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

    // On ajoute les notes et les textes aux voix.

    maVoix1.addTickables(notesMesure_1);
    maVoix2.addTickables([text11]);
    maVoix2.addTickables([text12]);
    maVoix2.addTickables([text13]);
    maVoix2.addTickables([text14]);

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var monFormatter = new Vex.Flow.Formatter()
      .joinVoices([maVoix1, maVoix2])
      .format([maVoix1, maVoix2], 250);

    // on dessine la voix avec les notes sur la mesure 1
    maVoix1.draw(monContexte, Mesure_1);
    text11.setContext(monContexte).draw();
    text12.setContext(monContexte).draw();
    text13.setContext(monContexte).draw();
    text14.setContext(monContexte).draw();

    ///////////////////
    /////Mesure n°2////
    ///////////////////

    var Mesure_2 = new Vex.Flow.Stave(590, 0, 340); //attention à bien modifier la première valeur
    Mesure_2.addClef("treble")
      .addTimeSignature("4/4")
      .setContext(monContexte)
      .draw();
    //On l'ajoute au contexte et on la dessine

    Mesure_2.setContext(monContexte).draw();

    //Création de notes

    var notesMesure_2 = [
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "2dr" }).addDotToAll(),
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "4r" }),
    ];

    //Création de 2 voix de 4 temps
    var maVoix3 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var maVoix4 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    var text21 = new Vex.Flow.TextNote({
      text: "1",
      font: {
        family: "Arial",
        size: 14,
        weight: "",
      },
      duration: "q",
    })
      .setLine(11)
      .setStave(Mesure_2)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text22 = new Vex.Flow.TextNote({
      text: "2",
      font: {
        family: "Arial",
        size: 14,
        weight: "",
      },
      duration: "q",
    })
      .setLine(11)
      .setStave(Mesure_2)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text23 = new Vex.Flow.TextNote({
      text: "3",
      font: {
        family: "Arial",
        size: 14,
        weight: "",
      },
      duration: "q",
    })
      .setLine(11)
      .setStave(Mesure_2)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);
    var text24 = new Vex.Flow.TextNote({
      text: "4",
      font: {
        family: "Arial",
        size: 14,
        weight: "",
      },
      duration: "q",
    })
      .setLine(11)
      .setStave(Mesure_2)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);
    // On ajoute les notes
    maVoix4.addTickables([text21]);
    maVoix4.addTickables([text22]);
    maVoix4.addTickables([text23]);
    maVoix4.addTickables([text24]);
    maVoix3.addTickables(notesMesure_2);

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var monFormatter2 = new Vex.Flow.Formatter()
      .joinVoices([maVoix3, maVoix4])
      .format([maVoix3, maVoix4], 310);

    // on dessine la voix avec les notes sur la mesure et on dessine le texte des nuances

    maVoix3.draw(monContexte, Mesure_2);
    text21.setContext(monContexte).draw();
    text22.setContext(monContexte).draw();
    text23.setContext(monContexte).draw();
    text24.setContext(monContexte).draw();
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
