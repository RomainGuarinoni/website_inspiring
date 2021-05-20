<template>
  <div class="container">
    <Navbar type="2" class="navbar" />
    <div class="box">
      <div class="selectUser" id="test">
        <h2>Sélectionner un élève</h2>
        <div class="scrollUser" v-if="!loadingUser">
          <UserSelect
            v-for="user in userArray"
            :key="user.id"
            :userID="user.id"
            :name="user.name"
            :lastname="user.lastname"
            @userHasBeenSelected="loadDataFunction"
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
          <div class="boxGraphNote">
            <h2>Progresion mini jeux lecture de notes</h2>
            <div class="boxGraphNotesInside">
              <div class="noteBoutonsBox">
                <div
                  class="noteBoutons"
                  v-for="(level, index) in 6"
                  :key="index"
                  @click="currentlevelNote = index + 1"
                >
                  level {{ index + 1 }}
                </div>
              </div>
              <Graph :data="data" :option="option" />
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
export default {
  components: {
    Navbar,
    UserSelect,
    Graph,
  },
  data() {
    return {
      userArray: new Array(),
      loadingUser: true,
      loadData: false,
      displayData: false,
      currentlevelNote: 1,
      currentlevelRythme: 1,
      error: false,
      userObject: new Object(),
      data: {},
      option: {},
    };
  },
  methods: {
    loadDataFunction(payload) {
      //afficher le loader
      this.displayData = false;
      this.loadData = true;
      this.error = false;
      console.log(`load user ${payload.userID}`);
      axios({
        method: "post",
        url: "http://api.engineeringhpb.fr/api/user/getMGQ",
        data: {
          user_id: payload.userID,
        },
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      })
        .then((res) => {
          console.log(`we got the Data`);
          this.userObject = res.data;

          this.loadData = false;
          this.displayData = true;
          (this.data = {
            labels: [
              "Mercury",
              "Venus",
              "Earth",
              "Mars",
              "Jupiter",
              "Saturn",
              "Uranus",
              "Neptune",
            ],
            datasets: [
              {
                label: "Number of Moons",
                data: [0, 0, 1, 2, 79, 82, 27, 14],
                backgroundColor: "rgba(54,73,93,.5)",
                borderColor: "#36495d",
                borderWidth: 3,
              },
            ],
          }),
            (this.option = {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                yAxis: {
                  ticks: {
                    backdropColor: "rgba(255, 255, 255, 1)",
                    color: "rgba(255, 255, 255, 0.5)",
                    padding: 0,
                  },
                  grid: {
                    color: "rgba(255,255,255,0.2)",
                    display: false,
                  },
                },
                xAxis: {
                  ticks: {
                    backdropColor: "rgba(255, 255, 255, 1)",
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                  grid: {
                    color: "rgba(255,255,255,0.2)",
                    display: false,
                  },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    color: "white", //set your desired color
                  },
                },
              },
              interaction: {
                mode: "index",
                intersect: false,
              },
            }),
            console.log(document.getElementById("test"));
          console.log(this.filterID(6));
        })
        .catch((err) => {
          console.log(`error : ${err}`);
          this.error = true;
        });
    },
    filterID(id) {
      return this.userObject.filter((score) => score.MGQ_id == id);
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
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
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

.boxGraphNote {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.boxGraphNotesInside {
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid green;
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
  padding: 20px;
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
</style>
