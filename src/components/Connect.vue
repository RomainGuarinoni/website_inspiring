<template>
  <div class="container">
    <div class="left">
      <Navbar type="1" class="navbar" />
      <div class="formBox">
        <div class="form" v-if="!createAccount">
          <p class="title">Se connecter</p>
          <div class="formEmail">
            <label for="email" class="emailLab">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="nom.prenom@gmail.com"
              v-model="login"
            />
          </div>
          <div class="formMdp">
            <label for="mdp" class="mdpLab">Mot de passe</label>
            <input
              type="password"
              id="mdp"
              name="mdp"
              v-model="mdp"
              placeholder="au moins 8 caractères"
            />
          </div>
          <div class="formConnect">
            <input type="checkbox" id="stayconnect" name="stayconnect" />
            <label for="stayconnect" class="connectLab">Rester connecté</label>
          </div>
          <div class="buttons">
            <button @click="checkLogin">Se connecter</button>
            <div v-show="error" class="error">
              <p>identifiant ou mdp erroné</p>
            </div>
            <p>
              Tu n'as pas encore des compte ? créez en toi un :
              <button @click="createAccount = true" class="create">
                Créer un compte
              </button>
            </p>
          </div>
        </div>
        <div class="create-account" v-else>
          <p class="title">Créer un compte</p>
          <label for="firstName" class="emailLab">Prénom</label>
          <input
            type="txt"
            id="firstName"
            name="firstName"
            placeholder="Ton prénom"
            v-model="firstName"
          />
          <label for="lastName" class="emailLab blue">Nom</label>
          <input
            type="txt"
            id="lastName"
            name="lastName"
            placeholder="Ton Nom"
            v-model="lastName"
          />
          <label for="emailCreate" class="emailLab orange">Email</label>
          <input
            type="email"
            id="emailCreate"
            name="emailCreate"
            placeholder="Ton adresse email"
            v-model="emailCreate"
          />
          <label for="mdpCreate" class="emailLab purple">Mot de passe</label>
          <input
            type="password"
            id="mdpCreate"
            name="mdpCreate"
            placeholder="Ton mot de passe"
            v-model="mdpCreate"
          />
          <label for="mdpVerify" class="emailLab red"
            >Re écris ton mot de passe</label
          >
          <input
            type="password"
            id="mdpVerify"
            name="mdpVerify"
            placeholder="Re écris ton mot de passe"
            v-model="mdpVerify"
            :class="{
              greenBackground: mdpCreate == mdpVerify && mdpVerify != '',
              redBackground: mdpCreate != mdpVerify && mdpVerify != '',
            }"
          />
          <label for="conservatoire" class="emailLab blue"
            >Ton conservatoire</label
          >
          <select
            id="conservatoire"
            name="conservatoire"
            v-model="conservatoire"
          >
            <option value="" selected disabled>--Choisis une école--</option>
            <option v-for="element in school" :key="element" :value="element">
              {{ element }}
            </option>
          </select>
          <div class="buttonsCreate">
            <button @click="retour()">Retour</button>
            <button>Créer un compte</button>
          </div>
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Data from "../Data";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      error: false,
      login: "",
      mdp: "",
      firstName: "",
      lastName: "",
      emailCreate: "",
      mdpCreate: "",
      mdpVerify: "",
      conservatoire: "",
      school: ["ecole A", "ecole B", "ecole C"],
      createAccount: false,
    };
  },
  methods: {
    checkLogin() {
      /////////////////fonction a changer apres//////////
      if (this.login != "admin" || this.mdp != "admin") {
        this.error = true;
      } else {
        this.error = false;
        this.$store.state.connect = true;
        //récupérer les data de la base de donnée
        Data.then((res) => {
          this.$store.dispatch("CREATE_USER", res);
          let avancement = [];

          //calcul des progressions des chapitres par année
          res.progression.forEach((annee) => {
            if (Object.keys(annee).length > 0) {
              let item = annee.chapter;
              let avancementItem = {
                note: this.calculProgressionChapter(
                  item.note.entrainement,
                  item.note.quiz
                ),
                rythme: this.calculProgressionChapter(
                  item.rythme.entrainement,
                  item.rythme.quiz
                ),
                partition:
                  (this.calculProgressionChapter(
                    item.partition.nuance.entrainement,
                    item.partition.nuance.quiz
                  ) +
                    this.calculProgressionChapter(
                      item.partition.structure.entrainement,
                      item.partition.structure.quiz
                    )) /
                  2,
                instruments: this.calculProgressionChapter(
                  item.instruments.entrainement,
                  false,
                  false
                ),
              };
              avancement.push(avancementItem);
            } else {
              avancement.push({});
            }
          });

          //calcul des progression des années

          let yearProgression = [];
          avancement.forEach((annee) => {
            let total = 0;
            let sum = 0;
            if (Object.keys(annee).length > 0) {
              for (const value in annee) {
                total++;
                sum += annee[value];
              }
              yearProgression.push(Math.round(sum / total));
            } else {
              yearProgression.push(0);
            }
          });

          // push toutes ces données dans VUEX
          Promise.all([
            this.$store.dispatch("CREATE_CHAPTER_PROGRESSION", avancement),
            this.$store.dispatch("CREATE_YEAR_PROGRESSION", yearProgression),
          ]).then(() => {
            this.$router.push({ name: "yearselect" });
          });
        });
      }
    },
    calculProgressionChapter(entrainement, quiz, isQuiz = true) {
      let total = 0;
      let nbTrue = 0;
      entrainement.forEach((item) => {
        if (item) {
          nbTrue++;
        }
        total++;
      });
      if (isQuiz) {
        if (quiz) {
          nbTrue++;
        }
        total++;
      }

      return Math.round((nbTrue * 100) / total);
    },
    retour() {
      /*firstName: "",
      lastName: "",
      emailCreate: "",
      mdpCreate: "",
      mdpVerify: "",
      conservatoire: "",*/

      this.firstName = "";
      this.lastName = "";
      this.emailCreate = "";
      this.mdpCreate = "";
      this.mdpVerify = "";
      this.conservatoire = "";
      this.createAccount = false;
    },
  },
};
</script>

<style scoped>
@media all and (max-width: 1098px) {
  .right {
    display: none;
  }
  .left {
    width: 100% !important;
  }
  .form {
    margin: 0 !important;
  }
  .formBox {
    justify-content: flex-start !important;
  }
}
@media all and (max-width: 595px) {
  .title {
    font-size: 50px !important;
  }
  .form {
    width: 100% !important;
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: space-around !important;
  }
  .formEmail,
  .formMdp {
    font-size: 15px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    width: 100% !important;
  }
  .formEmail input,
  .formMdp input,
  .create-account input {
    width: 80% !important;
  }
  button {
    width: 80% !important;
  }
  .form .title,
  .formEmail,
  .formMdp,
  .formConnect,
  select {
    margin: 0 !important;
  }
}
.error {
  margin-top: 10px;
  color: red;
  width: 100%;
  text-align: center;
  animation-name: errorAppear;
  animation-duration: 1s;
  font-size: 1.5em;
}
@keyframes errorAppear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.error p {
  font-family: roboto !important;
}
#stayconnect {
  appearance: none;
  background-color: #fafafa;
  border: 1px solid #cacece;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 9px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  outline: none;
}
#stayconnect:active,
#stayconnect:checked:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px 1px 3px rgba(0, 0, 0, 0.1);
}

#stayconnect:checked {
  background-color: #e9ecee;
  border: 1px solid #adb8c0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
    inset 15px 10px -12px rgba(255, 255, 255, 0.1);
  color: #99a1a7;
}
#stayconnect:checked:after {
  content: "\2714";
  font-size: 14px;
  position: absolute;
  top: 0px;
  left: 3px;
  color: #99a1a7;
}
.form .title,
.formEmail,
.formMdp,
.formConnect {
  margin: 50px 0;
}
.form {
  margin-bottom: 80px;
}
.formConnect {
  margin-left: 55px;
}
.connectLab {
  font-size: 1.8em;
  margin-left: 20px;
}
.formEmail input,
.formMdp input,
.create-account input,
select {
  display: block;
  margin-left: 20px;
  padding-left: 10px;
  border-radius: 13px;
  border: 1px solid var(--main);
  height: 40px;
  width: 500px;
  font-size: 1.4em;
  color: var(--main);
  outline: none;
}

.emailLab {
  color: var(--purple);
  font-size: 2.5em;
}
.mdpLab {
  color: var(--orange);
  font-size: 2.5em;
}
.connectLab {
  color: var(--main);
}
.formBox {
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  width: 100%;
  flex: 1;
}
.form .title,
.create-account .title {
  color: var(--blue);
  font-size: 4.2em;
}
.container {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.right {
  height: 100%;
  width: 45%;
  background: url("../assets/Mascotte.svg") no-repeat;
  background-position: center;
  background-size: 100%;
}
.left {
  height: 100%;
  width: 55%;
  display: flex;
  flex-direction: column;
}
.buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.buttonsCreate {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.buttonsCreate button {
  width: 250px;
  font-size: 20px;
}
button {
  background: linear-gradient(180deg, #06446b 0%, rgba(16, 61, 92, 0.69) 100%);
  width: 500px;
  height: 40px;
  border: none;
  border-radius: 13px;
  font-size: 1.7em;
  color: white;
  cursor: pointer;
  margin-top: 20px;
  outline: none;
}
.create {
  font-size: 15px;
  width: auto;
  padding: 0 20px;
}
.greenBackground {
  border-color: var(--green) !important;
  border-width: 3px !important;
}
.redBackground {
  border-color: var(--red) !important;
  border-width: 3px !important;
}
</style>
