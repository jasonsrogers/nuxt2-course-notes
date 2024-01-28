<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>

    <PostList :posts="loadedPosts" />
  </div>
</template>
<!-- 'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg' -->
<script>
import PostList from "@/components/Posts/PostList";

export default {
  components: {
    PostList,
  },

  // asyncData(context, callback) {
  //   setTimeout(() => {
  //     callback(null, {
  //       loadedPosts: [
  //         {
  //           id: "1",
  //           title: "First Post",
  //           previewText: "This is our first post!",
  //           thumbnail:
  //             "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
  //         },
  //         {
  //           id: "2",
  //           title: "Second Post",
  //           previewText: "This is our second post!",
  //           thumbnail:
  //             "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
  //         },
  //       ],
  //     });
  //   }, 1500);
  // },
  // data() {
  //   return {
  //     loadedPosts: [
  //       {
  //         id: "1",
  //         isAdmin: false,
  //         thumbnail:
  //           "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
  //         title: "Hello there!",
  //         previewText: "This is a preview of the post",
  //       },
  //       {
  //         id: "2",
  //         isAdmin: false,
  //         thumbnail:
  //           "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
  //         title: "Hello there 2!",
  //         previewText: "This is a preview of the post 2",
  //       },
  //       {
  //         id: "3",
  //         isAdmin: false,
  //         thumbnail:
  //           "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
  //         title: "Hello there! 3",
  //         previewText: "This is a preview of the post 3",
  //       },
  //     ],
  //   };
  // },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    },
  },
};
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url("~assets/images/main-page-background.jpg");
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
