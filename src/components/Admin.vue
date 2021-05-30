<template>
  <div class="container">
    <Navbar type="2" class="navbar" />
    <div class="popup" v-show="!isPopuphidden" ref="test">
      <h1>Voulez-vous vraiment supprimer cet utilisateur</h1>
      <p>{{ userDeleteName }}</p>
      <div class="buttonDeleteBox">
        <div class="buttonDelete" @click="deleteUserFunction">Confirmer</div>
        <div class="buttonDelete" @click="isPopuphidden = true">Annuler</div>
      </div>
    </div>
    <div class="box">
      <div class="selectUser" id="test">
        <h2>Sélectionner un élève</h2>
        <input
          class="queryInput"
          type="text"
          placeholder="rechercher un élève"
          v-model="studentQuery"
        />
        <div class="scrollUser" v-if="!loadingUser">
          <UserSelect
            v-for="user in studentQueryArray"
            :key="user.id"
            :userID="user.id"
            :name="user.name"
            :lastname="user.lastname"
            @userHasBeenSelected="loadDataFunction"
            @deleteUser="makeDeletePop"
          />
        </div>
        <div class="loading-logo" v-if="loadingUser">
          <img src="@/assets/Mascotte.svg" alt="mascotte" />
          <p>Chargement . . .</p>
        </div>
      </div>
      <div class="graph">
        <div class="loading-logo" v-if="loadData">
          <img src="@/assets/Mascotte.svg" alt="mascotte" />
          <p>Chargement . . .</p>
        </div>
        <div class="graphs" v-if="displayData && !error">
          <div class="boxGraph">
            <h2>Progresion mini jeux lecture de notes</h2>
            <div class="boxGraphInside">
              <div class="noteBoutonsBox">
                <div
                  class="noteBoutons"
                  v-for="(level, index) in 6"
                  :key="index"
                  @click="changeNoteLevel(index, 6)"
                >
                  level {{ index + 1 }}
                </div>
              </div>
              <Graph :dataNote="dataNote" :labelNote="labelNote" />
            </div>
          </div>
          <div class="boxGraph">
            <h2>Ratio réussite / échec jeux de rythme</h2>
            <div class="boxGraphInside">
              <div class="noteBoutonsBox">
                <div
                  class="noteBoutons"
                  v-for="(level, index) in 3"
                  :key="index"
                  @click="changeRythmeLevel(index, 8)"
                >
                  level {{ index + 1 }}
                </div>
              </div>
              <Doughnut
                :reussiteProps="reussite"
                :echecProps="echec"
                :labelRythme="['réussite', 'échec']"
              />
            </div>
            <div class="boxGraph">
              <h2>Progression Quizz Nuance</h2>
              <div class="boxGraphInside">
                <GraphNuance
                  :dataNuance="dataNuance"
                  :labelNuance="labelNuance"
                />
              </div>
            </div>
            <div class="boxGraph">
              <h2>Progression Quizz structure d'une portée</h2>
              <div class="boxGraphInside">
                <GraphStructure
                  :dataNuance="dataStructure"
                  :labelNuance="labelStructure"
                />
              </div>
            </div>
            <div class="boxGraph">
              <h2>Progression fiche instruments</h2>
              <h3>{{ nbreInstruments }} / 15</h3>
            </div>
            <div class="boxGraph">
              <h2>Avancement Quiz finaux</h2>
              <div class="quizBoxFinal">
                <div class="quizItem">
                  <h3>Quiz lecture de note</h3>
                  <img src="@/assets/sol.png" alt="" />
                  <p style="color:var(--green)" v-if="quizNote">Réussi</p>
                  <p style="color : var(--red)" v-else>En Attente</p>
                </div>
                <div class="quizItem">
                  <h3>Quiz dictée rythmique</h3>
                  <img src="@/assets/croche.png" alt="" />
                  <p style="color:var(--green)" v-if="quizRythme">Réussi</p>
                  <p style="color : var(--red)" v-else>En Attente</p>
                </div>
                <div class="quizItem">
                  <h3>Quiz structure d'une portée</h3>
                  <img src="@/assets/partition.png" alt="" />
                  <p style="color:var(--green)" v-if="quizStructure">Réussi</p>
                  <p style="color : var(--red)" v-else>En Attente</p>
                </div>
                <div class="quizItem">
                  <h3>Quiz nuances</h3>
                  <img src="@/assets/crescendo.png" alt="" />
                  <p style="color:var(--green)" v-if="quizNuance">Réussi</p>
                  <p style="color : var(--red)" v-else>En Attente</p>
                </div>
                <div class="quizItem">
                  <h3>Quiz final lis une partition</h3>
                  <img src="@/assets/barre_mesure.png" alt="" />
                  <p style="color:var(--green)" v-if="quizFinalPartition">
                    Réussi
                  </p>
                  <p style="color : var(--red)" v-else>En Attente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-if="error">
          Une erreur est survenue, veuillez réessayerr plus tard
        </p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
  import UserSelect from "./UserSelect";
  import axios from "axios";
  import Navbar from "./Navbar";
  import Graph from "./Graph";
  import Doughnut from "./Doughnut";
  import GraphNuance from "./GraphNuance";
  import GraphStructure from "./GraphStructure";
  export default {
    components: {
      Navbar,
      UserSelect,
      Graph,
      Doughnut,
      GraphStructure,
      GraphNuance,
    },
    data() {
      return {
        userArray: new Array(),
        loadingUser: true,
        loadData: false,
        displayData: false,
        currentlevelRythme: 1,
        error: false,
        userObject: new Object(),
        dataNote: [],
        labelNote: [],
        reussite: Number,
        echec: Number,
        dataNuance: [],
        labelNuance: [],
        dataStructure: [],
        labelStructure: [],
        nbreInstruments: Number,
        quizNote: false,
        quizRythme: false,
        quizStructure: false,
        quizNuance: false,
        quizFinalPartition: false,
        studentQuery: "",
        studentQueryArray: Array,
        isPopuphidden: true,
        userIDDelete: Number,
        userDeleteName: String,
        arrayTest: [1, 2, 3, 4],
      };
    },
    watch: {
      studentQuery: function() {
        this.queryStudent();
      },
    },
    methods: {
      deleteUserFunction() {
        try {
          this.studentQueryArray.splice(
            this.studentQueryArray.findIndex(
              (user) => user.id == this.userIDDelete
            ),
            1
          );
        } catch (err) {
          console.log(err);
        }

        this.userArray.splice(
          this.userArray.findIndex((user) => user.id == this.userIDDelete),
          1
        );

        this.isPopuphidden = true;
        axios({
          method: "post",
          url: "http://api.engineeringhpb.fr/api/deleteUser",
          data: {
            user_id: this.userIDDelete,
          },
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        });
      },
      queryStudent() {
        this.studentQueryArray = [];
        if (this.queryStudent == "") {
          this.studentQueryArray = this.userArray;
        } else {
          this.userArray.forEach((user) => {
            let name = user.name + user.lastname;
            if (name.toUpperCase().includes(this.studentQuery.toUpperCase())) {
              this.studentQueryArray.push(user);
            }
          });
        }
      },
      makeDeletePop(payload) {
        this.isPopuphidden = false;
        this.userIDDelete = payload.userID;
        this.userDeleteName = payload.name;
      },
      loadDataFunction(payload) {
        //afficher le loader
        this.displayData = false;
        this.loadData = true;
        this.error = false;
        axios({
          method: "post",
          url: "http://api.engineeringhpb.fr/api/user/getMGQ",
          data: {
            user_id: payload.userID,
          },
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
          .then((res) => {
            this.userObject = res.data;

            this.loadData = false;
            this.displayData = true;
            this.filterID(2).length > 0 ? (this.quizStructure = true) : null;
            this.filterID(4).length > 0 ? (this.quizNuance = true) : null;
            this.filterID(5).length > 0
              ? (this.quizFinalPartition = true)
              : null;
            this.filterID(7).length > 0 ? (this.quizNote = true) : null;
            this.filterID(9).length > 0 ? (this.quizRythme = true) : null;
            this.dataNote = this.filterID(6)
              .filter((object) => object.level == 0)
              .map(({ score }) => score * 100);

            this.labelNote = this.filterID(6)
              .filter((object) => object.level == 0)
              .map(({ created_at }) => created_at)
              .map((created_at) => {
                return created_at.split("T")[0];
              });
            this.reussite = this.filterID(8)
              .filter((object) => object.level == 0)
              .map(({ score }) => score)
              .filter((score) => score == 1).length;
            this.echec = this.filterID(8)
              .filter((object) => object.level == 0)
              .map(({ score }) => score)
              .filter((score) => score == 0).length;
            this.dataNuance = this.filterID(3).map(({ score }) => score * 100);
            this.labelNuance = this.filterID(3)
              .map(({ created_at }) => created_at)
              .map((created_at) => {
                return created_at.split("T")[0];
              });
            this.dataStructure = this.filterID(1).map(
              ({ score }) => score * 100
            );
            this.labelStructure = this.filterID(1)
              .map(({ created_at }) => created_at)
              .map((created_at) => {
                return created_at.split("T")[0];
              });
            this.nbreInstruments = this.filterID(10).length;
          })
          .catch((err) => {
            console.log(`error : ${err}`);
            this.error = true;
          });
      },
      filterID(id) {
        return this.userObject.filter((score) => score.MGQ_id == id);
      },
      changeNoteLevel(index, id) {
        this.dataNote = this.filterID(id)
          .filter((object) => object.level == index)
          .map(({ score }) => score * 100);

        this.labelNote = this.filterID(id)
          .filter((object) => object.level == index)
          .map(({ created_at }) => created_at)
          .map((created_at) => {
            return created_at.split("T")[0];
          });
      },
      changeRythmeLevel(index, id) {
        console.log(index);
        this.reussite = this.filterID(id)
          .filter((object) => object.level == index)
          .map(({ score }) => score)
          .filter((score) => score == 1).length;
        this.echec = this.filterID(id)
          .filter((object) => object.level == index)
          .map(({ score }) => score)
          .filter((score) => score == 0).length;
        console.log(this.reussite, this.echec);
      },
    },
    mounted: function() {
      axios({
        method: "get",
        url: "http://api.engineeringhpb.fr/api/users",
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      })
        .then((res) => {
          this.loadingUser = false;
          this.userArray = res.data;
          this.queryStudent();
        })
        .catch((err) => console.log(err));
    },
  };
</script>

<style scoped>
  .popup {
    width: 800px;
    height: 350px;
    border: none;
    box-shadow: 0 0 10px rgba(161, 161, 161, 0.61);
    border-radius: 15px;
    position: absolute;
    top: 40%;
    left: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background: white;
    text-align: center;
    z-index: 100000;
  }
  .buttonDeleteBox {
    width: 100%;
    display: flex;
    align-items: center;

    justify-content: space-around;
  }
  .buttonDelete {
    padding: 15px 25px;
    font-size: 20px;
    text-align: center;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 20px;
    background: var(--red);
  }
  .buttonDelete:first-of-type {
    background: var(--green);
  }
  .container {
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }
  .box {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .graph {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
  }
  .selectUser {
    width: 20%;
    min-width: 200px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .scrollUser {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: scroll;
  }

  .graph {
    flex: 1;
    height: 100%;
    width: 100%;
    padding: 0 30px;
  }

  .graphs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .boxGraph {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;
  }
  .boxGraphInside {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .graphNoteContainer {
    width: 100%;
    height: 100%;
  }
  .loading-logo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .loading-logo img {
    width: 150px;
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
  .noteBoutonsBox {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .noteBoutons {
    padding: 20px 15px;
    border: none;
    text-align: center;
    box-shadow: 0 0 10px rgb(163, 163, 163);
    margin: 5px 0;
    border-radius: 10px;
    cursor: pointer;
    transition: all ease 300ms;
  }
  .noteBoutons:hover {
    transform: translateY(-5px);
  }
  .quizBoxFinal {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }
  .quizItem {
    min-width: 270px;
    min-height: 400px;
    border: none;
    box-shadow: 0 0 10px rgb(167, 167, 167);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin: 20px;
  }
  .quizItem img {
    width: 100px;
    height: auto;
  }
  h2 {
    margin: 20px 0;
  }
  .queryInput {
    padding: 10px;
    border: 2px solid var(--main);
    border-radius: 12px;
    width: 90%;
    outline: none;
  }
</style>
