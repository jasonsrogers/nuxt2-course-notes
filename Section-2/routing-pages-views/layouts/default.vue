<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>
<script>
import Header from "~/components/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>
<style>
h1 {
  color: red;
}
h2 {
  color: blue;
}
/* moved to assets/styles/global.css */
/* html,
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
} */
</style>
