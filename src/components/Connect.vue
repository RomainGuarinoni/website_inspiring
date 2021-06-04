<template>
  <div class="container">
    <div class="credit" @click="goToCredit()">
      Crédit
    </div>
    <div class="loading-logo" v-if="loading">
      <img src="@/assets/Mascotte.svg" alt="mascotte" />
      <p>Chargement ...</p>
    </div>
    <div class="left" :class="{ loading: loading }">
      <Navbar type="1" class="navbar" />
      <div class="formBox">
        <form v-on:submit.prevent="" v-if="!createAccount && !forgetMDP">
          <div class="form">
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
              <p class="changeMDP" @click="forgetMDP = true">
                Mot de passe oublié ?
              </p>
            </div>
            <div class="formConnect">
              <input
                type="checkbox"
                id="stayconnect"
                name="stayconnect"
                value="true"
                v-model="stayconnect"
              />
              <label for="stayconnect" class="connectLab"
                >Rester connecté</label
              >
            </div>
            <div class="buttons">
              <button type="submit" @click="onSubmit">Se connecter</button>
              <div v-show="error" class="error">
                <p>identifiant ou mot de passe erroné</p>
              </div>
              <p>
                Tu n'as pas encore de compte ?
                <button @click="createAccountPage()" class="create">
                  Créer un compte
                </button>
              </p>
            </div>
          </div>
        </form>
        <form
          v-on:submit.prevent="createNewAccount()"
          v-else-if="createAccount && !forgetMDP"
        >
          <div class="create-account">
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
            <label for="mdpCreate" class="emailLab purple"
              >Mot de passe (au moins 6 caractères)
            </label>
            <input
              type="password"
              id="mdpCreate"
              name="mdpCreate"
              placeholder="Ton mot de passe"
              v-model="mdpCreate"
            />
            <label for="mdpVerify" class="emailLab red"
              >Confirme ton mot de passe</label
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
            <label for="conservatoire" class="emailLab blue">Ton école</label>
            <select
              id="conservatoire"
              name="conservatoire"
              v-model="conservatoire"
            >
              <option value="" selected disabled>--Choisis une école--</option>
              <option
                v-for="element in school"
                :key="element.id"
                :value="element.id"
              >
                {{ element.name }}
              </option>
            </select>
            <p v-if="error" class="error">
              {{ createError }}
            </p>
            <div class="buttonsCreate">
              <button type="submit">
                Créer un compte
              </button>
              <button @click="retour()">Retour</button>
            </div>
          </div>
        </form>
        <form v-else v-on:submit.prevent="createNewAccount()" class="forgetMdp">
          <p class="forgetTitle">Réinitialiser son mot de passe</p>
          <div class="emailResetBox">
            <label for="emailReset">Email</label>
            <input
              type="text"
              id="emailReset"
              autocomplete="email"
              v-model="emailPassword"
            />
          </div>
          <p v-if="resetPasswordError" class="red">Une erreur est survenue</p>
          <p v-if="resetPasswordState" class="green">
            Un mail vous a été envoyé
          </p>
          <div class="buttonReset">
            <button type="submit" @click="resetPassword">Réinitialiser</button>
            <button type="submit" @click="forgetMDP = false">Retour</button>
          </div>
        </form>
      </div>
    </div>
    <div class="right" :class="{ loading: loading }"></div>
  </div>
</template>

<script>
  import Navbar from "./Navbar";
  import axios from "axios";
  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        error: false,
        login: "",
        mdp: "",
        stayconnect: "",
        firstName: "",
        lastName: "",
        emailCreate: "",
        mdpCreate: "",
        mdpVerify: "",
        conservatoire: "",
        school: ["ecole A", "ecole B", "ecole C"],
        createAccount: false,
        loading: false,
        createError: "",
        forgetMDP: false,
        emailPassword: "",
        resetPasswordError: false,
        resetPasswordState: false,
      };
    },

    methods: {
      onSubmit() {
        this.loading = true;
        var bodyFormData = new FormData();
        bodyFormData.append("email", this.login);
        bodyFormData.append("password", this.mdp);
        axios({
          method: "post",
          url: "http://api.diesy.fr/api/login",
          data: bodyFormData,
          //headers: { "Content-Type": "multipart/form-data" },
        })
          .then((data) => {
            this.error = false;
            console.log(`return : ${data.data}`);
            if (this.stayconnect) {
              localStorage.setItem("login", this.login);
              localStorage.setItem("mdp", this.mdp);
            } else {
              if (
                localStorage.getItem("login") != null &&
                localStorage.getItem("mdp") != null
              ) {
                localStorage.removeItem("login");
                localStorage.removeItem("mdp");
              }
            }
            this.$store.state.connect = true;
            this.$store.dispatch("SET_TOKEN", data.data.token);
            return axios({
              method: "post",
              url: "http://api.diesy.fr/api/getFullUserProfile",
              headers: { Authorization: `Bearer ${this.$store.state.token}` },
            });
          })
          .catch((e) => {
            console.log(`error login ${e}`);
            this.error = true;
            this.loading = false;
          })
          .then((data) => {
            console.log(data.data);
            this.$store.dispatch("CREATE_USER", data.data);
            let avancement = [];
            //calcul des progressions des chapitres par année
            let item = data.data.progression.chapter;
            let avancementItem = {
              note: this.calculProgressionChapter(
                item.note.entrainement,
                item.note.quiz
              ),
              rythme: this.calculProgressionChapter(
                item.rythme.entrainement,
                item.rythme.quiz
              ),
              partition: this.calculProgressionChapterPartition(item),
              instrument: this.calculProgressionChapter(
                item.instrument.entrainement,
                false,
                false
              ),
            };
            avancement.push(avancementItem);

            //push rien pour les deux années suivantes
            for (let i = 0; i < 2; i++) {
              avancement.push({});
            }

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
            Promise.all([
              this.$store.dispatch("CREATE_CHAPTER_PROGRESSION", avancement),
              this.$store.dispatch("CREATE_YEAR_PROGRESSION", yearProgression),
            ]).then(() => {
              this.$router.push({ name: "yearselect" });
            });
          })
          .catch((e) => {
            console.log(`error receinving progression ${e}`);
            this.loading = false;
          })
          .finally(() => {
            this.$store.dispatch("toString");
            this.loading = false;
          });
      },
      createAccountPage() {
        this.loading = true;
        this.error = false;
        axios({
          method: "get",
          url: "http://api.diesy.fr/api/schools",
        })
          .then((res) => {
            this.school = res.data;
          })
          .catch((e) => console.log(e))
          .finally(() => {
            this.loading = false;
            this.createAccount = true;
          });
      },
      createNewAccount() {
        if (
          this.firstName != "" &&
          this.lastName != "" &&
          this.emailCreate != "" &&
          this.mdpCreate != "" &&
          this.mdpVerify == this.mdpCreate &&
          this.conservatoire != ""
        ) {
          this.loading = true;
          var bodyFormData = new FormData();
          bodyFormData.append("name", this.firstName);
          bodyFormData.append("lastname", this.lastName);
          bodyFormData.append("email", this.emailCreate);
          bodyFormData.append("password", this.mdpCreate);
          bodyFormData.append("school_id", this.conservatoire);
          axios({
            url: "http://api.diesy.fr/api/register",
            data: bodyFormData,
            method: "post",
          })
            .then((data) => {
              this.$store.dispatch("SET_TOKEN", data.data.token);
              return axios({
                method: "post",
                url: "http://api.diesy.fr/api/getFullUserProfile",
                headers: { Authorization: `Bearer ${this.$store.state.token}` },
              });
            })
            .catch((err) => {
              console.log("erreur pour récuprer le token");
              console.log(err);
              this.createError = "Cette adresse mail éxiste déjà";
              this.error = true;
              this.loading = false;
            })
            .then((data) => {
              this.$store.dispatch("CREATE_USER", data.data);
              let avancement = [];
              //calcul des progressions des chapitres par année
              let item = data.data.progression.chapter;
              let avancementItem = {
                note: this.calculProgressionChapter(
                  item.note.entrainement,
                  item.note.quiz
                ),
                rythme: this.calculProgressionChapter(
                  item.rythme.entrainement,
                  item.rythme.quiz
                ),
                partition: this.calculProgressionChapterPartition(item),
                instrument: this.calculProgressionChapter(
                  item.instrument.entrainement,
                  false,
                  false
                ),
              };
              avancement.push(avancementItem);

              //push rien pour les deux années suivantes
              for (let i = 0; i < 2; i++) {
                avancement.push({});
              }

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
              Promise.all([
                this.$store.dispatch("CREATE_CHAPTER_PROGRESSION", avancement),
                this.$store.dispatch(
                  "CREATE_YEAR_PROGRESSION",
                  yearProgression
                ),
              ]).then(() => {
                this.$store.state.connect = true;
                this.$router.push({ name: "yearselect" });
              });
            })
            .catch((e) => {
              console.log(`error receinving progression ${e}`);
              this.createError = "Cette adresse mail éxiste déjà";
              this.error = true;
              this.loading = false;
            })
            .finally(() => {
              this.$store.dispatch("toString");
              this.error = false;
              this.loading = false;
            });
        } else {
          this.createError = "Tous les champs ne sont pas valide";
          this.error = true;
          this.loading = false;
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
      calculProgressionChapterPartition(item) {
        let total = 5;
        let nbTrue = 0;
        if (item.partition.nuance.entrainement[0]) {
          nbTrue++;
        }
        if (item.partition.nuance.quiz) {
          nbTrue++;
        }
        if (item.partition.structure.entrainement[0]) {
          nbTrue++;
        }
        if (item.partition.structure.quiz) {
          nbTrue++;
        }
        if (item.partition.quiz) {
          nbTrue++;
        }
        return Math.round((nbTrue * 100) / total);
      },
      retour() {
        this.firstName = "";
        this.lastName = "";
        this.emailCreate = "";
        this.mdpCreate = "";
        this.mdpVerify = "";
        this.conservatoire = "";
        this.createAccount = false;
        this.error = false;
      },
      goToCredit() {
        this.$router.push({ name: "credit" });
      },
      resetPassword() {
        axios({
          method: "post",
          url: "http://api.diesy.fr/api/resetPassword",
          data: {
            email: this.emailPassword,
          },
        })
          .then(() => (this.resetPasswordState = true))
          .catch(() => (this.resetPasswordError = true));
      },
    },

    mounted: function() {
      if (
        localStorage.getItem("login") != null &&
        localStorage.getItem("mdp") != null
      ) {
        this.mdp = localStorage.getItem("mdp");
        this.login = localStorage.getItem("login");
        this.stayconnect = true;
      }
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
    position: relative;
    z-index: 1;
    width: 45%;
    background: url("../assets/Mascotte.svg") no-repeat;
    background-position: center;
    background-size: 100%;
  }
  .left {
    position: relative;
    z-index: 1;
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
    background: linear-gradient(
      180deg,
      #06446b 0%,
      rgba(16, 61, 92, 0.69) 100%
    );
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
    font-size: 17px;
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
  .loading {
    pointer-events: none;
    filter: grayscale(90%) blur(4px);
  }
  .loading-logo {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    margin-left: -100px;
    margin-top: -100px;
  }
  .loading-logo img {
    width: 200px;
    height: auto;
    animation: jump ease-in-out 500ms infinite;
  }
  @keyframes jump {
    0% {
      transform: translateY(-0px);
    }
    50% {
      transform: translateY(-50px);
    }
    100% {
      transform: translateY(-0px);
    }
  }
  .credit {
    position: absolute;
    bottom: 20px;
    right: 20px;

    padding: 10px 20px;
    background: var(--main);
    color: white;
    border: none;
    transition: transform ease 200ms;
    border-radius: 10px;
    cursor: pointer;
    position: absolute;
    z-index: 9999;
  }
  .credit:hover {
    transform: scale(1.1);
  }
  .changeMDP {
    margin: 10px 0 0 25px;
    color: var(--blue);
    cursor: pointer;
  }
  .forgetMdp {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-around;
    padding: 190px 0;
  }
  .forgetTitle {
    color: var(--blue);
    font-size: 40px;
  }
  .forgetMdp input {
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
  .buttonReset button {
    width: auto !important;
    min-width: 200px;
    margin: 0 20px;
  }
  .emailResetBox label {
    color: var(--orange);
    font-size: 25px;
  }
</style>
