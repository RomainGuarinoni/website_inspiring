<template>
  <div class="box">
    <h1>Le chiffrage de mesure : exemples</h1>
    <!-- Audio à insérer-->
    <audio src="../assets/audio_structure/20201212215728.mp3" controls></audio>
    <p>
      Ci-dessous, le chiffre du haut est 3 : il y a donc l'équivalent de 3
      noires par mesures. Cette portée est donc constituée de
      <strong> mesures à 3 temps.</strong>
    </p>

    <!-- Portées-->
    <div id="porteeChiffrage34"></div>

    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('partition')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('structure12')">Page précédente</p>
        <p class="link" @click="nav('structure14')">Page suivante</p>
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
    const div2 = document.getElementById("porteeChiffrage34");
    const renderer2 = new Vex.Flow.Renderer(
      div2,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Configure the rendering context.
    renderer2.resize(1100, 200); //attention de ne pas mettre trop fin
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
      .addTimeSignature("3/4")
      .setContext(context2)
      .draw();

    //////////////////////////////////////////////////////////////////////////////////////

    //Création de Notes dans un tableau
    var notesMeasure1 = [
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q" }),
      new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q" }),
    ];

    //Création de 2 voix de 4 temps
    var voice4 = new Vex.Flow.Voice({ num_beats: 3, beat_value: 4 });
    var voice5 = new Vex.Flow.Voice({ num_beats: 3, beat_value: 4 });

    //voix rajoutées pour le texte
    var voice51 = new Vex.Flow.Voice({ num_beats: 3, beat_value: 4 });

    //On ajoute du texte
    var text1 = new Vex.Flow.TextNote({
      text: "1",
      duration: "8",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text11 = new Vex.Flow.TextNote({
      text: "+",
      duration: "8",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text12 = new Vex.Flow.TextNote({
      text: "1",
      duration: "8",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text13 = new Vex.Flow.TextNote({
      text: "+",
      duration: "8",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text14 = new Vex.Flow.TextNote({
      text: "1",
      duration: "q",
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

    var text166 = new Vex.Flow.TextNote({
      text: "3 temps ",
      duration: "h",
    })
      .setLine(16)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    // On ajoute les notes et le texte aux voix. Helper function to justify and draw a 4/4 voice
    voice4.addTickables(notesMeasure1);
    voice5.addTickables([text1]);
    voice5.addTickables([text11]);
    voice5.addTickables([text12]);
    voice5.addTickables([text13]);
    voice5.addTickables([text14]);

    voice51.addTickables([text155]);
    voice51.addTickables([text166]);

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
    text13.setContext(context2).draw();
    text14.setContext(context2).draw();
    text155.setContext(context2).draw();
    text166.setContext(context2).draw();

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////2e mesure///////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    // measure 3 - juxtaposing second measure next to first measure
    var staveMeasure3 = new Vex.Flow.Stave(320, 0, 250);

    //On l'ajoute au contexte et on la dessine
    staveMeasure3.setContext(context2).draw();

    //voix
    var voice6 = new Vex.Flow.Voice({ num_beats: 3, beat_value: 4 });
    var voice7 = new Vex.Flow.Voice({ num_beats: 3, beat_value: 4 });
    var voice71 = new Vex.Flow.Voice({ num_beats: 3, beat_value: 4 });

    //Notes
    var notesMeasure3 = [
      new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "h" }),
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
    ];

    //texte
    var text3 = new Vex.Flow.TextNote({
      text: "2",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text31 = new Vex.Flow.TextNote({
      text: "+",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text32 = new Vex.Flow.TextNote({
      text: "1",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text333 = new Vex.Flow.TextNote({
      text: "= ",
      duration: "q",
    })
      .setLine(16)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text344 = new Vex.Flow.TextNote({
      text: "3 temps ",
      duration: "h",
    })
      .setLine(16)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    // On ajoute les notes et le texte a des voix. Helper function to justify and draw a 4/4 voice
    voice6.addTickables(notesMeasure3);

    voice7.addTickables([text3]);
    voice7.addTickables([text31]);
    voice7.addTickables([text32]);

    voice71.addTickables([text333]);
    voice71.addTickables([text344]);
    // eslint-disable-next-line no-unused-vars
    var formatter3 = new Vex.Flow.Formatter()
      .joinVoices([voice6, voice7, voice71])
      .format([voice6, voice7, voice71], 200);

    voice6.draw(context2, staveMeasure3);
    voice7.draw(context2, staveMeasure3);

    text3.setContext(context2).draw();
    text31.setContext(context2).draw();
    text32.setContext(context2).draw();
    text333.setContext(context2).draw();
    text344.setContext(context2).draw();

    //////////////////////////////////////////////////////////////////////
    ///////////////////3e mesure//////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////

    // measure 4 - juxtaposing second measure next to first measure
    var staveMeasure4 = new Vex.Flow.Stave(570, 0, 250);

    //On l'ajoute au contexte et on la dessine
    staveMeasure4.setContext(context2).draw();

    //voix
    var voice8 = new Vex.Flow.Voice({ num_beats: 3, beat_value: 4 });
    var voice9 = new Vex.Flow.Voice({ num_beats: 3, beat_value: 4 });

    //Notes
    var notesMeasure4 = [
      new Vex.Flow.StaveNote({
        keys: ["g/4"],
        duration: "hd",
        align_center: true,
      }).addDot(0),
    ];

    //Texte

    var text4 = new Vex.Flow.TextNote({
      text: "=",
      duration: "q",
    })
      .setLine(16)
      .setStave(staveMeasure4)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text41 = new Vex.Flow.TextNote({
      text: "3 temps",
      duration: "h",
    })
      .setLine(16)
      .setStave(staveMeasure4)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    // On ajoute les notes et le texte a des voix. Helper function to justify and draw a 4/4 voice
    voice8.addTickables(notesMeasure4);
    voice9.addTickables([text4]);
    voice9.addTickables([text41]);
    // eslint-disable-next-line no-unused-vars
    var formatter4 = new Vex.Flow.Formatter()
      .joinVoices([voice8, voice9])
      .format([voice8, voice9], 200);

    voice8.draw(context2, staveMeasure4);
    voice9.draw(context2, staveMeasure4);

    text4.setContext(context2).draw();
    text41.setContext(context2).draw();

    //////////////////////////////////////////////////////////////////////
    ///////////////////3e mesure//////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////

    // measure 2 - juxtaposing second measure next to first measure
    var staveMeasure2 = new Vex.Flow.Stave(820, 0, 250);

    //Barre de fin
    staveMeasure2.mode = Vex.Flow.Voice.Mode.FULL;
    staveMeasure2.setEndBarType(Vex.Flow.Barline.type.END);

    //On l'ajoute au contexte et on la dessine
    staveMeasure2.setContext(context2).draw();

    //voix
    var voice2 = new Vex.Flow.Voice({ num_beats: 3, beat_value: 4 });
    var voice3 = new Vex.Flow.Voice({ num_beats: 3, beat_value: 4 });

    var voice31 = new Vex.Flow.Voice({ num_beats: 3, beat_value: 4 });
    //Notes
    var notesMeasure2 = [
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "hr" }),
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
    ];

    //Texte

    var text2 = new Vex.Flow.TextNote({
      text: "2",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text21 = new Vex.Flow.TextNote({
      text: "+",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text22 = new Vex.Flow.TextNote({
      text: "1",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text233 = new Vex.Flow.TextNote({
      text: "=",
      duration: "q",
    })
      .setLine(16)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var text244 = new Vex.Flow.TextNote({
      text: "3 temps",
      duration: "h",
    })
      .setLine(16)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    // On ajoute les notes et le texte a des voix. Helper function to justify and draw a 4/4 voice
    voice2.addTickables(notesMeasure2);
    voice3.addTickables([text2]);
    voice3.addTickables([text21]);
    voice3.addTickables([text22]);

    voice31.addTickables([text233]);
    voice31.addTickables([text244]);
    // eslint-disable-next-line no-unused-vars
    var formatter2 = new Vex.Flow.Formatter()
      .joinVoices([voice2, voice3, voice31])
      .format([voice2, voice3, voice31], 200);

    voice2.draw(context2, staveMeasure2);
    voice3.draw(context2, staveMeasure2);
    voice31.draw(context2, staveMeasure2);

    text2.setContext(context2).draw();
    text21.setContext(context2).draw();
    text22.setContext(context2).draw();
    text233.setContext(context2).draw();
    text244.setContext(context2).draw();
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
