<template>
  <div>
    <Header />
    <header>User Layout 1</header>
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
  color: green;
}
header {
  color: pink;
}
</style>
