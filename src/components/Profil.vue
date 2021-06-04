<template>
  <div class="container">
    <Navbar type="2" />
    <h1>Modifie ton mot de passe</h1>
    <form v-on:submit.prevent="changeMDP">
      <div class="input">
        <label for="firstMDP">Nouveau mot de passe</label>
        <input
          class="inputMDP"
          id="firstMDP"
          :type="type"
          placeholder="nouveau mot de passe"
          v-model="mdpCreate"
        />
      </div>
      <div class="input">
        <label for="secondMDP"> Confirme ton nouveau mot de passe</label>
        <input
          class="inputMDP"
          :type="type"
          id="secondMDP"
          v-model="mdpVerify"
          placeholder="confirme ton nouveau mot de passe"
          :class="{
            greenBackground: mdpCreate == mdpVerify && mdpVerify != '',
            redBackground: mdpCreate != mdpVerify && mdpVerify != '',
          }"
        />
      </div>
      <p class="error" v-if="error">Les mots de passe ne sont pas les mêmes</p>
      <p class="confirm" v-if="confirm">Les mot de passe à bien été modifié</p>
      <p class="error" v-if="errorOccured">
        Une erreur est surnenue, veuillez recommencer ultérieurement
      </p>
      <div class="chack">
        <input type="checkbox" id="checkbox" @change="showMdp = !showMdp" />
        <label for="checkbox">Afficher les mots de passes </label>
      </div>

      <button type="submit">Valider</button>
    </form>
  </div>
</template>

<script>
  import Navbar from "./Navbar";
  import axios from "axios";
  //import axios from "axios";
  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        mdpCreate: "",
        mdpVerify: "",
        error: false,
        confirm: false,
        errorOccured: false,
        showMdp: false,
      };
    },
    computed: {
      type() {
        if (this.showMdp) {
          return "txt";
        } else {
          return "password";
        }
      },
    },
    methods: {
      changeMDP() {
        if (this.mdpCreate == this.mdpVerify) {
          this.error = false;
          axios({
            method: "post",
            url: "http://api.diesy.fr/api/changePassword",
            data: {
              new_password: this.mdpCreate,
            },
            headers: { Authorization: `Bearer ${this.$store.state.token}` },
          })
            .then(() => {
              this.confirm = true;
              this.errorOccured = false;
            })
            .catch(() => (this.errorOccured = true));
        } else {
          this.error = true;
        }
      },
    },
  };
</script>

<style scoped>
  .container,
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .input {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    font-size: 20px;
    line-height: 50px;
  }
  .inputMDP {
    width: 400px;
    height: 25px;
    box-shadow: 0px 0px 10px rgba(126, 126, 126, 0.719);
    border: none;
    padding: 10px;
    border-radius: 10px;
    outline: none;
  }
  button {
    padding: 10px 15px;
    background: var(--main);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
  }
  .greenBackground {
    border: 2px solid var(--green);
  }
  .redBackground {
    border: 2px solid var(--red);
  }
  .error {
    color: var(--red);
  }
  .confirm {
    color: var(--green);
  }
  .chack {
    display: flex;
    align-items: center;
  }
  #checkbox {
    margin: 0 10px;
  }
</style>
