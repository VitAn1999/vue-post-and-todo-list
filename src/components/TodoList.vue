<template>
  <div>
    <hr />
    <ul>
      <todo-item
        v-for="(todo, i) in todos"
        :key="todo.id"
        :todo="todo"
        :index="i"
        @remove-value="removeValue"
      ></todo-item>
    </ul>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue';

export default {
  props: ['todos'],
  components: {
    TodoItem,
  },
  methods: {
    removeValue(id) {
      this.$emit('remove-todo', id);
    },
  },
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}
</style>
