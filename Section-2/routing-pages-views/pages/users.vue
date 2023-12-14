<template>
  <section>
    <h1>The Users Page (/pages/users.vue)</h1>
    <input type="text" v-model="userId" />
    <button @click="goToUser">Go to User</button>
    <nuxt-child />
  </section>
</template>
<script>
export default {
  data() {
    return {
      userId: "",
    };
  },
  methods: {
    goToUser() {
      this.$router.push("/users/" + this.userId);
    },
  },
  layout: "users",
};
</script>
