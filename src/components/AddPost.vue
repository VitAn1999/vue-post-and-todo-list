<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="title" class="form-label">Title post</label>
      <input type="text" class="form-control" id="title" v-model="title" />
    </div>
    <div class="mb-3">
      <label for="body" class="form-label">Body post</label>
      <textarea
        class="form-control"
        id="body"
        rows="4"
        v-model="body"
      ></textarea>
    </div>
    <div class="mb-3 btn-wrapper">
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!this.title || !this.body"
      >
        PUBLIC POST
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      body: '',
    };
  },
  methods: {
    onSubmit() {
      if (this.title.trim() && this.body.trim()) {
        const newPost = {
          title: this.title,
          body: this.body,
        };
        this.$emit('add-post', newPost);
        this.title = '';
        this.body = '';
      }
    },
  },
};
</script>

<style scoped>
.btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
