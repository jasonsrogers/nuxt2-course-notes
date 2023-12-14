<template>
  <h2>
    The page for User by id: {{ $route.params.id }} (pages/users/_id/index.vue)
  </h2>
</template>
<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
};
</script>
