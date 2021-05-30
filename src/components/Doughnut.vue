<template>
  <div class="containerGraph">
    <canvas id="canvasRythme"></canvas>
  </div>
</template>

<script>
  import Chart from "chart.js";
  export default {
    props: ["echecProps", "labelRythme", "reussiteProps"],
    data() {
      return {
        graph: undefined,
      };
    },
    watch: {
      /* eslint-disable */
      echecProps: function(val) {
        this.graph.data.datasets[0].data = [];
        this.graph.data.datasets[0].data = [this.reussiteProps, val];
        this.graph.update();
      },
      reussiteProps: function(val) {
        his.graph.data.datasets[0].data = [];
        this.graph.data.datasets[0].data = [val, vthis.echecProps];
        this.graph.update();
      },
      /* eslint-disable */
    },
    mounted: function() {
      let ctx = document.getElementById("canvasRythme");
      this.graph = new Chart(ctx, {
        type: "pie",
        data: {
          labels: this.labelRythme,
          datasets: [
            {
              data: [this.reussiteProps, this.echecProps],
              backgroundColor: ["#1abb77", "#fbae1b"],
              hoverOffset: 4,
              borderColor: "transparent",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "white", //set your desired color
              },
            },
          },
          interaction: {
            mode: "index",
            intersect: false,
          },
        },
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
