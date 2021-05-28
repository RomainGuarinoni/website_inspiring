<template>
  <div class="containerGraph">
    <canvas id="canvasNuance"></canvas>
  </div>
</template>

<script>
  import Chart from "chart.js";
  export default {
    props: ["dataNuance", "labelNuance"],
    data() {
      return {
        graph: undefined,
      };
    },
    mounted: function() {
      let ctx = document.getElementById("canvasNuance");
      this.graph = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.labelNuance,
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
              data: this.dataNuance,
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
