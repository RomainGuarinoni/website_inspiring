<template>
  <div class="box">
    <h1>Le chiffrage de mesure : exemples</h1>

    <!-- Audio à insérer-->
    <audio src="../assets/audio_structure/20201212215452.mp3" controls></audio>

    <p>Chaque mesure est donc constituée de <strong> 4 pulsations</strong> !</p>

    <!-- Portées-->
    <div id="porteeChiffrage44Pulsations"></div>
    <div id="porteeChiffrageCpulsations"></div>

    <div class="boutons">
      <div class="left">
        <p class="link" @click="nav('partition')">Retour au menu</p>
      </div>
      <div class="right">
        <p class="link" @click="nav('structure11')">Page précédente</p>
        <p class="link" @click="nav('structure13')">Page suivante</p>
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
    const div = document.getElementById("porteeChiffrageCpulsations");
    const renderer = new Vex.Flow.Renderer(div, Vex.Flow.Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(1000, 200); //attention de ne pas mettre trop fin
    const context = renderer.getContext();
    context.setFont("Arial", 80, "bold").setBackgroundFillStyle("#eed");

    ///////////////////////////////////////////////////
    /////////////Mesure 1/////////////////////////////
    /////////////////////////////////////////////////

    // Création d'une mesure
    var staveMeasure1 = new Vex.Flow.Stave(10, 0, 400);

    // on lui ajoute une clé (treble=clé de sol), on la connecte au context et on la dessine
    staveMeasure1
      .addClef("treble")
      .addTimeSignature("C")
      .setContext(context)
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

    //On ajoute des pulsations
    var text1 = new Vex.Flow.TextNote({
      text: "|",
      duration: "q",
    });
    text1
      .setStyle({
        fillStyle: "red",
      })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text11 = new Vex.Flow.TextNote({
      text: "|",
      duration: "q",
    });
    text11
      .setStyle({
        fillStyle: "red",
      })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text12 = new Vex.Flow.TextNote({
      text: "|",
      duration: "q",
    });
    text12
      .setStyle({
        fillStyle: "red",
      })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text13 = new Vex.Flow.TextNote({
      text: "|",
      duration: "q",
    });
    text13
      .setStyle({
        fillStyle: "red",
      })
      .setLine(12)
      .setStave(staveMeasure1)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    // On ajoute les notes et le texte aux voix. Helper function to justify and draw a 4/4 voice
    voice4.addTickables(notesMeasure1);
    voice5.addTickables([text1]);
    voice5.addTickables([text11]);
    voice5.addTickables([text12]);
    voice5.addTickables([text13]);

    //On formatte et on joint les deux voix
    // eslint-disable-next-line no-unused-vars
    var formatter = new Vex.Flow.Formatter()
      .joinVoices([voice4, voice5])
      .format([voice4, voice5], 325);

    // on dessine la voix avec les notes sur la mesure 1 et on dessine le texte des nuances
    voice4.draw(context, staveMeasure1);
    text1.setContext(context).draw();
    text11.setContext(context).draw();
    text12.setContext(context).draw();
    text13.setContext(context).draw();

    ////////////////////////////////////////////////////////////////////
    ////////////////////2e mesure///////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    // measure 3 - juxtaposing second measure next to first measure
    var staveMeasure3 = new Vex.Flow.Stave(410, 0, 300);

    //On l'ajoute au contexte et on la dessine
    staveMeasure3.setContext(context).draw();

    //voix
    var voice6 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    var voice7 = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });

    //Nuance
    var text3 = new Vex.Flow.TextNote({
      text: "|",
      duration: "q",
    });
    text3
      .setStyle({
        fillStyle: "red",
      })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text31 = new Vex.Flow.TextNote({
      text: "|",
      duration: "q",
    });
    text31
      .setStyle({
        fillStyle: "red",
      })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text32 = new Vex.Flow.TextNote({
      text: "|",
      duration: "q",
    });
    text32
      .setStyle({
        fillStyle: "red",
      })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text33 = new Vex.Flow.TextNote({
      text: "|",
      duration: "q",
    });
    text33
      .setStyle({
        fillStyle: "red",
      })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER);

    //Notes
    var notesMeasure3 = [
      new Vex.Flow.StaveNote({
        keys: ["c##/5"],
        duration: "hd",
        stem_direction: -1,
      }).addDot(0),
      new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
    ];

    // On ajoute les notes et le texte a des voix. Helper function to justify and draw a 4/4 voice
    voice6.addTickables(notesMeasure3);

    voice7.addTickables([text3]);
    voice7.addTickables([text31]);
    voice7.addTickables([text32]);
    voice7.addTickables([text33]);
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-unused-vars
    var formatter3 = new Vex.Flow.Formatter()
      .joinVoices([voice6, voice7])
      .format([voice6, voice7], 300);

    voice6.draw(context, staveMeasure3);
    voice7.draw(context, staveMeasure3);

    text3.setContext(context).draw();
    text31.setContext(context).draw();
    text32.setContext(context).draw();
    text33.setContext(context).draw();

    ///////////////////////////////////////////////////////////////////////
    ///////////////////3e mesure//////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////

    // measure 2 - juxtaposing second measure next to first measure
    var staveMeasure2 = new Vex.Flow.Stave(710, 0, 280);

    //Barre de fin
    staveMeasure2.mode = Vex.Flow.Voice.Mode.FULL;
    staveMeasure2.setEndBarType(Vex.Flow.Barline.type.END);

    //On l'ajoute au contexte et on la dessine
    staveMeasure2.setContext(context).draw();

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

    //Pulsations

    var text2 = new Vex.Flow.TextNote({
      text: "|",
      duration: "q",
    });
    text2
      .setStyle({
        fillStyle: "red",
      })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    var text21 = new Vex.Flow.TextNote({
      text: "|",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);
    text21.setStyle({
      fillStyle: "red",
    });
    var text22 = new Vex.Flow.TextNote({
      text: "|",
      duration: "q",
    })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);
    text22.setStyle({
      fillStyle: "red",
    });
    var text23 = new Vex.Flow.TextNote({
      text: "|",
      duration: "q",
    });
    text23
      .setStyle({
        fillStyle: "red",
      })
      .setLine(12)
      .setStave(staveMeasure3)
      .setJustification(Vex.Flow.TextNote.Justification.LEFT);

    // On ajoute les notes et le texte a des voix. Helper function to justify and draw a 4/4 voice
    voice2.addTickables(notesMeasure2);
    voice3.addTickables([text2]);
    voice3.addTickables([text21]);
    voice3.addTickables([text22]);
    voice3.addTickables([text23]);
    // eslint-disable-next-line no-unused-vars
    var formatter2 = new Vex.Flow.Formatter()
      .joinVoices([voice2, voice3])
      .format([voice2, voice3], 260);

    voice2.draw(context, staveMeasure2);
    voice3.draw(context, staveMeasure2);

    text2.setContext(context).draw();
    text21.setContext(context).draw();
    text22.setContext(context).draw();
    text23.setContext(context).draw();
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
