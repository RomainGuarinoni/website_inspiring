<template>
  <div class="box">
    <h1>Les nuances</h1>
    <!-- Audio à insérer-->
    <audio src="../assets/audio_structure/20201212220040.mp3" controls></audio>
    <p>Les nuances correspondent à différents niveaux d’intensité du son :</p>
    <!-- Portées-->
    <div id="porteeNuances"></div>
    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('partition')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('structure16')">Page précédente</p>
        <p class="link" @click="nav('structure18')">Page suivante</p>
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
    const monDiv = document.getElementById("porteeNuances");
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

    var Mesure_1 = new Vex.Flow.Stave(10, 0, 310);
    Mesure_1.addClef("treble")
      .addTimeSignature("4/4")
      .setContext(monContexte)
      .draw(); // Ajout d'une clé, chiffrage et dessin

    //Créations de notes

    var notesMesure_1 = [
      new Vex.Flow.StaveNote({
        keys: ["c##/5"],
        duration: "q",
        stem_direction: -1,
      }),
      new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
    ];

    //Création de 2 voix de 4 temps

    var maVoix1 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var maVoix2 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    //On ajoute des nuances
    var crescendo = new Vex.Flow.StaveHairpin(
      { first_note: notesMesure_1[0], last_note: notesMesure_1[3] },
      1
    );

    // On ajoute les notes et les nuances aux voix.

    maVoix1.addTickables(notesMesure_1);
    maVoix2.addTickables(notesMesure_1); //bien ajouter aux deux voix s'il n'y a pas de nuances "text"

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var monFormatter = new Vex.Flow.Formatter()
      .joinVoices([maVoix1, maVoix2])
      .format([maVoix1, maVoix2], 250);

    // on dessine la voix avec les notes sur la mesure 1 et on dessine le texte des nuances

    maVoix1.draw(monContexte, Mesure_1);
    crescendo.setContext(monContexte).draw();

    ///////////////////
    /////Mesure n°2////
    ///////////////////

    var Mesure_2 = new Vex.Flow.Stave(320, 0, 220); //attention à bien modifier la première valeur

    //On l'ajoute au contexte et on la dessine

    Mesure_2.setContext(monContexte).draw();

    //Création de notes

    var notesMesure_2 = [
      new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "h" }),
      new Vex.Flow.StaveNote({
        keys: ["c##/5"],
        duration: "h",
        stem_direction: -1,
      }),
    ];

    //Création de 2 voix de 4 temps

    var maVoix3 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var maVoix4 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    //On ajoute des nuances

    var nuance_forte = new Vex.Flow.TextNote({
      glyph: "f",
      duration: "w",
    })
      .setLine(12)
      .setStave(Mesure_2)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    // On ajoute les notes et les nuances aux voix.

    maVoix3.addTickables(notesMesure_2);
    maVoix4.addTickables([nuance_forte]);

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var monFormatter2 = new Vex.Flow.Formatter()
      .joinVoices([maVoix3, maVoix4])
      .format([maVoix3, maVoix4], 300);

    // on dessine la voix avec les notes sur la mesure et on dessine le texte des nuances

    maVoix3.draw(monContexte, Mesure_2);
    nuance_forte.setContext(monContexte).draw();

    ///////////////////
    /////Mesure n°3////
    //////////////////

    var Mesure_3 = new Vex.Flow.Stave(540, 0, 270); //attention à bien modifier la première valeur

    //On l'ajoute au contexte et on la dessine

    Mesure_3.setContext(monContexte).draw();

    //Création de notes

    var notesMesure_3 = [
      new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
      new Vex.Flow.StaveNote({
        keys: ["c##/5"],
        duration: "q",
        stem_direction: -1,
      }),
    ];

    //Création de 2 voix de 4 temps

    var maVoix5 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var maVoix6 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    //On ajoute des nuances

    var nuance_mf = new Vex.Flow.TextDynamics({
      //ATTENTION pour mf on utilise TextDynamics non Textnote
      text: "mf",
      duration: "w",
    })
      .setStave(Mesure_3)
      .setLine(12);

    // On ajoute les notes et les nuances aux voix.

    maVoix5.addTickables(notesMesure_3);
    maVoix6.addTickables([nuance_mf]);

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var monFormatter3 = new Vex.Flow.Formatter()
      .joinVoices([maVoix5, maVoix6])
      .format([maVoix5, maVoix6], 250);

    // on dessine la voix avec les notes sur la mesure et on dessine le texte des nuances

    maVoix5.draw(monContexte, Mesure_3);
    nuance_mf.setContext(monContexte).draw();

    ///////////////////
    /////Mesure n°4////
    //////////////////

    var Mesure_4 = new Vex.Flow.Stave(810, 0, 180); //attention à bien modifier la première valeur

    //On l'ajoute au contexte et on la dessine

    Mesure_4.setContext(monContexte).draw();

    //Création de notes

    var notesMesure_4 = [
      new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "h" }).addDot(0),
    ];

    //Création de 2 voix de 4 temps

    var maVoix7 = new Vex.Flow.Voice({ num_beats: 3, beat_value: 4 });
    var maVoix8 = new Vex.Flow.Voice({ num_beats: 3, beat_value: 4 });

    //Création de nuances

    var decrescendo = new Vex.Flow.StaveHairpin(
      { first_note: notesMesure_4[0], last_note: notesMesure_4[1] },
      2
    );

    // On ajoute les notes et les nuances aux voix.

    maVoix7.addTickables(notesMesure_4);
    maVoix8.addTickables(notesMesure_4);

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var monFormatter4 = new Vex.Flow.Formatter()
      .joinVoices([maVoix7, maVoix8])
      .format([maVoix7, maVoix8], 250);

    // on dessine la voix avec les notes sur la mesure et on dessine le texte des nuances

    maVoix7.draw(monContexte, Mesure_4);
    decrescendo.setContext(monContexte).draw();

    ///////////////////
    /////Mesure n°5////
    //////////////////

    var Mesure_5 = new Vex.Flow.Stave(990, 0, 120); //attention à bien modifier la première valeur

    //Barre de fin
    Mesure_5.mode = Vex.Flow.Voice.Mode.FULL;
    Mesure_5.setEndBarType(Vex.Flow.Barline.type.END);

    //On l'ajoute au contexte et on la dessine

    Mesure_5.setContext(monContexte).draw();

    //Création de notes

    var notesMesure_5 = [
      new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "w" }),
    ];

    //Création de 2 voix de 4 temps

    var maVoix9 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var maVoix10 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    //On ajoute des nuances

    var nuance_piano = new Vex.Flow.TextNote({
      glyph: "p",
      duration: "w",
    })
      .setLine(12)
      .setStave(Mesure_5)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    // On ajoute les notes et les nuances aux voix.

    maVoix9.addTickables(notesMesure_5);
    maVoix10.addTickables([nuance_piano]);

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var monFormatter5 = new Vex.Flow.Formatter()
      .joinVoices([maVoix9, maVoix10])
      .format([maVoix9, maVoix10], 100);

    // on dessine la voix avec les notes sur la mesure et on dessine le texte des nuances

    maVoix9.draw(monContexte, Mesure_5);
    nuance_piano.setContext(monContexte).draw();
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
