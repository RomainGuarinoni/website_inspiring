<template>
  <div class="container">
    <Navbar type="2" class="navbar" />
    <div class="box">
      <div class="selectUser">
        <h2>Sélectionner un élève</h2>
        <UserSelect
          v-for="user in userArray"
          :key="user.id"
          :userID="user.id"
          :name="user.name"
          :lastname="user.lastname"
        />
      </div>
      <div class="graph"></div>
    </div>
  </div>
</template>

<script>
import UserSelect from "./UserSelect";
import axios from "axios";
import Navbar from "./Navbar";
export default {
  components: {
    Navbar,
    UserSelect,
  },
  data() {
    return {
      userArray: new Array(),
    };
  },
  mounted: function() {
    axios({
      method: "get",
      url: "http://api.engineeringhpb.fr/api/users",
      headers: { Authorization: `Bearer ${this.$store.state.token}` },
    })
      .then((res) => {
        console.log(res.data);
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
  overflow-y: scroll;
}
.selectUser h2 {
  position: sticky;
  position: -webkit-sticky;
  background: white;
  width: 100%;
  text-align: center;
  top: 0;
}
.graph {
  flex: 1;
  height: 100%;
}
</style>
