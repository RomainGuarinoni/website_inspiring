<template>
  <div class="container">
    <div class="retour">
      <button @click="connect()">Se connecter</button>
    </div>
    <h1>Bienvenue sur Inspiring Music theory</h1>
    <img class="groupe" src="../assets/credit/groupe.png" alt="" />
    <h2>
      Un petit message de Frédérick PETELOT, client du projet et directeur de
      l'école de musique d'Aulnoy-lez-Valenciennes
    </h2>
    <p class="msgPetelot">
      En 2018, Marie Charles, élève ingénieure à l'IMT de Douai m'appelait pour
      me demander si j'étais intéressé pour réaliser un projet informatique sur
      le solfège : le but était de dédramatiser cet apprentissage qui a rebuté
      nombre d'élèves qui voulaient au départ seulement "faire de la musique".
    </p>

    <p></p>
    <p class="msgPetelot">
      En réalité, Marie était aussi professeure de Solfège (et de Flûte
      traversière) chez nous, à l'école de Musique d'Aulnoy-lez-Valenciennes, et
      bien sûr, galérait pour enseigner cette affreuse discipline.
    </p>

    <p></p>
    <p class="msgPetelot">
      Alors je lui ai dit ok, et un premier jet a vu le jour. L'année suivante,
      ce projet a été remodelé. Mais l'arrivée de Covid19 stoppa net l'aventure.
    </p>
    <p class="msgPetelot">
      En septembre 2020, une équipe de choc a alors relevé une 3ème fois le défi
      (pour être honnête je n'étais plus très motivé).
    </p>
    <p class="msgPetelot">
      Mais ils ont bien défendu la chose et j'ai dit à nouveau "pourquoi pas".
    </p>
    <p class="msgPetelot">
      Et je n'ai pas été déçu : une jolie équipe (tous musiciens !), à l'écoute,
      volontaire, posée, réfléchie, inventive, a créé le site qui est devant
      vous. Ça ne paraît pas, mais ils sont repartis de rien, ont dû se former à
      de multiples langages, de logiciels, me supporter, etc etc...
    </p>
    <p class="msgPetelot">
      Si le site vous plaît, c'est grâce à eux, s'il ne vous plaît pas, c'est à
      cause de moi : envoyez-moi un message et je ferai améliorer par l'équipe
      suivante qui voudra bien reprendre le flambeau.
    </p>
    <p class="msgPetelot">
      Si vous êtes ici parce que vous cherchez une équipe dynamique, motivée,
      embauchez-les tous d'un coup. Je l'aurais bien fait, mais je suis
      maintenant trop vieux pour me relancer dans ce type d'aventures...
    </p>
    <p class="msgPetelot">A eux de se présenter, je leur dois bien ça…</p>
    <h2>Le groupe de projet</h2>
    <div class="credit">
      <div class="card" v-for="(item, index) in groupe.membre" :key="item.nom">
        <img :src="getImg(index)" alt="" />
        <div class="right">
          <h3>{{ item.nom }}</h3>
          <div class="button">
            <button v-for="(linkItem, index) in item.link" :key="index">
              <a :href="linkItem.url" target="__blank">{{ linkItem.label }}</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import credit from "../assets/credit.json";
export default {
  data() {
    return {
      groupe: credit,
    };
  },
  methods: {
    getImg(index) {
      return require(`@/assets/credit/${this.groupe.membre[index].nom
        .split(" ")[1]
        .toLowerCase()}.png`);
    },
    connect() {
      this.$router.push({ name: "Connect" });
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}
.retour {
  position: absolute;
  top: 20px;
  left: 40px;
  z-index: 999;
  transition: all ease 200ms;
  cursor: pointer;
}
.retour:hover {
  transform: scale(1.1);
}
h1 {
  margin: 20px;
}
.groupe {
  width: 50%;
}
.msgPetelot {
  width: 70%;
  margin: 10px;
}
h2 {
  margin: 30px;
}
.credit {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  align-items: center;
  justify-content: space-around;
}
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 20px;
  width: 20px;
}
a {
  text-decoration: none;
  color: white;
}
.card {
  padding: 20px;
  border: none;
  box-shadow: 0px 0px 10px rgba(126, 126, 126, 0.719);
  display: flex;
  height: 300px;
  width: 500px;
  border-radius: 20px;
  margin: 20px 30px;
}
.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 1;
}
button {
  background: var(--main);
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  color: white;
}
.button button {
  margin: 10px auto;
}
.button {
  display: flex;
  flex-direction: column;
}
</style>
