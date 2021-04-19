<template>
  <div class="box">
    <h1>Lecture des notes</h1>
    <h2>Le Sol</h2>
    <audio src="@/assets/Note/Sol.mp3" controls></audio>
    <div id="note_portee_sol"></div>
    <p>
      Tu dois l’avoir compris, en clé de Sol, plus une note est haute sur la
      portée, plus elle est aigu.
    </p>
    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('note')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('Note5')">Page précédente</p>
        <p class="link" @click="nav('Note7')">Page suivante</p>
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
    // on place la portée
    // on place la portée
    const monDiv = document.getElementById("note_portee_sol");
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
      new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "4" }),
      new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "4" }),
      new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "4" }),
      new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "4" }),
    ];

    //On écrit le texte sous la partition
    var textDo = new Vex.Flow.TextNote({
      text: "Do",
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

    var textRe = new Vex.Flow.TextNote({
      text: "Ré",
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

    var textMi = new Vex.Flow.TextNote({
      text: "Mi ",
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
    var textFa = new Vex.Flow.TextNote({
      text: "Fa",
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
    maVoix2.addTickables([textDo]);
    maVoix2.addTickables([textRe]);
    maVoix2.addTickables([textMi]);
    maVoix2.addTickables([textFa]);

    //On formatte et on joint les deux voix

    // eslint-disable-next-line no-unused-vars
    var monFormatter = new Vex.Flow.Formatter()
      .joinVoices([maVoix1, maVoix2])
      .format([maVoix1, maVoix2], 250);

    // on dessine la voix avec les notes sur la mesure 1
    maVoix1.draw(monContexte, Mesure_1);
    textDo.setContext(monContexte).draw();
    textRe.setContext(monContexte).draw();
    textMi.setContext(monContexte).draw();
    textFa.setContext(monContexte).draw();

    ///////////////////
    /////Mesure n°2////
    ///////////////////

    var Mesure_2 = new Vex.Flow.Stave(560, 0, 310); //attention à bien modifier la première valeur

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

    //On change la couleur de la note
    notesMesure_2[0].setStyle({ fillStyle: "red", strokeStyle: "red" });

    //Création de 2 voix de 4 temps
    var maVoix3 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var maVoix4 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    var textSol = new Vex.Flow.TextNote({
      text: "Ceci est un Sol",
      font: {
        family: "Arial",
        size: 14,
        weight: "",
      },
      duration: "w",
    })
      .setLine(11)
      .setStave(Mesure_2)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    // On ajoute les notes
    maVoix4.addTickables([textSol]);
    maVoix3.addTickables(notesMesure_2);

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var monFormatter2 = new Vex.Flow.Formatter()
      .joinVoices([maVoix3, maVoix4])
      .format([maVoix3, maVoix4], 300);

    // on dessine la voix avec les notes sur la mesure et on dessine le texte des nuances

    maVoix3.draw(monContexte, Mesure_2);
    textSol.setContext(monContexte).draw();
  },
};
</script>

<style></style>
