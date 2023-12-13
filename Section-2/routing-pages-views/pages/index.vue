<template>
  <div>
    <section>
      <a href="/users">Users</a>
      <a href="/users/1">User 1</a>
      <a href="/users/anything">User anything</a>
    </section>
    <section>
      <nuxt-link to="/users">Nuxt Users</nuxt-link>
      <nuxt-link to="/users/1">Nuxt User 1</nuxt-link>
      <nuxt-link to="/users/anything">NuxtUser anything</nuxt-link>
    </section>
    <section>
      <button @click="goToProducts">Go to Products</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "IndexPage",

  methods: {
    goToProducts() {
      this.$router.push("/products");
    },
  },
};
</script>
