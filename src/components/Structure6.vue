<template>
  <div class="box">
    <h1>Les mesures</h1>

    <!-- Audio à insérer-->
    <audio src="../assets/audio_structure/20201212214620.mp3" controls></audio>

    <p>La portée ci-dessous comporte 3 mesures.</p>
    <p>Une mesure est l’espace situé entre deux barres noires.</p>

    <!-- Portée avec mesures vides-->
    <div id="porteeMesuresVides"></div>

    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('partition')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('structure5')">Page précédente</p>
        <p class="link" @click="nav('structure7')">Page suivante</p>
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
    const div2 = document.getElementById("porteeMesuresVides");
    const renderer2 = new Vex.Flow.Renderer(
      div2,
      Vex.Flow.Renderer.Backends.SVG
    );

    // Configure the rendering context.
    renderer2.resize(650, 200); //attention de ne pas mettre trop fin
    const context2 = renderer2.getContext();
    context2.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Création d'une mesure
    var staveMeasure1 = new Vex.Flow.Stave(10, 0, 200);

    // on lui ajoute une clé (treble=clé de sol), on la connecte au context et on la dessine
    staveMeasure1
      .addClef("treble")
      .setContext(context2)
      .draw();
    var notesMeasure1 = [
      new Vex.Flow.GhostNote({ keys: ["c/4"], duration: "1" }),
    ];

    var text1 = new Vex.Flow.TextNote({
      text: "Mesure 1",
      font: {
        family: "Arial",
        size: 14,
        weight: "",
      },
      duration: "1",
    })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var voice1 = new Vex.Flow.Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION,
    });
    var voice2 = new Vex.Flow.Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION,
    });
    voice1.addTickables(notesMeasure1);
    voice2.addTickables([text1]);
    // eslint-disable-next-line no-unused-vars
    var monFormatter = new Vex.Flow.Formatter()
      .joinVoices([voice1, voice2])
      .format([voice1, voice2], 355);
    voice1.draw(context2, staveMeasure1);
    text1.setContext(context2).draw();

    ////////////////////2e mesure///////////////////////////////////////////////////

    // measure 3 - juxtaposing second measure next to first measure
    var staveMeasure3 = new Vex.Flow.Stave(210, 0, 200);

    //On l'ajoute au contexte et on la dessine
    staveMeasure3.setContext(context2).draw();
    var notesMeasure2 = [
      new Vex.Flow.GhostNote({ keys: ["c/4"], duration: "1" }),
    ];

    var text2 = new Vex.Flow.TextNote({
      text: "Mesure 2",
      font: {
        family: "Arial",
        size: 14,
        weight: "",
      },
      duration: "1",
    })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var voice3 = new Vex.Flow.Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION,
    });
    var voice4 = new Vex.Flow.Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION,
    });
    voice3.addTickables(notesMeasure2);
    voice4.addTickables([text2]);
    // eslint-disable-next-line no-unused-vars
    var monFormatter2 = new Vex.Flow.Formatter()
      .joinVoices([voice3, voice4])
      .format([voice3, voice4], 355);
    voice3.draw(context2, staveMeasure3);
    text2.setContext(context2).draw();

    ///////////////////3e mesure//////////////////////////////////////////

    // measure 2 - juxtaposing second measure next to first measure
    var staveMeasure2 = new Vex.Flow.Stave(410, 0, 200);
    staveMeasure2.setContext(context2).draw();
    var notesMeasure3 = [
      new Vex.Flow.GhostNote({ keys: ["c/4"], duration: "1" }),
    ];

    var text3 = new Vex.Flow.TextNote({
      text: "Mesure 3",
      font: {
        family: "Arial",
        size: 14,
        weight: "",
      },
      duration: "1",
    })
      .setLine(12)
      .setStave(staveMeasure2)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    var voice5 = new Vex.Flow.Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION,
    });
    var voice6 = new Vex.Flow.Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION,
    });
    voice5.addTickables(notesMeasure3);
    voice6.addTickables([text3]);
    // eslint-disable-next-line no-unused-vars
    var monFormatter3 = new Vex.Flow.Formatter()
      .joinVoices([voice5, voice6])
      .format([voice5, voice6], 355);
    voice5.draw(context2, staveMeasure2);
    text3.setContext(context2).draw();

    //Barre de fin
    /*staveMeasure2.mode = Vex.Flow.Voice.Mode.FULL;
staveMeasure2.setEndBarType(Vex.Flow.Barline.type.END);*/

    //On l'ajoute au contexte et on la dessine
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
