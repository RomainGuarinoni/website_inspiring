<template>
  <div>
    <div id="gameBox" v-show="show">
      <div class="grey">
        <h1 class="darkPurple">Niveau {{ level.index + 1 }}</h1>
        <div class="retour" @click="retour()">
          <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
          <p>Retour au choix du niveau</p>
        </div>
        <div class="son">
          <div class="bouton" @click="playAudio()">
            <font-awesome-icon v-if="play" :icon="['fas', 'play']" />
            <div v-else class="lds-dual-ring"></div>
          </div>
          <div class="nbEcoute">
            <p>
              Nombre d'écoutes restantes :
              <span
                :class="{
                  green: nbEcoute == 3,
                  orange: nbEcoute == 2,
                  red: nbEcoute <= 1,
                }"
                >{{ nbEcoute }}</span
              >
            </p>
          </div>
        </div>
        <div id="staveBox">
          <div id="stave"></div>
        </div>
        <div class="action">
          <div class="effacer" @click="deleteNote()">
            <font-awesome-icon :icon="['fas', 'trash']" />
            <p>Effacer</p>
          </div>
          <div class="valider" @click="finish()">
            <font-awesome-icon :icon="['fas', 'check']" />
            <p>Valider</p>
          </div>
        </div>
        <div class="notes">
          <div
            class="note"
            v-for="(note, index) in level.level.note"
            :key="index"
            @click="addNote(index)"
          >
            <img
              :src="img[index]"
              alt="note de musique"
              width="50"
              height="50"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="result" v-show="!show && !quiz">
      <div class="grey end">
        <h1>Niveau {{ level.index + 1 }}</h1>
        <h2 v-if="result" class="green">Bravo !!</h2>
        <h2 v-else class="red">Dommage, tu peux faire mieux !</h2>
        <div class="goodAnswer" id="goodAnswer">
          <p>
            <span v-if="result" class="green">Ta</span>
            <span class="green" v-if="!result">La bonne</span>
            <span class="green"> réponse :</span>
          </p>
          <div id="goodStaveBox">
            <div id="goodStave"></div>
          </div>
        </div>
        <div class="badAnswer" id="badAnswer" v-show="!result">
          <p class="red">Ta réponse :</p>
          <div id="badStaveBox">
            <div id="badStave"></div>
          </div>
        </div>
        <div class="audio">
          <p>Réécouter l'audio :</p>
          <div class="bouton" @click="playAudio()">
            <font-awesome-icon v-if="play" :icon="['fas', 'play']" />
            <div v-else class="lds-dual-ring"></div>
          </div>
        </div>
        <div class="boutonsEndGame">
          <div class="recommencer" @click="again()">
            <font-awesome-icon :icon="['fas', 'undo-alt']" />
            <p>Recommencer</p>
          </div>
          <div class="recommencer" @click="retour()">
            <font-awesome-icon :icon="['fas', 'undo-alt']" />
            <p>Retour au menu</p>
          </div>
        </div>
      </div>
    </div>
    <div class="result" v-show="quiz && !show">
      <div class="grey end">
        <h1 v-if="result" class="green">Bravo !! Tu as réussi le quiz !</h1>
        <h2 v-if="result">
          Tu as terminé le chapitre sur le rythme
        </h2>
        <h1 v-else class="red">Tu n'as pas réussi le quiz</h1>
        <h2 style="text-align:center">
          N'hésite pas à recommencer autant de fois que tu le souhaite !
        </h2>
        <div class="recommencer finish" @click="retour()">
          <font-awesome-icon :icon="['fas', 'undo-alt']" />
          <p>Retour au menu</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vex from "vexflow";
  export default {
    name: "App",
    props: {
      levelIndex: {
        type: Number,
      },
      quiz: {
        type: Boolean,
        default: false,
      },
      year: {
        type: undefined,
      },
    },
    data() {
      let noteGlobal = [
        {
          name: "ronde.svg",
          value: 1,
          duration: 4,
        },
        {
          name: "blanche.svg",
          value: 2,
          duration: 2,
        },
        {
          name: "noir.svg",
          value: 3,
          duration: 1,
        },
        {
          name: "blanchepoint.svg",
          value: 4,
          duration: 3,
        },
        {
          name: "croche.svg",
          value: 5,
          duration: 0.5,
        },
        {
          name: "pause.svg",
          value: 6,
          duration: 4,
        },
        {
          name: "demiPause.svg",
          value: 7,
          duration: 2,
        },
        {
          name: "soupir.svg",
          value: 8,
          duration: 1,
        },
        {
          name: "demiSoupirPoint.svg",
          value: 9,
          duration: 1.5,
        },
        {
          name: "demiSoupir.svg",
          value: 10,
          duration: 0.5,
        },
      ];
      return {
        level: Object,
        show: true,
        nbEcoute: 3,
        play: true,
        color: ["#43A047", "#FBC02D", "#D50000"],
        note: [],
        noteStave: [],
        resultStave: [], // la portée des resultatss
        beams: [],
        img: [],
        indexEnCours: 0,
        result: true,
        audio: undefined,
        diff: [
          [
            {
              mp3: require("@/assets/level1_1.mp3"),
              result: [2, 2],
              note: [
                noteGlobal[0],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[9],
              ],
            },
            {
              mp3: require("@/assets/level1_2.mp3"),
              result: [3, 3, 2],
              note: [
                noteGlobal[0],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[9],
              ],
            },
            {
              mp3: require("@/assets/level1_3.mp3"),
              result: [3, 3, 3, 3],
              note: [
                noteGlobal[0],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[9],
              ],
            },
            {
              mp3: require("@/assets/level1_4.mp3"),
              result: [2, 3, 3],
              note: [
                noteGlobal[0],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[9],
              ],
            },
            {
              mp3: require("@/assets/level1_5.mp3"),
              result: [3, 2, 3],
              note: [
                noteGlobal[0],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[9],
              ],
            },
            {
              mp3: require("@/assets/level1_6.mp3"),
              result: [3, 3, 2],
              note: [
                noteGlobal[0],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[9],
              ],
            },
          ],
          [
            {
              mp3: require("@/assets/level2_1.mp3"),
              result: [3, 8, 3, 3],
              note: [
                noteGlobal[7],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[6],
              ],
            },
            {
              mp3: require("@/assets/level2_2.mp3"),
              result: [2, 3, 8],
              note: [
                noteGlobal[7],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[6],
              ],
            },
            {
              mp3: require("@/assets/level2_3.mp3"),
              result: [8, 3, 2],
              note: [
                noteGlobal[7],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[6],
              ],
            },
            {
              mp3: require("@/assets/level2_4.mp3"),
              result: [3, 8, 3, 8],
              note: [
                noteGlobal[7],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[6],
              ],
            },
            {
              mp3: require("@/assets/level2_5.mp3"),
              result: [7, 2],
              note: [
                noteGlobal[7],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[6],
              ],
            },
            {
              mp3: require("@/assets/level2_6.mp3"),
              result: [7, 3, 3],
              note: [
                noteGlobal[7],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[6],
              ],
            },
            {
              mp3: require("@/assets/level2_7.mp3"),
              result: [3, 7, 3],
              note: [
                noteGlobal[7],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[6],
              ],
            },
            {
              mp3: require("@/assets/level2_8.mp3"),
              result: [7, 2],
              note: [
                noteGlobal[7],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[6],
              ],
            },
            {
              mp3: require("@/assets/level2_9.mp3"),
              result: [3, 3, 3, 8],
              note: [
                noteGlobal[7],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[6],
              ],
            },
            {
              mp3: require("@/assets/level2_10.mp3"),
              result: [3, 3, 7],
              note: [
                noteGlobal[7],
                noteGlobal[1],
                noteGlobal[2],
                noteGlobal[6],
              ],
            },
          ],
          [
            {
              mp3: require("@/assets/level3_1.mp3"),
              result: [5, 5, 5, 5, 3, 3],
              note: [
                noteGlobal[4],
                noteGlobal[9],
                noteGlobal[2],
                noteGlobal[7],
              ],
            },
            {
              mp3: require("@/assets/level3_2.mp3"),
              result: [5, 5, 8, 3, 3],
              note: [
                noteGlobal[4],
                noteGlobal[9],
                noteGlobal[2],
                noteGlobal[7],
              ],
            },
            {
              mp3: require("@/assets/level3_3.mp3"),
              result: [3, 3, 5, 5, 3],
              note: [
                noteGlobal[4],
                noteGlobal[9],
                noteGlobal[2],
                noteGlobal[7],
              ],
            },
            {
              mp3: require("@/assets/level3_4.mp3"),
              result: [10, 5, 3, 10, 5, 3],
              note: [
                noteGlobal[4],
                noteGlobal[9],
                noteGlobal[2],
                noteGlobal[7],
              ],
            },
            {
              mp3: require("@/assets/level3_5.mp3"),
              result: [8, 10, 5, 5, 5, 3],
              note: [
                noteGlobal[4],
                noteGlobal[9],
                noteGlobal[2],
                noteGlobal[7],
              ],
            },
            {
              mp3: require("@/assets/level3_6.mp3"),
              result: [8, 3, 8, 10, 5],
              note: [
                noteGlobal[4],
                noteGlobal[9],
                noteGlobal[2],
                noteGlobal[7],
              ],
            },
            {
              mp3: require("@/assets/level3_7.mp3"),
              result: [5, 5, 3, 3, 10, 5],
              note: [
                noteGlobal[4],
                noteGlobal[9],
                noteGlobal[2],
                noteGlobal[7],
              ],
            },
            {
              mp3: require("@/assets/level3_8.mp3"),
              result: [5, 5, 5, 5, 5, 5, 5, 5],
              note: [
                noteGlobal[4],
                noteGlobal[9],
                noteGlobal[2],
                noteGlobal[7],
              ],
            },
            {
              mp3: require("@/assets/level3_9.mp3"),
              result: [10, 5, 10, 5, 10, 5, 10, 5],
              note: [
                noteGlobal[4],
                noteGlobal[9],
                noteGlobal[2],
                noteGlobal[7],
              ],
            },
            {
              mp3: require("@/assets/level3_10.mp3"),
              result: [10, 5, 10, 5, 10, 5, 3],
              note: [
                noteGlobal[4],
                noteGlobal[9],
                noteGlobal[2],
                noteGlobal[7],
              ],
            },
          ],
        ],
      };
    },
    watch: {
      show: function() {
        if (this.result) {
          if (!this.quiz) {
            this.$store.dispatch("ENTRAINEMENT_VALIDE", {
              level: this.levelIndex,
              year: this.year,
              chapter: "rythme",
              id: 8,
              score: 1,
            });
          } else {
            this.$store.dispatch("QUIZ_VALIDE", {
              year: this.year,
              chapter: "rythme",
              id: 9,
              score: 1,
            });
          }
          // envoyer a hugo les data avec vuex actions
        } else {
          this.$store.dispatch("ENTRAINEMENT_VALIDE", {
            level: this.levelIndex,
            year: this.year,
            chapter: "rythme",
            id: 8,
            score: 0,
          });
        }
      },
    },
    methods: {
      createLevel() {
        let random = Math.floor(
          Math.random() * this.diff[this.levelIndex].length
        );
        this.level = {
          level: this.diff[this.levelIndex][random],
          index: this.levelIndex,
        };
      },
      playAudio() {
        if (this.show) {
          if (this.nbEcoute > 0 && this.play == true) {
            this.play = false;
            this.audio = new Audio(this.level.level.mp3);
            this.audio.play();
            this.nbEcoute--;
            this.audio.addEventListener("ended", () => {
              this.play = true;
            });
          }
        } else {
          this.play = false;
          this.audio = new Audio(this.level.level.mp3);
          this.audio.play();
          this.nbEcoute--;
          this.audio.addEventListener("ended", () => {
            this.play = true;
          });
        }
      },
      addNote(index) {
        let VF = Vex.Flow;
        let durationTot = 0;
        this.note.forEach((element) => (durationTot += element.duration));
        if (durationTot != 4) {
          if (this.level.level.note[index].duration + durationTot <= 4) {
            this.note.push(this.level.level.note[index]);

            switch (this.level.level.note[index].value) {
              case 1:
                this.noteStave.push(
                  new VF.StaveNote({
                    clef: "treble",
                    keys: ["a/4"],
                    duration: "w",
                  })
                );
                break;
              case 2:
                this.noteStave.push(
                  new VF.StaveNote({
                    clef: "treble",
                    keys: ["a/4"],
                    duration: "h",
                  })
                );
                break;
              case 3:
                this.noteStave.push(
                  new VF.StaveNote({
                    clef: "treble",
                    keys: ["a/4"],
                    duration: "q",
                  })
                );
                break;
              case 4:
                this.noteStave.push(
                  new VF.StaveNote({
                    clef: "treble",
                    keys: ["a/4"],
                    duration: "h",
                  }).addDot(0)
                );
                break;
              case 5:
                this.noteStave.push(
                  new VF.StaveNote({
                    clef: "treble",
                    keys: ["a/4"],
                    duration: "8",
                  })
                );
                break;
              case 6:
                this.noteStave.push(
                  new VF.StaveNote({
                    clef: "treble",
                    keys: ["a/4"],
                    duration: "wr",
                  })
                );
                break;
              case 7:
                this.noteStave.push(
                  new VF.StaveNote({
                    clef: "treble",
                    keys: ["a/4"],
                    duration: "hr",
                  })
                );
                break;
              case 8:
                this.noteStave.push(
                  new VF.StaveNote({
                    clef: "treble",
                    keys: ["a/4"],
                    duration: "qr",
                  })
                );
                break;
              case 9:
                this.noteStave.push(
                  new VF.StaveNote({
                    clef: "treble",
                    keys: ["a/4"],
                    duration: "8r",
                  }).addDot(0)
                );
                break;
              case 10:
                this.noteStave.push(
                  new VF.StaveNote({
                    clef: "treble",
                    keys: ["a/4"],
                    duration: "8r",
                  })
                );
                break;
            }
            this.indexEnCours++;
            this.removeNode();
          }
        }
      },
      deleteNote() {
        this.note.pop();
        this.noteStave.pop();
        if (this.indexEnCours >= 0) {
          this.indexEnCours--;
        }
        this.removeNode();
      },
      removeNode() {
        var node = document.getElementById("stave");
        node.remove();
        var newNode = document.getElementById("staveBox");
        newNode.innerHTML = '<div id="stave"></div>';
        this.display();
      },
      display() {
        var part1 = Vex.Flow;
        var div = document.getElementById("stave");
        var renderer = new part1.Renderer(div, part1.Renderer.Backends.SVG);
        renderer.resize(600, 200); // Size the SVG
        var context = renderer.getContext();
        // on ajoute un context au renderer
        var stave = new part1.Stave(60, 40, 500); //on dessinne la partition au position 10,40 avec une largeur de 400
        stave.setEndBarType(part1.Barline.type.END);
        stave.addClef("treble").addTimeSignature("4/4"); //on, ajoute l'armure treble : clef de sol || bass : clef de fa
        stave.setContext(context).draw();
        var voice = new part1.Voice({ num_beats: 4, beat_value: 4 });
        voice.addTickables(this.noteStave);
        var beams = part1.Beam.generateBeams(this.noteStave);
        part1.Formatter.FormatAndDraw(context, stave, this.noteStave); //formater les notes pour qu'elle soient a la bonne place et tiout surt la part
        beams.forEach(function(b) {
          b.setContext(context).draw();
        });
      },
      finish() {
        var part1 = Vex.Flow;
        this.show = false;
        if (
          this.note.length == 0 ||
          this.note.length != this.level.level.result.length
        ) {
          this.result = false;
          for (let i = 0; i < this.note.length; i++) {
            if (this.note[i].value != this.level.level.result[i]) {
              this.noteStave[i].setStyle({
                fillStyle: "red",
                strokeStyle: "red",
              });
            }
          }
        } else {
          for (let i = 0; i < this.level.level.result.length; i++) {
            if (this.note[i].value != this.level.level.result[i]) {
              this.result = false;
              this.noteStave[i].setStyle({
                fillStyle: "red",
                strokeStyle: "red",
              });
            }
          }
        }
        for (let i = 0; i < this.level.level.result.length; i++) {
          switch (this.level.level.result[i]) {
            case 1:
              this.resultStave.push(
                new part1.StaveNote({
                  clef: "treble",
                  keys: ["a/4"],
                  duration: "w",
                })
              );
              break;
            case 2:
              this.resultStave.push(
                new part1.StaveNote({
                  clef: "treble",
                  keys: ["a/4"],
                  duration: "h",
                })
              );
              break;
            case 3:
              this.resultStave.push(
                new part1.StaveNote({
                  clef: "treble",
                  keys: ["a/4"],
                  duration: "q",
                })
              );
              break;
            case 4:
              this.resultStave.push(
                new part1.StaveNote({
                  clef: "treble",
                  keys: ["a/4"],
                  duration: "h",
                }).addDot(0)
              );
              break;
            case 5:
              this.resultStave.push(
                new part1.StaveNote({
                  clef: "treble",
                  keys: ["a/4"],
                  duration: "8",
                })
              );
              break;
            case 6:
              this.resultStave.push(
                new part1.StaveNote({
                  clef: "treble",
                  keys: ["a/4"],
                  duration: "wr",
                })
              );
              break;
            case 7:
              this.resultStave.push(
                new part1.StaveNote({
                  clef: "treble",
                  keys: ["a/4"],
                  duration: "hr",
                })
              );
              break;
            case 8:
              this.resultStave.push(
                new part1.StaveNote({
                  clef: "treble",
                  keys: ["a/4"],
                  duration: "qr",
                })
              );
              break;
            case 9:
              this.resultStave.push(
                new part1.StaveNote({
                  clef: "treble",
                  keys: ["a/4"],
                  duration: "8dr",
                }).addDot(0)
              );
              break;
            case 10:
              this.resultStave.push(
                new part1.StaveNote({
                  clef: "treble",
                  keys: ["a/4"],
                  duration: "8r",
                })
              );
              break;
          }
        }
        var div1 = document.getElementById("goodStave");
        var renderer1 = new part1.Renderer(div1, part1.Renderer.Backends.SVG);
        renderer1.resize(600, 200); // Size the SVG
        var context1 = renderer1.getContext();
        // on ajoute un context au renderer
        var stave1 = new part1.Stave(60, 40, 500); //on dessinne la partition au position 10,40 avec une largeur de 400
        stave1.setEndBarType(part1.Barline.type.END);
        stave1.addClef("treble").addTimeSignature("4/4"); //on, ajoute l'armure treble : clef de sol || bass : clef de fa
        stave1.setContext(context1).draw();
        var voice1 = new part1.Voice({ num_beats: 4, beat_value: 4 });
        voice1.addTickables(this.resultStave);
        var beams1 = part1.Beam.generateBeams(this.resultStave);
        part1.Formatter.FormatAndDraw(context1, stave1, this.resultStave); //formater les notes pour qu'elle soient a la bonne place et tiout surt la part
        beams1.forEach(function(b) {
          b.setContext(context1).draw();
        });

        var div2 = document.getElementById("badStave");
        var renderer2 = new part1.Renderer(div2, part1.Renderer.Backends.SVG);
        renderer2.resize(600, 200); // Size the SVG
        var context2 = renderer2.getContext();
        // on ajoute un context au renderer
        var stave2 = new part1.Stave(60, 40, 500); //on dessinne la partition au position 10,40 avec une largeur de 400
        stave2.setEndBarType(part1.Barline.type.END);
        stave2.addClef("treble").addTimeSignature("4/4"); //on, ajoute l'armure treble : clef de sol || bass : clef de fa
        stave2.setContext(context2).draw();
        var voice2 = new part1.Voice({ num_beats: 4, beat_value: 4 });
        voice2.addTickables(this.noteStave);
        var beams2 = part1.Beam.generateBeams(this.noteStave);
        part1.Formatter.FormatAndDraw(context2, stave2, this.noteStave); //formater les notes pour qu'elle soient a la bonne place et tiout surt la part
        beams2.forEach(function(b) {
          b.setContext(context2).draw();
        });
      },
      again() {
        this.nbEcoute = 3;
        this.note = [];
        this.noteStave = [];
        this.resultStave = []; // la portée des resultatss
        this.beams = [];
        this.indexEnCours = 0;
        this.result = true;
        this.play = true;
        var node = document.getElementById("stave");
        node.remove();
        var newNode = document.getElementById("staveBox");
        newNode.innerHTML = '<div id="stave"></div>';
        var node2 = document.getElementById("goodStave");
        node2.remove();
        var newNode2 = document.getElementById("goodStaveBox");
        newNode2.innerHTML = "<div id='goodStave'></div>";
        var node3 = document.getElementById("badStave");
        node3.remove();
        var newNode3 = document.getElementById("badStaveBox");
        newNode3.innerHTML = '<div id="badStave"></div>';
        this.createLevel();
        this.show = true;
        this.display();
      },
      retour() {
        this.$emit("RETOUR");
      },
    },
    mounted: function() {
      for (let i in this.level.level.note) {
        let imgAux = require("@/assets/" + this.level.level.note[i].name + "");
        this.img.push(imgAux);
      }
      this.display();
    },
    created: function() {
      this.createLevel();
    },
    destroyed: function() {
      this.audio.pause();
    },
  };
</script>

<style scoped>
  #gameBox {
    position: absolute;
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  .grey {
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 20px;
    border: none;
    border-radius: 25px;
    width: 60%;
    height: 80%;
  }
  .end {
    height: 100% !important;
  }
  .result {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 250px;
    width: 100%;
    height: 80%;
    font-size: 20px;
  }
  h1 {
    text-align: center;
    margin: 30px 0;
    font-size: 40px;
  }
  .son {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80%;
  }
  .bouton {
    border: 2px solid black;
    width: 70px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
  }
  #staveBox {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .action {
    display: flex;
    width: 35%;
    justify-content: space-between;
  }
  .effacer,
  .valider {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90px;
    cursor: pointer;
    transition: all ease 200ms;
  }

  .effacer:hover,
  .valider:hover {
    transform: translate(0px, -4px);
  }
  .valider {
    color: #43a047;
  }
  .effacer {
    color: #d50000;
  }

  .notes {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 60%;
  }
  .note {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    cursor: pointer;
    border: 2px solid black;
    padding: 0 10px;
    border-radius: 20px;
    transition: all ease 200ms;
  }
  .note:hover {
    transform: scale(1.2);
  }
  .lds-dual-ring {
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 20px;
    height: 20px;
    margin: 0px;
    border-radius: 50%;
    border: 6px solid black;
    border-color: black transparent black transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .nbEcoute p {
    font-weight: bold;
  }
  .nbEcoute p span {
    font-size: 25px;
  }
  .green {
    color: #43a047;
  }
  .orange {
    color: #fbc02d;
  }
  .red {
    color: #d50000;
  }
  .goodAnswer,
  .badAnswer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .audio {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .audio p {
    margin: 0 20px;
  }
  .recommencer {
    display: flex;
    border: 2px solid;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    color: white;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    transition: all ease 200ms;
  }
  .finish {
    background: var(--main);
  }
  .recommencer:nth-child(1) {
    background: var(--blue);
  }
  .recommencer:nth-child(2) {
    background: var(--main);
  }
  .recommencer:hover {
    transform: translate(0, -5px);
  }
  .recommencer p {
    margin-left: 20px;
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
  .boutonsEndGame {
    display: flex;
    width: 50%;
    justify-content: space-between;
    align-items: center;
  }
</style>
