<template>
  <div class="home mt-5">
    <h2 class="text-center ">These are posts of your diary</h2>
    <hr />
    <add-post @add-post="addPost"></add-post>
    <hr />
    <div v-if="loading" class="text-center">
      <loader></loader>
    </div>
    <post-list
      v-else-if="showCountPosts"
      :posts="loadAllPosts"
      @remove-post="removePost"
    ></post-list>
    <h3 v-else class="text-center">You do not have any post</h3>
  </div>
</template>

<script>
import AddPost from '../components/AddPost.vue';
import Loader from '../components/Loader.vue';
import PostList from '../components/PostList.vue';
export default {
  name: 'Posts',
  data() {
    return {
      loading: true,
    };
  },
  components: { PostList, AddPost, Loader },
  mounted() {
    this.$store.dispatch('fetchPosts').finally(() => {
      this.loading = false;
    });
  },
  methods: {
    addPost(post) {
      this.$store.dispatch('createPost', post);
    },
    removePost(id) {
      this.$store.dispatch('removePost', id);
    },
  },
  computed: {
    showCountPosts() {
      return this.$store.getters.showCountPosts;
    },
    loadAllPosts() {
      return this.$store.getters.loadAllPosts;
    },
  },
};
</script>
