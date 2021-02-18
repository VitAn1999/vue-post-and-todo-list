<template>
  <li class="mb-5">
    <label :class="{ done: todo.completed }">
      <input
        type="checkbox"
        @change="changeCompleted"
        :checked="completed"
        class="form-check"
      />
      {{ index + 1 }}. {{ todo.title | uppercase }}
    </label>
    <button
      @click="$emit('remove-value', todo.id)"
      class="btn-close"
      aria-label="Close"
    ></button>
  </li>
</template>

<script>
export default {
  props: ['todo', 'index'],
  data() {
    return {
      completed: this.todo.completed,
    };
  },
  filters: {
    uppercase(value) {
      return value.toUpperCase();
    },
  },
  methods: {
    changeCompleted() {
      const todo = {
        title: this.todo.title,
        completed: this.todo.completed,
        id: this.todo.id,
      };
      this.$store.dispatch('changeCompleted', todo);
    },
  },
};
</script>

<style scoped>
li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
  padding: 0;
}
label {
  display: flex;
  flex-direction: row;
}
input {
  margin-right: 5px;
}
button {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.done {
  text-decoration: line-through;
}
</style>
