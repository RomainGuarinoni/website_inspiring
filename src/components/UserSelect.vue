<template>
  <div class="containerUser" @click="select">
    <div class="delete" v-if="user.type == 2" @click="deleteUser">
      <font-awesome-icon :icon="['fas', 'trash']" />
    </div>
    <p>{{ name }} {{ lastname }}</p>
  </div>
</template>

<script>
  import axios from "axios";
  import { mapState } from "vuex";
  export default {
    props: {
      userID: Number,
      name: String,
      lastname: String,
    },
    computed: {
      ...mapState(["user"]),
    },
    methods: {
      select() {
        this.$emit("userHasBeenSelected", { userID: this.userID });
      },
      deleteUser() {
        console.log("delete");
        this.$emit("deleteUser", {
          userID: this.userID,
          name: this.name + " " + this.lastname,
        });
      },
    },
  };
</script>

<style scoped>
  .delete {
    position: absolute;
    top: 10px;
    font-size: 18px;
    right: 10px;
    color: var(--red);
    z-index: 100000;
  }
  .containerUser {
    width: 70%;
    padding: 30px;
    border-radius: 20px;
    margin: 10px 0;
    border: none;
    text-align: center;
    box-shadow: 0px 0px 10px rgb(192, 192, 192);
    cursor: pointer;
    transition: all ease 400ms;
    position: relative;
  }
  .containerUser:hover {
    transform: translateX(10px);
  }
</style>
