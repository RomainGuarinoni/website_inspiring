<template>
  <div class="container">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="box">
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour</p>
      </div>
      <div class="quizBox" v-if="indexEnCours < length && reponse">
        <div class="avancement">
          <p>Q : {{ indexEnCours + 1 }} / {{ length }}</p>
        </div>
        <h2 class="red">Question : {{ question[indexEnCours].question }}</h2>
        <p v-if="question[indexEnCours].image_question != null">
          <img class="imageQuestion" :src="srcQuestion()" alt="" />
        </p>
        <div v-if="question[indexEnCours].son_question != null">
          <div class="bouton" @click="playAudio()">
            <font-awesome-icon v-if="play" :icon="['fas', 'play']" />
            <div v-else class="lds-dual-ring"></div>
          </div>
        </div>
        <div class="reponses" v-if="question[indexEnCours].reponse != null">
          <div
            class="main reponseItem"
            v-for="(item, index) in question[indexEnCours].reponse"
            :key="index"
            @click="checkAnswer(index)"
          >
            <p>Réponse {{ index + 1 }} : {{ item }}</p>
          </div>
        </div>
        <div class="reponsesImg" v-else>
          <div
            class=" img"
            v-for="(item, index) in question[indexEnCours].image_reponse"
            :key="index"
            @click="checkAnswer(index)"
          >
            <img :src="src(index)" alt="img" />
          </div>
        </div>
      </div>
      <div v-else-if="!reponse" class="quizBox falseAnswer">
        <h1 class="red">Dommage, tu as donné la mauvaise réponse</h1>
        <div class="reponseBox">
          <p class="falseReponseP">Voici la bonne réponse :</p>
          <div class="reponse">
            <p>{{ question[indexEnCours].question }}</p>
            <p v-if="question[indexEnCours].reponse != null">
              {{ question[indexEnCours].reponse[question[indexEnCours].index] }}
            </p>
            <p v-else>
              <img
                class="solutionImg"
                :src="src(question[indexEnCours].index)"
                alt=""
              />
            </p>
          </div>
        </div>
        <div class="buttonNext" @click="questionSuivante()">
          <p v-if="indexEnCours < length - 1">Question suivante</p>
          <p v-else>finir le test</p>
        </div>
      </div>
      <div class="result" v-else>
        <h2 v-if="score >= length - 3" class="green">
          Bravo, tu as bien réussi !
        </h2>
        <h2 class="orange" v-else>Dommage, tu peux faire mieux !!</h2>
        <p class="main score">
          Voici ton score : {{ score }} / {{ indexEnCours }}
        </p>
        <div class="buttonBox">
          <div class="button" @click="again()"><p>Recommencer</p></div>
          <div class="button" @click="retour()"><p>Retour au menu</p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "./Navbar";
  export default {
    props: {
      question: {
        type: Array,
      },
      year: {
        type: undefined,
      },
      quizFinal: {
        type: Boolean,
        default: false,
      },
      quiz: {
        type: Boolean,
        default: false,
      },
      lengthQuiz: {
        type: Number,
        default: 10,
      },
      chapter: {
        type: String,
        default: null,
      },
    },
    components: {
      Navbar,
    },
    data() {
      return {
        indexEnCours: 0,
        score: 0,
        length: this.lengthQuiz, // le nombre de questions pour le quizz, peut être changer
        questionSorted: Array,
        reponse: true,
        audio: Audio,
        play: true,
      };
    },
    watch: {
      indexEnCours: function() {
        if (this.indexEnCours == this.length && this.score >= this.length - 3) {
          //envoyer a la base de donnée les resultats
          if (this.quiz || this.quizFinal) {
            this.$store.dispatch("QUIZ_VALIDE_PARTITION", {
              quizFinal: this.quizFinal,
              year: this.year,
              chapter: this.chapter,
              score: this.score / this.length,
            });
          } else {
            this.$store.dispatch("ENTRAINEMENT_VALIDE_PARTITION", {
              year: this.year,
              chapter: this.chapter,
              score: this.score / this.length,
              validate: true,
            });
          }
        } else if (this.indexEnCours == this.length) {
          this.$store.dispatch("ENTRAINEMENT_VALIDE_PARTITION", {
            year: this.year,
            chapter: this.chapter,
            score: this.score / this.length,
            validate: false,
          });
        }
        this.audio.pause();
        this.play = true;
      },
    },
    methods: {
      playAudio() {
        if (this.play == true) {
          this.play = false;
          this.audio = new Audio(
            require(`@/assets/quizPartition/${
              this.question[this.indexEnCours].son_question
            }.mp3`)
          );
          this.audio.play();
          this.nbEcoute--;
          this.audio.addEventListener("ended", () => {
            this.play = true;
          });
        }
      },
      retour() {
        this.$router.push({ name: "partition", params: { annee: this.year } });
      },
      shuffleQuestion(question) {
        for (let i = 0; i < question.length; i++) {
          let value = question[i];
          let random = Math.round(Math.random() * (question.length - 1));
          let temp = question[random];
          question[random] = value;
          question[i] = temp;
        }
      },
      checkAnswer(index) {
        if (this.question[this.indexEnCours].index == index) {
          this.reponse = true;
          this.score++;
          this.indexEnCours++;
        } else {
          if (this.quiz || this.quizFinal) {
            this.indexEnCours++;
          } else {
            this.reponse = false;
          }
        }
      },
      questionSuivante() {
        this.indexEnCours++;
        this.reponse = true;
        console.log(this.question[this.indexEnCours]);
      },
      again() {
        this.shuffleQuestion;
        this.score = 0;
        this.indexEnCours = 0;
      },
      src(index) {
        return require(`@/assets/quizPartition/${
          this.question[this.indexEnCours].image_reponse[index]
        }.png`);
      },
      srcQuestion() {
        console.log("newx image for question");
        console.log(this.question[this.indexEnCours]);
        try {
          return require(`@/assets/quizPartition/${
            this.question[this.indexEnCours].image_question
          }.png`);
        } catch (err) {
          console.log("error : " + this.question[this.indexEnCours]);
        }
      },
    },
    created: function() {
      this.shuffleQuestion(this.question);
    },
    destroyed: function() {
      this.audio.pause();
    },
  };
</script>

<style scoped>
  .container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-weight: 100 !important;
  }
  .box {
    position: relative;
    flex: 1;
    width: 100%;
    display: flex;
  }
  .reponsesImg {
    display: flex;
    flex: 1;
    align-items: center;
    width: 80%;
    justify-content: space-around;
    align-items: center;
  }
  .img img,
  .solutionImg {
    min-height: 120px;
    max-width: 300px;
    transition: all ease 200ms;
    cursor: pointer;
  }
  .img img:hover {
    transform: translateY(-5px);
  }
  .quizBox,
  .result {
    margin: auto;
    width: 90%;
    height: 80%;
    background: rgba(219, 218, 218, 0.644);
    border: none;
    border-radius: 20px;
    position: relative;
    max-width: 1500px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .result {
    justify-content: space-around !important;
  }
  .score {
    font-size: 30px;
  }

  .buttonBox {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  .button,
  .buttonNext {
    min-width: 180px;
    color: white;
    height: 50px;
    border: none;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease 200ms;
    cursor: pointer;
  }
  .buttonNext {
    background: var(--blue);
  }
  .button:hover,
  .buttonNext:hover {
    transform: translateY(-5px);
  }
  .button:nth-child(1) {
    background: var(--blue);
  }
  .button:nth-child(2) {
    background: var(--main);
  }
  .avancement {
    position: absolute;
    top: 30px;
    right: 50px;
    color: var(--green);
  }
  @media all and (max-width: 1252px) {
    .avancement {
      top: 5px !important;
      right: 50% !important;
    }
  }
  .reponses {
    flex: 1;
    display: flex;
    padding: 20px 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .reponseItem {
    border: 2px solid var(--main);
    margin: 30px 0;
    max-width: 800px;
    width: 80%;
    text-align: center;
    padding: 20px 0;
    border-radius: 10px;
    transition: all ease 200ms;
    cursor: pointer;
  }
  .reponseItem p {
    transition: all ease 200ms;
    font-size: 25px;
  }
  .reponseItem:hover {
    transform: translateY(-5px);
  }
  h2 {
    font-size: 30px;
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
  @media all and (max-width: 1774px) {
    .retour {
      left: 10px !important ;
      top: 0px !important;
    }
  }
  @media all and (max-width: 641px) {
    .retour {
      top: -45px !important;
      border-radius: 100% !important;
    }
    .retour p {
      display: none;
    }
  }
  #chevron {
    margin: 5px;
  }
  .retour:hover {
    box-shadow: 2px 2px 10px #06446b5e;
  }
  .falseAnswer {
    justify-content: center;
  }
  .reponseBox {
    margin: 150px 0;
  }
  .falseReponseP {
    font-size: 30px;
    color: var(--green);
    margin-bottom: 30px;
  }
  .reponse {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .reponse p {
    margin: 0 10px;
  }
  .imageQuestion {
    max-height: 200px;
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
</style>
