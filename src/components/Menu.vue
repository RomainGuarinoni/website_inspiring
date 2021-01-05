<template>
  <div class="container">
    <Navbar type="3" :year="year" />
  </div>
</template>

<script>
import Navbar from "./Navbar";
export default {
  props: ["year"],
  components: {
    Navbar,
  },
};
</script>

<style></style>
