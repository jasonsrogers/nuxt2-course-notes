<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
import axios from "axios";

export default {
  layout: "admin",
  components: {
    AdminPostForm,
  },
  methods: {
    onSubmitted(post) {
      axios
        .post(
          "https://nuxt-blog-1371e-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
          post
        )
        .then((result) => {
          console.log("Post created", result);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
