<template>
  <div class="post-list">
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
      title="Hello there!"
      previewText="This is a preview of the post"
    />
    <PostPreview
      id="2"
      :is-admin="isAdmin"
      thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
      title="Hello there 2!"
      previewText="This is a preview of the post 2"
    />
    <PostPreview
      id="3"
      :is-admin="isAdmin"
      thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
      title="Hello there 3!"
      previewText="This is a preview of the post 3"
    />
  </div>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";
export default {
  components: {
    PostPreview,
  },
  props: {
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
