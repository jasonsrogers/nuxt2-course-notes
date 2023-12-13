<template>
  <h1>
    The page for User by id: {{ $route.params.id }} (pages/users/_id/index.vue)
  </h1>
</template>
<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
};
</script>
