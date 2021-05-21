<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
:root {
  --main: #06446b;
  --placeholder: #06446b80;
  --red: #ea1b3a;
  --purple: #bb1a8b;
  --orange: #fbae1b;
  --blue: #05ace9;
  --green: #1abb77;
  --darkPurple: #35175a;
}
.darkPurple {
  color: var(--darkPurple);
}
.blue {
  color: var(--blue);
}
.orange {
  color: var(--orange);
}
.purple {
  color: var(--purple);
}
.red {
  color: var(--red);
}
.main {
  color: var(--main);
}
.green {
  color: var(--green);
}

* {
  font-family: "Crete Round", serif;
  margin: 0;
  padding: 0;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: white;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--main);
}

#app {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
button,
.button,
.buttons,
.link {
  user-select: none;
}
</style>
