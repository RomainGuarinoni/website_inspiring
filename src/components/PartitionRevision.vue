<template>
  <div class="box">
    <Navbar class="navbar" type="3" :year="year" />
    <div id="bodyContainer">
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour</p>
      </div>
      <h1>Fiche de révision : Apprends à lire une partition</h1>
      <!--Chiffrage-->
      <div id="part1">
        <div id="metrics">
          <figure>
            <img src="@/assets/images/24.png" alt="" class="metric" />
            <figcaption>2 temps par mesure</figcaption>
          </figure>
          <figure>
            <img src="@/assets/images/34.png" alt="" class="metric" />
            <figcaption>3 temps par mesure</figcaption>
          </figure>
          <figure>
            <img src="@/assets/images/44.png" alt="" class="metric" />
            <figcaption>4 temps par mesure</figcaption>
          </figure>
        </div>

        <!--Système-->
        <div id="systemeComplet"></div>
      </div>

      <!-- Portée-->
      <div class="container">
        <div id="portee"></div>
      </div>

      <!--Nuances-->
      <div id="part3">
        <div id="nuances1">
          <figure>
            <img src="@/assets/images/piano.png" alt="" class="nuance" />
            <figcaption>piano : doux</figcaption>
          </figure>
          <figure>
            <img src="@/assets/images/mf.png" alt="" class="nuance" />
            <figcaption>mezzo-forte : moyennement fort</figcaption>
          </figure>
          <figure>
            <img src="@/assets/images/forte.png" alt="" class="nuance" />
            <figcaption>forte : fort</figcaption>
          </figure>
        </div>

        <div id="nuances2">
          <figure>
            <img src="@/assets/images/decrescendo.jpg" alt="" />
            <figcaption>decrescendo : de moins en moins fort</figcaption>
          </figure>
          <figure>
            <img src="@/assets/images/crescendo.png" alt="" />
            <figcaption>crescendo : de plus en plus fort</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Vex from "vexflow";
export default {
  props: ["year"],
  components: {
    Navbar,
  },
  methods: {
    retour() {
      this.$router.push({ name: "partition" });
    },
  },
  mounted: function() {
    // on place la portée
    const monDiv = document.getElementById("portee");
    const monRenderer = new Vex.Flow.Renderer(
      monDiv,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Modification de paramètres
    monRenderer.resize(1300, 240); //attention de ne pas mettre trop fin
    const monContexte = monRenderer.getContext();
    monContexte.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    ///////////////////
    /////Mesure n°1////
    //////////////////

    var Mesure_1 = new Vex.Flow.Stave(10, 10, 310);
    Mesure_1.addClef("treble")
      .addTimeSignature("4/4")
      .setText("une mesure de 4 temps", Vex.Flow.Modifier.Position.ABOVE)
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

    var Mesure_2 = new Vex.Flow.Stave(320, 10, 220); //attention à bien modifier la première valeur

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

    var Mesure_3 = new Vex.Flow.Stave(540, 10, 270); //attention à bien modifier la première valeur

    //On l'ajoute au contexte et on la dessine

    Mesure_3.setText("une b", Vex.Flow.Modifier.Position.ABOVE, {
      shift_y: -10,
      justification: Vex.Flow.TextNote.Justification.RIGHT,
    })
      .setText("de m", Vex.Flow.Modifier.Position.ABOVE, {
        shift_y: 10,
        justification: Vex.Flow.TextNote.Justification.RIGHT,
      })
      .setContext(monContexte)
      .draw();

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

    var Mesure_4 = new Vex.Flow.Stave(810, 10, 180); //attention à bien modifier la première valeur

    //On l'ajoute au contexte et on la dessine

    Mesure_4.setText("arre", Vex.Flow.Modifier.Position.ABOVE, {
      shift_y: -10,
      justification: Vex.Flow.TextNote.Justification.LEFT,
    })
      .setText("esure", Vex.Flow.Modifier.Position.ABOVE, {
        shift_y: 10,
        justification: Vex.Flow.TextNote.Justification.LEFT,
      })
      .setContext(monContexte)
      .draw();

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

    var Mesure_5 = new Vex.Flow.Stave(990, 10, 120); //attention à bien modifier la première valeur

    //Barre de fin
    Mesure_5.mode = Vex.Flow.Voice.Mode.FULL;
    Mesure_5.setEndBarType(Vex.Flow.Barline.type.END);

    //On l'ajoute au contexte et on la dessine

    Mesure_5.setContext(monContexte)
      .setText("une barre de fin", Vex.Flow.Modifier.Position.RIGHT, {
        shift_y: -10,
      })
      .setText("(ou double barre)", Vex.Flow.Modifier.Position.RIGHT, {
        shift_y: 10,
      })
      .draw();

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
    // on place la portée
    const div = document.getElementById("systemeComplet");
    const renderer = new Vex.Flow.Renderer(div, Vex.Flow.Renderer.Backends.SVG);

    // Modification de paramètres
    renderer.resize(620, 280);
    const ctx = renderer.getContext();
    ctx.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    ///////////
    //Mesure 1
    ///////////

    var stave1 = new Vex.Flow.Stave(120, 0, 350)
      .addTrebleGlyph()
      .addTimeSignature("4/4")
      .setText("Clé de sol", Vex.Flow.Modifier.Position.LEFT)
      .setText("Un système", Vex.Flow.Modifier.Position.RIGHT, { shift_y: 0 })
      .setText(" constitué de", Vex.Flow.Modifier.Position.RIGHT, {
        shift_y: 50,
        justification: Vex.Flow.TextNote.Justification.CENTER,
      })
      .setText("2 portées", Vex.Flow.Modifier.Position.RIGHT, { shift_y: 100 })
      .setContext(ctx)
      .draw();

    //Créations de notes

    var notesStave1 = [
      new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "h" }),
    ];

    //Création de 2 voix de 4 temps

    var Voix1 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var Voix2 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    //On ajoute des nuances
    var decrescendo2 = new Vex.Flow.StaveHairpin(
      { first_note: notesStave1[0], last_note: notesStave1[2] },
      2
    );

    // On ajoute les notes et les nuances aux voix.

    Voix1.addTickables(notesStave1);
    Voix2.addTickables(notesStave1); //bien ajouter aux deux voix s'il n'y a pas de nuances "text"

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var Formatter = new Vex.Flow.Formatter()
      .joinVoices([Voix1, Voix2])
      .format([Voix1, Voix2], 260);

    // on dessine la voix avec les notes sur la mesure 1 et on dessine le texte des nuances

    Voix1.draw(ctx, stave1);
    decrescendo2.setContext(ctx).draw();

    ///////////
    //Mesure 2
    //////////

    var stave2 = new Vex.Flow.Stave(120, 100, 350)
      .addClef("bass")
      .addTimeSignature("4/4")
      .setText("Clé de fa", Vex.Flow.Modifier.Position.LEFT)
      .setContext(ctx)
      .draw();

    //Création de notes

    var notesStave2 = [
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
      new Vex.Flow.StaveNote({
        keys: ["c##/5"],
        duration: "q",
        stem_direction: -1,
      }),
    ];

    //Création de 2 voix de 4 temps

    var Voix5 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var Voix6 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    //On ajoute des nuances

    /*var nuance_mf = new Vex.Flow.TextDynamics({ //ATTENTION pour mf on utilise TextDynamics non Textnote
    text: 'mf',
    duration:"w",
  }).setStave(stave2)
    .setLine(12);*/

    // On ajoute les notes et les nuances aux voix.

    Voix5.addTickables(notesStave2);
    Voix6.addTickables(notesStave2);

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var Formatter2 = new Vex.Flow.Formatter()
      .joinVoices([Voix5, Voix6])
      .format([Voix5, Voix6], 260);

    //Voix6.addTickables([nuance_mf]);
    Voix5.draw(ctx, stave2);

    // on dessine la voix avec les notes sur la mesure et on dessine le texte des nuances

    //Création du système avec une accolade
    new Vex.Flow.StaveConnector(stave1, stave2)
      .setType(Vex.Flow.StaveConnector.type.BRACE)
      .setContext(ctx)
      .draw();

    //Barre de fin
    stave1.setEndBarType(Vex.Flow.Barline.type.END);
    stave2.setEndBarType(Vex.Flow.Barline.type.END);
    var connector = new Vex.Flow.StaveConnector(stave1, stave2);
    connector.setType(Vex.Flow.StaveConnector.type.BOLD_DOUBLE_RIGHT);
    connector.setContext(ctx).draw();
  },
};
</script>

<style scoped>
.box {
  width: 100vw;
  min-width: 1300px;
  margin: 0;
  text-align: center;
  height: 100vh;
}
/*.box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}*/

h1 {
  font-family: "Redressed", serif;
  color: #05ace9;
}

#bodyContainer {
  margin: auto;
  width: 90vw;
  min-width: 1300px;
  border: solid #05ace9 3px;
  border-radius: 15px;
}

#part1 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

#part1 div {
  height: 250px;
  margin: 20px 0;
}

figure {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 0;
}

figure figcaption {
  font-family: "Redressed", serif;
  font-size: 20px;
}

#metrics {
  border: solid #05ace9 3px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 45vw;
  max-width: 350px;
}

.metric {
  height: 50px;
  width: auto;
}

#container {
  position: relative;
}

#systemeComplet {
  border: solid #05ace9 3px;
  border-radius: 15px;
  display: inline-block;
  width: 620px;
}

#portee {
  width: 1300px;
  margin: auto;
}

#part3 {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  flex-wrap: wrap;
}

#part3 div {
  border: solid #05ace9 3px;
  border-radius: 15px;
  margin: 20px 0;
}

#nuances2,
#nuances1 {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
}

.nuance {
  height: 50px;
}
.retour {
  display: flex;
  align-items: center;
  font-size: 20px;
  border: 2px solid var(--blue);
  padding: 8px;
  border-radius: 15px;
  position: absolute;
  top: 150px;
  color: var(--blue);
  left: 140px;
  cursor: pointer;
  transition: all ease 200ms;
}
.retour:hover {
  box-shadow: 2px 2px 10px #06446b5e;
}
#chevron {
  margin: 5px;
}
</style>
