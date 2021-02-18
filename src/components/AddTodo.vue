<template>
  <form @submit.prevent="onSubmit">
    <input
      type="text"
      v-model="value"
      class="form-control"
      placeholder="Add todo..."
    />
    <button type="submit" :disabled="!value" class="btn btn-success ml-5">
      Add todo
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    onSubmit() {
      if (this.value.trim()) {
        const newTodo = {
          title: this.value,
          completed: false,
        };
        this.$emit('add-todo', newTodo);
        this.value = '';
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  justify-content: space-between;
}
input {
  width: 80%;
}
button {
  width: 15%;
}
</style>
