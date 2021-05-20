<template>
  <div class="containerGraph">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
export default {
  props: ["data", "option"],
  mounted: function() {
    let ctx = document.getElementById("canvas");
    new Chart(ctx, {
      type: "line",
      data: this.data,
      options: this.option,
    });
  },
};
</script>

<style scoped>
.containerGraph {
  flex: 1;
  height: 100%;
}
</style>
