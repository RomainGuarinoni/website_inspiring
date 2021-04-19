<template>
  <div class="box">
    <h1>Lecture des notes</h1>
    <h2>Le Fa</h2>
    <audio src="@/assets/Note/Fa.mp3" controls></audio>
    <div id="note_portee_fa"></div>
    <p>
      Tu dois l’avoir compris, en clé de Sol, plus une note est haute sur la
      portée, plus elle est aigu.
    </p>
    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('note')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('Note4')">Page précédente</p>
        <p class="link" @click="nav('Note6')">Page suivante</p>
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
    const monDiv = document.getElementById("note_portee_fa");
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

    var Mesure_1 = new Vex.Flow.Stave(355, 0, 410);
    Mesure_1.setEndBarType(Vex.Flow.Barline.type.END);
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

    //On change la couleur de la note
    notesMesure_1[3].setStyle({ fillStyle: "red", strokeStyle: "red" });

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
      text: "Ceci est un fa",
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
      .format([maVoix1, maVoix2], 355);

    // on dessine la voix avec les notes sur la mesure 1
    maVoix1.draw(monContexte, Mesure_1);
    textDo.setContext(monContexte).draw();
    textRe.setContext(monContexte).draw();
    textMi.setContext(monContexte).draw();
    textFa.setContext(monContexte).draw();
  },
};
</script>

<style></style>
