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
}

* {
  font-family: "Redressed", cursive;
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  width: 1px;
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
</style>
