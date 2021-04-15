 <!--<template>
  <div class="box">
   //body sans boutons
    <h1>Fiche de révision : Améliore ton rythme</h1>
    <div id="rythmes">
      <h2>Les notes</h2>
      <div id="fiche_rythme_1"></div>
      <div id="fiche_rythme_2"></div>
      <div id="fiche_rythme_3"></div>
      <div id="fiche_rythme_4"></div>
    </div>

    <div id="silences">
      <h2>Les silences</h2>
      <div id="fiche_rythme_5"></div>
      <div id="fiche_rythme_6"></div>
      <div id="fiche_rythme_7"></div>
      <div id="fiche_rythme_8"></div>
    </div>

    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('rythme')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('rythme8')">Page précédente</p>
        <p class="link" @click="nav('rythme')">Page suivante</p>
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
    ////////////////////
    ////////NOIRE///////
    ////////////////////

    // Create an SVG renderer and attach it to the DIV element named "portée2".
    const div = document.getElementById("fiche_rythme_1");
    const renderer = new Vex.Flow.Renderer(div, Vex.Flow.Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(1300, 200); //attention de ne pas mettre trop fin
    const context1 = renderer.getContext();
    context1.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    ///////////////////////////////////////////////////
    /////////////Mesure 1/////////////////////////////
    /////////////////////////////////////////////////

    // Création d'une mesure
    var staveMeasure1 = new Vex.Flow.Stave(10, 0, 400);

    // on lui ajoute une clé (treble=clé de sol), on la connecte au context et on la dessine
    staveMeasure1
      .addClef("treble")
      .addTimeSignature("4/4")
      .setContext(context1)
      .draw();

    //////////////////////////////////////////////////////////////////////////////////////

    //Création de Notes dans un tableau
    var notesMeasure1 = [
      new Vex.Flow.StaveNote({
        keys: ["a/4"],
        duration: "q",
        stem_direction: -1,
      }),
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q" }),
    ];

    //Création de 2 voix de 4 temps
    var voice4 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var voice5 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    //On ajoute des pulsations
    var text11 = new Vex.Flow.TextNote({
      text: "1",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text12 = new Vex.Flow.TextNote({
      text: "2",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text13 = new Vex.Flow.TextNote({
      text: "3",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text14 = new Vex.Flow.TextNote({
      text: "4",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    // On ajoute les notes et le texte aux voix. Helper function to justify and draw a 4/4 voice
    voice4.addTickables(notesMeasure1);
    voice5.addTickables([text11]);
    voice5.addTickables([text12]);
    voice5.addTickables([text13]);
    voice5.addTickables([text14]);

    //On formatte et on joint les deux voix
    var formatter = new Vex.Flow.Formatter()
      .joinVoices([voice4, voice5])
      .format([voice4, voice5], 325);

    // on dessine la voix avec les notes sur la mesure 1 et on dessine le texte des nuances
    voice4.draw(context1, staveMeasure1);
    text11.setContext(context1).draw();
    text12.setContext(context1).draw();
    text13.setContext(context1).draw();
    text14.setContext(context1).draw();

    ////////////////////
    ///////Blanche//////
    ////////////////////

    // Create an SVG renderer and attach it to the DIV element named "portée2".
    const div2 = document.getElementById("fiche_rythme_2");
    const renderer2 = new Vex.Flow.Renderer(
      div2,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Configure the rendering context.
    renderer2.resize(1300, 200); //attention de ne pas mettre trop fin
    const context2 = renderer2.getContext();
    context2.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    ///////////////////////////////////////////////////
    /////////////Mesure 1/////////////////////////////
    /////////////////////////////////////////////////

    // Création d'une mesure
    var staveMeasure1 = new Vex.Flow.Stave(10, 0, 400);

    // on lui ajoute une clé (treble=clé de sol), on la connecte au context et on la dessine
    staveMeasure1
      .addClef("treble")
      .addTimeSignature("C")
      .setContext(context2)
      .draw();

    //////////////////////////////////////////////////////////////////////////////////////

    //Création de Notes dans un tableau
    var notesMeasure1 = [
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "2" }),
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "2" }),
    ];

    //Création de 2 voix de 4 temps
    var voice4 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var voice5 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    //On ajoute des pulsations
    var text11 = new Vex.Flow.TextNote({
      text: "1",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text12 = new Vex.Flow.TextNote({
      text: "2",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text13 = new Vex.Flow.TextNote({
      text: "3",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text14 = new Vex.Flow.TextNote({
      text: "4",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    // On ajoute les notes et le texte aux voix. Helper function to justify and draw a 4/4 voice
    voice4.addTickables(notesMeasure1);

    voice5.addTickables([text11]);
    voice5.addTickables([text12]);
    voice5.addTickables([text13]);
    voice5.addTickables([text14]);

    //On formatte et on joint les deux voix
    var formatter = new Vex.Flow.Formatter()
      .joinVoices([voice4, voice5])
      .format([voice4, voice5], 325);

    // on dessine la voix avec les notes sur la mesure 1 et on dessine le texte des nuances
    voice4.draw(context2, staveMeasure1);
    text14.setContext(context2).draw();
    text11.setContext(context2).draw();
    text12.setContext(context2).draw();
    text13.setContext(context2).draw();

    ////////////////////
    ///BLANCHE POINTEE//
    ////////////////////

    // on place la portée
    const div3 = document.getElementById("fiche_rythme_3");
    const renderer3 = new Vex.Flow.Renderer(
      div3,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Modification de paramètres
    renderer3.resize(1300, 200); //attention de ne pas mettre trop fin
    const context3 = renderer3.getContext();
    context3.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    ///////////////////
    /////Mesure n°3////
    //////////////////

    var Mesure_1 = new Vex.Flow.Stave(10, 0, 400);
    Mesure_1.addClef("treble")
      .addTimeSignature("4/4")
      .setContext(context3)
      .draw(); // Ajout d'une clé, chiffrage et dessin

    //Créations de notes

    var notesMesure_1 = [
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "2d" }).addDotToAll(),
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "4r" }),
    ];

    //Créations des batons
    var text1 = new Vex.Flow.TextNote({
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

    var text2 = new Vex.Flow.TextNote({
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

    var text3 = new Vex.Flow.TextNote({
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
    var text4 = new Vex.Flow.TextNote({
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

    // On ajoute les notes et les nuances aux voix.

    maVoix1.addTickables(notesMesure_1);
    maVoix2.addTickables([text1]); //bien ajouter aux deux voix s'il n'y a pas de nuances "text"
    maVoix2.addTickables([text2]);
    maVoix2.addTickables([text3]);
    maVoix2.addTickables([text4]);
    //On formatte et on joint les deux voix

    var monFormatter = new Vex.Flow.Formatter()
      .joinVoices([maVoix1, maVoix2])
      .format([maVoix1, maVoix2], 355);

    // on dessine la voix avec les notes sur la mesure 1

    maVoix1.draw(context3, Mesure_1);
    text1.setContext(context3).draw();
    text2.setContext(context3).draw();
    text3.setContext(context3).draw();
    text4.setContext(context3).draw();

    ////////////////////
    ////////RONDE///////
    ////////////////////

    // on place la portée
    const div4 = document.getElementById("fiche_rythme_4");
    const renderer4 = new Vex.Flow.Renderer(
      div4,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Modification de paramètres
    renderer4.resize(1300, 200); //attention de ne pas mettre trop fin
    const context4 = renderer4.getContext();
    context4.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    ///////////////////
    /////Mesure n°3////
    //////////////////

    var Mesure_1 = new Vex.Flow.Stave(10, 0, 400);
    Mesure_1.addClef("treble")
      .addTimeSignature("4/4")
      .setContext(context4)
      .draw(); // Ajout d'une clé, chiffrage et dessin

    //Créations de notes

    var notesMesure_1 = [
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "1" }),
    ];

    //Créations des batons
    var text1 = new Vex.Flow.TextNote({
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

    var text2 = new Vex.Flow.TextNote({
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

    var text3 = new Vex.Flow.TextNote({
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
    var text4 = new Vex.Flow.TextNote({
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

    // On ajoute les notes et les nuances aux voix.

    maVoix1.addTickables(notesMesure_1);
    maVoix2.addTickables([text1]); //bien ajouter aux deux voix s'il n'y a pas de nuances "text"
    maVoix2.addTickables([text2]);
    maVoix2.addTickables([text3]);
    maVoix2.addTickables([text4]);
    //On formatte et on joint les deux voix

    var monFormatter = new Vex.Flow.Formatter()
      .joinVoices([maVoix1, maVoix2])
      .format([maVoix1, maVoix2], 355);

    // on dessine la voix avec les notes sur la mesure 1

    maVoix1.draw(context4, Mesure_1);
    text1.setContext(context4).draw();
    text2.setContext(context4).draw();
    text3.setContext(context4).draw();
    text4.setContext(context4).draw();

    /////////////////
    /////Soupir//////
    /////////////////

    // on place la portée
    const div5 = document.getElementById("fiche_rythme_5");
    const renderer5 = new Vex.Flow.Renderer(
      div5,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Modification de paramètres
    renderer5.resize(1110, 200); //attention de ne pas mettre trop fin
    const context5 = renderer5.getContext();
    context5.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    ///////////////////
    /////Mesure n°5////
    //////////////////

    var Mesure_1 = new Vex.Flow.Stave(10, 0, 400);
    Mesure_1.addClef("treble")
      .addTimeSignature("4/4")
      .setContext(context5)
      .draw(); // Ajout d'une clé, chiffrage et dessin

    //Créations de notes

    var notesMesure_1 = [
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "4r" }),
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "4r" }),
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "4r" }),
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "4r" }),
    ];

    //Créations des batons
    var text1 = new Vex.Flow.TextNote({
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

    var text2 = new Vex.Flow.TextNote({
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

    var text3 = new Vex.Flow.TextNote({
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
    var text4 = new Vex.Flow.TextNote({
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

    // On ajoute les notes et les nuances aux voix.

    maVoix1.addTickables(notesMesure_1);
    maVoix2.addTickables([text1]); //bien ajouter aux deux voix s'il n'y a pas de nuances "text"
    maVoix2.addTickables([text2]);
    maVoix2.addTickables([text3]);
    maVoix2.addTickables([text4]);
    //On formatte et on joint les deux voix

    var monFormatter = new Vex.Flow.Formatter()
      .joinVoices([maVoix1, maVoix2])
      .format([maVoix1, maVoix2], 355);

    // on dessine la voix avec les notes sur la mesure 1

    maVoix1.draw(context5, Mesure_1);
    text1.setContext(context5).draw();
    text2.setContext(context5).draw();
    text3.setContext(context5).draw();
    text4.setContext(context5).draw();

    ///
    ///la demi pause
    ///

    // on place la portée
    const div6 = document.getElementById("fiche_rythme_6");
    const renderer6 = new Vex.Flow.Renderer(
      div6,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Modification de paramètres
    renderer6.resize(1110, 200); //attention de ne pas mettre trop fin
    const context6 = renderer6.getContext();
    context6.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    ///////////////////
    /////Mesure n°6////
    ///////////////////

    var Mesure_2 = new Vex.Flow.Stave(10, 0, 400); //attention à bien modifier la première valeur
    Mesure_2.addClef("treble")
      .addTimeSignature("4/4")
      .setContext(context6)
      .draw();
    //On l'ajoute au contexte et on la dessine

    Mesure_2.setContext(context6).draw();

    //Création de notes

    var notesMesure_2 = [
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "2r" }),
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "2r" }),
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

    var monFormatter2 = new Vex.Flow.Formatter()
      .joinVoices([maVoix3, maVoix4])
      .format([maVoix3, maVoix4], 310);

    // on dessine la voix avec les notes sur la mesure et on dessine le texte des nuances

    maVoix3.draw(context6, Mesure_2);
    text21.setContext(context6).draw();
    text22.setContext(context6).draw();
    text23.setContext(context6).draw();
    text24.setContext(context6).draw();

    ///
    ///Demi pause pointée
    ///

    // on place la portée
    const div7 = document.getElementById("fiche_rythme_7");
    const renderer7 = new Vex.Flow.Renderer(
      div7,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Modification de paramètres
    renderer7.resize(1110, 200); //attention de ne pas mettre trop fin
    const context7 = renderer7.getContext();
    context7.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    ///////////////////
    /////Mesure n°7////
    ///////////////////

    var Mesure_2 = new Vex.Flow.Stave(10, 0, 400); //attention à bien modifier la première valeur
    Mesure_2.addClef("treble")
      .addTimeSignature("4/4")
      .setContext(context7)
      .draw();
    //On l'ajoute au contexte et on la dessine

    Mesure_2.setContext(context7).draw();

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

    var monFormatter2 = new Vex.Flow.Formatter()
      .joinVoices([maVoix3, maVoix4])
      .format([maVoix3, maVoix4], 310);

    // on dessine la voix avec les notes sur la mesure et on dessine le texte des nuances

    maVoix3.draw(context7, Mesure_2);
    text21.setContext(context7).draw();
    text22.setContext(context7).draw();
    text23.setContext(context7).draw();
    text24.setContext(context7).draw();

    ///
    ///Ronde
    ///

    // on place la portée
    const div8 = document.getElementById("fiche_rythme_8");
    const renderer8 = new Vex.Flow.Renderer(
      div8,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Modification de paramètres
    renderer8.resize(1110, 200); //attention de ne pas mettre trop fin
    const context8 = renderer8.getContext();
    context8.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    ///////////////////
    /////Mesure n°8////
    ///////////////////

    var Mesure_2 = new Vex.Flow.Stave(10, 0, 400); //attention à bien modifier la première valeur
    Mesure_2.addClef("treble")
      .addTimeSignature("4/4")
      .setContext(context8)
      .draw();
    //On l'ajoute au contexte et on la dessine

    Mesure_2.setContext(context8).draw();

    //Création de notes

    var notesMesure_2 = [
      new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "1r" }),
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

    var monFormatter2 = new Vex.Flow.Formatter()
      .joinVoices([maVoix3, maVoix4])
      .format([maVoix3, maVoix4], 310);

    // on dessine la voix avec les notes sur la mesure et on dessine le texte des nuances

    maVoix3.draw(context8, Mesure_2);
    text21.setContext(context8).draw();
    text22.setContext(context8).draw();
    text23.setContext(context8).draw();
    text24.setContext(context8).draw();
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
