<template>
  <div class="containerUser" @click="select()">
    <p>{{ name + lastname }}</p>
  </div>
</template>

<script>
export default {
  props: {
    userID: Number,
    name: String,
    lastname: String,
  },
};
</script>

<style scoped>
.containerUser {
  width: 70%;
  padding: 30px;
  border-radius: 20px;
  margin: 10px 0;
  border: none;
  text-align: center;
  box-shadow: 0px 0px 10px rgb(148, 148, 148);
  cursor: pointer;
  transition: all ease 400ms;
}
.containerUser:hover {
  transform: translateX(10px);
}
</style>
