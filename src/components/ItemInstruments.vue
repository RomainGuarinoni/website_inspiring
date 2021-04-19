<template>
  <div class="boxAll">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="card">
      <div class="retour" @click="retour()">
        <font-awesome-icon id="chevron" :icon="['fas', 'chevron-left']" />
        <p>Retour</p>
      </div>
      <h1>{{ info.nom }}</h1>
      <div class="content">
        <div class="left">
          <div class="top">
            <p><span class="underline">Famille : </span>{{ info.famille }}</p>
            <p>
              <span class="underline">Invention : </span> {{ info.Invention }}
            </p>
            <p><span class="underline">Clef utilisé : </span>{{ info.cle }}</p>
            <p>
              <span class="underline">Musiciens célèbres : </span>
              <span v-for="(element, index) in info.musicien" :key="index"
                >{{ element }}
                <span v-if="index != info.musicien.length - 1"> , </span>
              </span>
            </p>
            <p><span class="underline">Ses composants : </span></p>
            <div class="centerImg">
              <img
                :src="img(0)"
                class="img"
                alt="img des composants de l'instruments"
              />
            </div>
          </div>
          <div class="son">
            <p><span class="underline">Gamme jouée : </span></p>
            <audio :src="audio()" controls></audio>
          </div>
        </div>
        <div class="right">
          <h2><span class="underline">Comment le son est produit?</span></h2>
          <p>{{ info.fonctionnement[0] }}</p>
          <img
            :src="img(1)"
            class="img"
            alt="img des composants de l'instruments"
          />
          <p>{{ info.fonctionnement[1] }}</p>
          <img
            :src="img(2)"
            class="img"
            alt="img des composants de l'instruments"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
export default {
  props: {
    info: {
      type: Object,
    },
    year: {
      type: undefined,
    },
    index: {
      type: Number,
    },
  },
  components: {
    Navbar,
  },
  methods: {
    retour() {
      this.$router.go(-1);
    },
    img(index) {
      return require(`@/assets/instruments/${this.info.img[index]}`);
    },
    audio() {
      if (this.info.gamme != "") {
        return require(`@/assets/instruments/audio/${this.info.gamme}.mp3`);
      } else {
        return "";
      }
    },
  },
  mounted: function() {
    this.$store.dispatch("ENTRAINEMENT_VALIDE", {
      level: this.index,
      year: this.year,
      chapter: "instrument",
      id: 10,
      score: 1,
    });
  },
};
</script>

<style scoped>
.centerImg {
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
}
.boxAll {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  color: var(--main);
  font-size: 40px;
}
.content {
  height: 100%;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}
.right,
.left {
  width: 40%;
  min-width: 400px;
  height: 100%;
}
.right {
  background: #e8effa;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.right p,
.right h2 {
  margin: 20px;
}
.top {
  width: 100%;
  height: 80%;
  background: #f9e9f4;
  border-radius: 20px;
  padding: 20px;
  line-height: 35px;
  display: flex;
  flex-direction: column;
}
.son {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 15%;
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
.underline {
  text-decoration: underline;
  font-weight: bold;
}
.img {
  width: 250px;
  height: auto;
  margin: auto;
}
.img:nth-child(1) {
  width: 500px;
}
</style>
