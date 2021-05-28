<template>
  <div class="containerGraph">
    <canvas id="canvas" ref="ref"></canvas>
  </div>
</template>

<script>
  import Chart from "chart.js";
  export default {
    props: ["dataNote", "labelNote"],
    data() {
      return {
        graph: undefined,
      };
    },
    watch: {
      /* eslint-disable */
      dataNote: function(val) {
        this.graph.data.datasets[0].data = [];
        this.graph.data.datasets[0].data = val;
        this.graph.update();
      },
      /* eslint-disable */
      labelNote: function(val) {
        this.graph.data.labels = [];
        this.graph.data.labels = val;
        this.graph.update();
      },
    },
    mounted: function() {
      let ctx = document.getElementById("canvas");
      this.graph = new Chart(this.$refs.ref, {
        type: "line",
        data: {
          labels: this.labelNote,
          datasets: [
            {
              label: "Note en %",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "#ff6384",
              borderColor: "#ff6384",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "#ff6384",
              pointBackgroundColor: "#ff6384",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#ff6384",
              pointHoverBorderColor: "#ff6384",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.dataNote,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxis: {
              ticks: {
                backdropColor: "rgba(255, 255, 255, 1)",
                color: "rgba(255, 255, 255, 0.5)",
                padding: 0,
                beginAtZero: true,
              },
              grid: {
                color: "rgba(255,255,255,0.2)",
                display: false,
              },
              max: 100,
            },
            xAxis: {
              ticks: {
                backdropColor: "rgba(255, 255, 255, 1)",
                color: "rgba(255, 255, 255, 0.5)",
              },
              grid: {
                color: "rgba(255,255,255,0.2)",
                display: false,
              },
            },
          },
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
