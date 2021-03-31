<template>
  <div class="container">
    <Navbar type="2" />
    <div class="select">
      <div class="contentBox">
        <p>Choisis ton année</p>
        <router-link class="router" :to="{ name: 'year', params: { year: 1 } }"
          ><div class="year">
            <div class="content one">
              <p class="Ynumber">1ère année</p>
              <div class="barbox">
                <div class="bar oneb"></div>
                <div class="barFill " id="onef"></div>
              </div>
              <p class="number">{{ yearProgression[0] }} %</p>
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
              <p class="number">{{ yearProgression[1] }} %</p>
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
              <p class="number">{{ yearProgression[2] }} %</p>
            </div>
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import { mapState } from "vuex";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      bar: ["onef", "twof", "threef"],
    };
  },
  computed: {
    ...mapState(["yearProgression"]),
  },

  mounted: function() {
    for (let i = 0; i < this.bar.length; i++) {
      let item = document.getElementById(this.bar[i]);
      item.style.width = this.yearProgression[i] + "%";
    }
  },
};
</script>

<style scoped>
@media all and (max-height: 995px) {
  .contentBox {
    height: 100% !important;
  }
}
@media all and (max-width: 1024px) {
  .year {
    width: 78% !important;
  }
  .barbox {
    width: 40% !important;
  }
  .bar {
    width: 100% !important;
  }
  .Ynumber {
    font-size: 40px !important;
  }
}
@media all and (max-width: 618px) {
  .content {
    flex-direction: column !important;
  }
  .barbox {
    width: 80% !important;
  }
}
.container {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.select {
  width: 100%;

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.contentBox {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 80%;
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
  margin: auto;
  width: 800px;
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
  width: 100%;
  display: flex;
}
.router:hover {
  text-decoration: none;
}
.barbox {
  width: 350px;
  height: 10px;
  margin-top: 10px;
  border-radius: 20px;
  position: relative;
}
.bar,
.barFill {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
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
  border: 2px solid var(--purple);
  transition: all ease 200ms;
}
#twof {
  background: var(--orange);
  border: 2px solid var(--orange);
  transition: all ease 200ms;
}
#threef {
  background: var(--blue);
  border: 2px solid var(--blue);
  transition: all ease 200ms;
}
</style>
