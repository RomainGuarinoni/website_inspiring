<template>
  <div class="containerGraph">
    <canvas id="canvasRythme"></canvas>
  </div>
</template>

<script>
  import Chart from "chart.js";
  export default {
<<<<<<< HEAD
    props: ["echecProps", "labelRythme", "reussiteProps"],
=======
    props: ["dataRythme", "labelRythme"],
>>>>>>> cd329cee26587b58dba31b2b388960b9d1f550d3
    data() {
      return {
        graph: undefined,
      };
    },
    watch: {
<<<<<<< HEAD
      /* eslint-disable */
      echecProps: function(val) {
        console.log("hello");
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
      console.log(this.reussiteProps);
      console.log(this.echecProps);
=======
      dataRythme: function(val) {
        console.log("new entry");
        this.graph.data.datasets[0].data = [];
        this.graph.data.datasets[0].data = val;
        this.graph.update();
      },
    },
    mounted: function() {
      console.log(this.labelRythme);
      console.log(typeof this.dataRythme);
>>>>>>> cd329cee26587b58dba31b2b388960b9d1f550d3
      let ctx = document.getElementById("canvasRythme");
      this.graph = new Chart(ctx, {
        type: "pie",
        data: {
          labels: this.labelRythme,
          datasets: [
            {
<<<<<<< HEAD
              data: [this.reussiteProps, this.echecProps],
=======
              data: this.dataRythme,
>>>>>>> cd329cee26587b58dba31b2b388960b9d1f550d3
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
