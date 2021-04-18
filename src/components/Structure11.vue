<template>
  <div class="box">
    <h1>Le chiffrage de mesure : exemples</h1>
    <!-- Audio à insérer-->
    <audio src="../assets/audio_structure/20201212215359.mp3" controls></audio>

    <div id="page11">
      <p>Ces deux notations veulent dire la même chose :</p>
    </div>
    <div id="notation">
      <img src="@/assets/quizPartition/C.png" alt="" />
      <p>veut dire la même chose que</p>
      <img src="@/assets/quizPartition/44.png" alt="" />
    </div>
    <p>
      Cette portée est donc constituée de <strong> mesures à 4 temps.</strong>
    </p>

    <!-- Portées-->
    <div id="porteeChiffrageC"></div>

    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('partition')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('structure10')">Page précédente</p>
        <p class="link" @click="nav('structure12')">Page suivante</p>
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
    // Create an SVG renderer and attach it to the DIV element named "portée2".
    const div2 = document.getElementById("porteeChiffrageC");
    const renderer2 = new Vex.Flow.Renderer(
      div2,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Configure the rendering context.
    renderer2.resize(900, 200); //attention de ne pas mettre trop fin
    const context2 = renderer2.getContext();
    context2.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    ///////////////////////////////////////////////////
    /////////////Mesure 1/////////////////////////////
    /////////////////////////////////////////////////

    // Création d'une mesure
    var staveMeasure1 = new Vex.Flow.Stave(10, 0, 310);

    // on lui ajoute une clé (treble=clé de sol), on la connecte au context et on la dessine
    staveMeasure1
      .addClef("treble")
      .addTimeSignature("C")
      .setContext(context2)
      .draw();

    //////////////////////////////////////////////////////////////////////////////////////

    //Création de Notes dans un tableau
    var notesMeasure1 = [
      new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "h" }),
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "hr" }),
    ];

    //Création de 2 voix de 4 temps
    var voice4 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var voice5 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    //voix rajoutées pour le texte
    var voice51 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    //On ajoute du texte
    var text1 = new Vex.Flow.TextNote({
      text: "2",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text11 = new Vex.Flow.TextNote({
      text: "+",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text12 = new Vex.Flow.TextNote({
      text: "2",
      duration: "h",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text155 = new Vex.Flow.TextNote({
      text: "=",
      duration: "q",
    })
      .setLine(16)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text1555 = new Vex.Flow.TextNote({
      text: "4 temps ",
      duration: "hd",
    })
      .setLine(16)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    // On ajoute les notes et le texte aux voix. Helper function to justify and draw a 4/4 voice
    voice4.addTickables(notesMeasure1);
    voice5.addTickables([text1]);
    voice5.addTickables([text11]);
    voice5.addTickables([text12]);

    voice51.addTickables([text155]);
    voice51.addTickables([text1555]);

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var formatter = new Vex.Flow.Formatter()
      .joinVoices([voice4, voice5, voice51])
      .format([voice4, voice5, voice51], 250);

    // on dessine la voix avec les notes sur la mesure 1 et on dessine le texte des nuances
    voice4.draw(context2, staveMeasure1);
    text1.setContext(context2).draw();
    text11.setContext(context2).draw();
    text12.setContext(context2).draw();
    text155.setContext(context2).draw();
    text1555.setContext(context2).draw();

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////2e mesure///////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    // measure 3 - juxtaposing second measure next to first measure
    var staveMeasure3 = new Vex.Flow.Stave(320, 0, 310);

    //On l'ajoute au contexte et on la dessine
    staveMeasure3.setContext(context2).draw();

    //voix
    var voice6 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var voice7 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var voice71 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    //Notes
    var notesMeasure3 = [
      new Vex.Flow.StaveNote({
        keys: ["c##/5"],
        duration: "hd",
        stem_direction: -1,
      }).addDot(0),
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
    ];

    //texte
    var text3 = new Vex.Flow.TextNote({
      text: "3",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text31 = new Vex.Flow.TextNote({
      text: "+",
      duration: "h",
    })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text311 = new Vex.Flow.TextNote({
      text: "1",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text322 = new Vex.Flow.TextNote({
      text: "= ",
      duration: "q",
    })
      .setLine(16)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text3222 = new Vex.Flow.TextNote({
      text: "4 temps ",
      duration: "hd",
    })
      .setLine(16)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    // On ajoute les notes et le texte a des voix. Helper function to justify and draw a 4/4 voice
    voice6.addTickables(notesMeasure3);

    voice7.addTickables([text3]);
    voice7.addTickables([text31]);
    voice7.addTickables([text311]);

    voice71.addTickables([text322]);
    voice71.addTickables([text3222]);
    // eslint-disable-next-line no-unused-vars
    var formatter3 = new Vex.Flow.Formatter()
      .joinVoices([voice6, voice7, voice71])
      .format([voice6, voice7, voice71], 250);

    voice6.draw(context2, staveMeasure3);
    voice7.draw(context2, staveMeasure3);

    text3.setContext(context2).draw();
    text31.setContext(context2).draw();
    text311.setContext(context2).draw();
    text322.setContext(context2).draw();
    text3222.setContext(context2).draw();

    //////////////////////////////////////////////////////////////////////
    ///////////////////3e mesure//////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////

    // measure 2 - juxtaposing second measure next to first measure
    var staveMeasure2 = new Vex.Flow.Stave(630, 0, 250);

    //Barre de fin
    staveMeasure2.mode = Vex.Flow.Voice.Mode.FULL;
    staveMeasure2.setEndBarType(Vex.Flow.Barline.type.END);

    //On l'ajoute au contexte et on la dessine
    staveMeasure2.setContext(context2).draw();

    //voix
    var voice2 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var voice3 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    //Notes
    var notesMeasure2 = [
      new Vex.Flow.StaveNote({
        keys: ["d##/5"],
        duration: "wr",
        align_center: true,
      }),
    ];

    //Texte

    var text2 = new Vex.Flow.TextNote({
      text: "=",
      duration: "q",
    })
      .setLine(16)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.RIGHT);

    var text21 = new Vex.Flow.TextNote({
      text: "4 temps",
      duration: "hd",
    })
      .setLine(16)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.RIGHT);

    // On ajoute les notes et le texte a des voix. Helper function to justify and draw a 4/4 voice
    voice2.addTickables(notesMeasure2);
    voice3.addTickables([text2]);
    voice3.addTickables([text21]);
    // eslint-disable-next-line no-unused-vars
    var formatter2 = new Vex.Flow.Formatter()
      .joinVoices([voice2, voice3])
      .format([voice2, voice3], 200);

    voice2.draw(context2, staveMeasure2);
    voice3.draw(context2, staveMeasure2);

    text2.setContext(context2).draw();
    text21.setContext(context2).draw();
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
#notation {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
