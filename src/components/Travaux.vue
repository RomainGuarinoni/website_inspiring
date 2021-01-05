<template>
  <div class="container">
    <Navbar type="2" />
    <p>Cette page est en travaux...</p>
    <img src="../assets/travaux.png" alt="dsdsd" />
  </div>
</template>

<script>
import Navbar from "./Navbar";
export default {
  components: {
    Navbar,
  },
};
</script>

<style scoped>
p {
  font-size: 50px;
  margin: 0;
}
.container {
  text-align: center;
}
img {
  width: 50%;
}
</style>
