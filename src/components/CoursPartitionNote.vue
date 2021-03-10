<template>
  <div class="all">
    <Navbar class="navbar" type="3" :year="year" />
    <div class="cours">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
export default {
  components: {
    Navbar,
  },
  props: ["year"],
  mounted: function() {
    this.$router.push({ name: "Note1" });
  },
};
</script>

<style scoped>
.all {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}
.cours {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
</style>
