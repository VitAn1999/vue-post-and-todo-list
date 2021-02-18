<template>
  <div class="text-center posts-wrapper">
    <h2>{{ showCountPosts }}</h2>
    <div class="post" v-for="post in posts" :key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="$emit('remove-post', post.id)"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['posts'],
  computed: {
    showCountPosts() {
      return this.$store.getters.showCountPosts;
    },
  },
};
</script>

<style scoped>
.posts-wrapper {
  max-width: 800px;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.post {
  padding: 1rem;
  margin: 1rem;
  border: solid 1px black;
  border-radius: 2px;
  position: relative;
}
button {
  position: absolute;
  left: 93%;
  top: 10%;
}
</style>
