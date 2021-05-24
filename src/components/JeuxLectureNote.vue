<template>
  <div class="all">
    <div class="testBox" v-show="!finish">
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour au choix du niveau</p>
      </div>
      <h1 v-if="quiz">Quizz final</h1>
      <h1 v-else>{{ level.diff }}</h1>
      <div class="info">
        <p>Votre score : {{ score }} /8</p>
        <p>Temps : {{ min }} min {{ sec }} sec</p>
      </div>

      <div id="gameBoxInstance">
        <div id="gameBox"></div>
      </div>

      <div class="buttonBox">
        <Button
          @checkAnswer="scoreUpdate"
          @click="display"
          v-for="(item, id) in noteBase"
          :key="item.value"
          :id="id"
          :value="item.value"
          :note="item.note"
          :index="index"
          :notes="notes"
        />
      </div>
    </div>
    <div class="resultBox" v-show="finish && !quiz">
      <h1>Félicitations, tu as fini l’exercice.</h1>
      <h2>Tes résultats sont :</h2>
      <div class="result">
        <p>Score : {{ score }} / 8</p>
        <p>Temps : {{ min_finish }} min {{ sec_finish }} sec</p>
      </div>
      <p class="comment red" v-if="score < 5">
        Tu peux faire bien mieux. Réessaie !
      </p>
      <p class="comment orange" v-else-if="score > 5 && score < 8">
        Bravo ! Tu es sur la bonne voie.
      </p>
      <p class="comment green" v-else>
        Excellent !
      </p>
      <div class="bouton">
        <div class="boutonBox"><p @click="again">Recommencer ce niveau</p></div>
        <div class="boutonBox"><p @click="retour">Retour au menu</p></div>
      </div>
    </div>
    <div class="resultBox" v-show="finish && quiz">
      <h1 v-if="score == 8" class="green">Bravo !! Tu as réussi le quiz !</h1>
      <h2 v-if="score == 8">
        Tu as terminé le chapitre sur la lecture de notes
      </h2>
      <h1 v-else class="red">Tu n'as pas réussi le quiz</h1>
      <h2 style="text-align:center">
        N'hésite pas à recommencer autant de fois que tu le souhaites !
      </h2>
      <div class="boutonQuiz">
        <div class="boutonBox"><p @click="retour">Retour au menu</p></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vex from "vexflow";
  import Button from "./Button.vue";
  import { mapState } from "vuex";
  export default {
    components: {
      Button,
    },
    props: {
      level: Object,
      year: Number,
      quiz: Boolean,
    },
    data() {
      return {
        switchValue: false,
        notes: [],
        noteBase: this.level.note,
        noteResult: [],
        score: 0,
        begin: false,
        index: 0,
        finish: false,
        sec: 0,
        min: 0,
        sec_finish: 0,
        min_finish: 0,
      };
    },
    created: function() {
      this.mixLevelNotes(this.noteBase);
    },
    mounted: function() {
      this.chrono();
      this.display();
    },
    computed: {
      ...mapState(["progression"]),
    },
    watch: {
      finish: function() {
        let score = this.score / 8; // score en pourcentage
        let level = this.level;
        console.log(`quiz ? ${this.quiz}`);
        //j'upgrade en local la progression du joueur
        if (this.quiz) {
          if (
            score == 1 &&
            !this.progression[this.year - 1].chapter.note.quiz
          ) {
            this.$store.dispatch("QUIZ_VALIDE", {
              year: this.year,
              chapter: "note",
              score: score,
              id: 7,
            });
          }
        } else {
          this.$store.dispatch("ENTRAINEMENT_VALIDE", {
            level: level.index,
            year: this.year,
            chapter: "note",
            id: 6,
            score: score,
          });
        }

        // CHECK VUEX FOR UPGRADE IN DATABASE
      },
    },

    methods: {
      mixLevelNotes(notes) {
        for (let i = 0; i < 8; i++) {
          let number = Math.floor(Math.random() * notes.length);
          this.notes[i] = notes[number];
        }
      },
      chrono() {
        setInterval(() => {
          if (this.sec == 59) {
            this.sec = 0;
            this.min++;
          }
          this.sec++;
        }, 1000);
      },
      removeNode() {
        var node = document.getElementById("gameBox");
        node.remove();
        var newNode = document.getElementById("gameBoxInstance");
        newNode.innerHTML = '<div id="gameBox"></div>';
        var div = document.getElementById("gameBox");
        div.style = "height: 200px;";
        div.style.textAlign = "center";
        this.display();
      },
      display() {
        var part1 = Vex.Flow;
        var div = document.getElementById("gameBox");
        var renderer = new part1.Renderer(div, part1.Renderer.Backends.SVG);
        renderer.resize(1000, 500); // Size the SVG
        var context = renderer.getContext();
        // on ajoute un context au renderer
        var stave = new part1.Stave(60, 40, 400); //on dessinne la partition au position 10,40 avec une largeur de 400
        stave.addClef("treble").addTimeSignature("4/4"); //on, ajoute l'armure treble : clef de sol || bass : clef de fa
        stave.setContext(context).draw();
        var notes = [
          //ajouter des notes
          new part1.StaveNote({
            clef: "treble",
            keys: [this.notes[0].value],
            duration: "q",
          }),
          new part1.StaveNote({
            clef: "treble",
            keys: [this.notes[1].value],
            duration: "q",
          }),
          new part1.StaveNote({
            clef: "treble",
            keys: [this.notes[2].value],
            duration: "q",
          }),
          new part1.StaveNote({
            clef: "treble",
            keys: [this.notes[3].value],
            duration: "q",
          }),
        ];
        if (this.index < 4) {
          // placement du curseur dans la première partie de la partition ( les 4 premieres notes)
          notes[this.index].setStyle({
            fillStyle: "orange",
            strokeStyle: "orange",
          });
        }
        if (this.noteResult.length >= 1) {
          // changement de couleur des notes précédentes en fonction du résultat sur la premièree partie de la partition
          if (this.noteResult.length < 4) {
            for (let i = 0; i < this.noteResult.length; i++) {
              notes[i].setStyle({
                fillStyle: this.noteResult[i],
                strokeStyle: this.noteResult[i],
              });
            }
          } else {
            for (let i = 0; i < 4; i++) {
              notes[i].setStyle({
                fillStyle: this.noteResult[i],
                strokeStyle: this.noteResult[i],
              });
            }
          }
        }
        var voice = new part1.Voice({ num_beats: 4, beat_value: 4 });
        voice.addTickables(notes);
        part1.Formatter.FormatAndDraw(context, stave, notes); //formater les notes pour qu'elle soient a la bonne place et tiout surt la part
        var part2 = Vex.Flow;
        var stave2 = new part2.Stave(460, 40, 380);
        stave2.setEndBarType(part2.Barline.type.END);
        //stave2.mode = part2.Voice.Mode.FULL;

        stave2.setContext(context).draw();
        var notes2 = [
          new part2.StaveNote({
            clef: "treble",
            keys: [this.notes[4].value],
            duration: "q",
          }),
          new part2.StaveNote({
            clef: "treble",
            keys: [this.notes[5].value],
            duration: "q",
          }),
          new part2.StaveNote({
            clef: "treble",
            keys: [this.notes[6].value],
            duration: "q",
          }),
          new part2.StaveNote({
            clef: "treble",
            keys: [this.notes[7].value],
            duration: "q",
          }),
        ];
        if (this.index >= 4 && this.index < 8) {
          // placement du curseur pour la deuxième partie de la partition
          notes2[this.index - 4].setStyle({
            fillStyle: "orange",
            strokeStyle: "orange",
          });
        }
        if (this.noteResult.length >= 5 && this.index < 8) {
          // changement couleur notes precedentes deuxieme partie de la partition
          for (let i = 4; i < this.noteResult.length; i++) {
            notes2[i - 4].setStyle({
              fillStyle: this.noteResult[i],
              strokeStyle: this.noteResult[i],
            });
          }
        }

        var voice2 = new part2.Voice({ num_beats: 4, beat_value: 4 });
        voice2.addTickables(notes);
        part2.Formatter.FormatAndDraw(context, stave2, notes2);
      },
      scoreUpdate(payload) {
        this.index++;
        if (payload.result) {
          this.score++;
          this.noteResult.push("green");
        } else {
          this.noteResult.push("red");
        }
        if (this.index == 8) {
          this.finish = true;
          this.sec_finish = this.sec;
          this.min_finish = this.min;
        }
        this.removeNode();
      },
      again() {
        this.mixLevelNotes(this.noteBase);
        this.finish = false;
        this.score = 0;
        this.index = 0;
        this.sec = 0;
        this.min = 0;
        this.noteResult = [];
        this.removeNode();
      },
      retour() {
        this.$emit("RETOUR");
      },
    },
  };
</script>

<style scoped>
  .begin {
    margin-top: 50px;
    text-align: center;
  }
  .boutonBox {
    width: auto;
    height: 20px;
    padding: 10px;
    display: flex;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all ease 200ms;
    outline: none;
  }
  .boutonBox:nth-child(1) {
    background: var(--blue);
    color: white;
  }
  .boutonBox:nth-child(2) {
    background: var(--main);
    color: white;
  }
  .boutonBox:hover {
    transform: translate(0px, -5px);
  }
  .comment {
    font-size: 1.5em;
    font-weight: bold;
  }
  .resultBox {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 60%;
    width: 30%;
    padding: 30px 200px;
  }
  .result {
    display: flex;
    font-size: 1.2em;
    justify-content: space-between;
    width: 300px;
  }
  h1 {
    text-align: center;
  }
  #gameBox {
    height: 200px;
    text-align: center;
  }
  #test {
    color: red;
  }
  .info {
    display: flex;
    justify-content: center;
    font-weight: bold;
  }
  .info p {
    font-size: 1.3em;
    margin: 0 200px;
  }
  .buttonBox {
    display: flex;
    justify-content: center;
  }
  .all {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
  }
  .testBox {
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 100px;
    padding: 30px;
  }
  .resultBox,
  .testBox {
    border: none;
    background: #dbdbdbb6;
    border-radius: 20px;
  }
  .retour {
    display: flex;
    align-items: center;
    font-size: 20px;
    border: 2px solid var(--main);
    padding: 8px;
    border-radius: 15px;
    position: absolute;
    top: -5px;
    left: 180px;
    cursor: pointer;
    transition: all ease 200ms;
  }
  .retour:hover {
    box-shadow: 2px 2px 10px #06446b5e;
  }
  #chevron {
    margin: 5px;
  }
  .bouton {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .boutonQuiz {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>
