<template>
  <div class="container">
    <Navbar type="2" />
    <div class="select">
      <p>Choisis ton année</p>
      <router-link class="router" :to="{ name: 'year1', params: { year: 1 } }"
        ><div class="year">
          <div class="content one">
            <p class="Ynumber">1ère année</p>
            <div class="barbox">
              <div class="bar oneb"></div>
              <div class="barFill " id="onef"></div>
            </div>
            <p class="number">{{ progression[0] }} %</p>
          </div>
        </div></router-link
      >
      <router-link
        class="router"
        :to="{ name: 'yearundefined', params: { year: 2 } }"
        ><div class="year">
          <div class="content two">
            <p class="Ynumber">2ème année</p>
            <div class="barbox">
              <div class="bar twob"></div>
              <div class="barFill " id="twof"></div>
            </div>
            <p class="number">{{ progression[1] }} %</p>
          </div>
        </div></router-link
      >
      <router-link
        class="router"
        :to="{ name: 'yearundefined', params: { year: 3 } }"
        ><div class="year">
          <div class="content three">
            <p class="Ynumber">3ème année</p>
            <div class="barbox">
              <div class="bar threeb"></div>
              <div class="barFill " id="threef"></div>
            </div>
            <p class="number">{{ progression[2] }} %</p>
          </div>
        </div></router-link
      >
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      bar: ["onef", "twof", "threef"],
      progression: [100, 97, 5],
    };
  },
  mounted: function() {
    for (let i = 0; i < this.bar.length; i++) {
      document.getElementById(this.bar[i]).style.width =
        this.progression[i] + "%";
    }
  },
};
</script>

<style scoped>
.select {
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
}
.select p {
  font-size: 3.1em;
  color: var(--main);
  margin-bottom: 30px;
}
.year {
  display: flex;
  align-items: center;
  width: 800px;
  margin: 20px;
  height: 100px;
  border: 3px solid var(--main);
  box-shadow: 6px 7px 5px rgba(6, 68, 107, 0.42);
  border-radius: 30px;
  transition: all ease 200ms;
}
.year:hover {
  transform: scale(1.02);
}
.router {
  color: var(--main);
  text-decoration: none;
}
.router:hover {
  text-decoration: none;
}
.bar {
  width: 350px;
  height: 10px;
  border: 2px solid black;
  z-index: 2;
  margin-top: 10px;
  border-radius: 20px;
}
.barFill {
  z-index: 1;
  position: relative;
  bottom: 12px;
  height: 10px;
  border-radius: 20px;
  background: red;
}
.one p {
  color: var(--purple);
}
.two p {
  color: var(--orange);
}
.three p {
  color: var(--blue);
}
.number {
  font-family: roboto;
  font-size: 1.5em !important;
  font-weight: bold;
}
.Ynumber,
.number {
  margin: 0 !important;
}
.oneb {
  border: 2px solid var(--purple);
}
.twob {
  border: 2px solid var(--orange);
}
.threeb {
  border: 2px solid var(--blue);
}
#onef {
  background: var(--purple);
  transition: all ease 200ms;
}
#twof {
  background: var(--orange);
  transition: all ease 200ms;
}
#threef {
  background: var(--blue);
  transition: all ease 200ms;
}
</style>
