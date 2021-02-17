<template>
  <div class="about">
    <h2 class="text-center">This is an todo list</h2>
    <hr />
    <add-todo @add-todo="addTodo"></add-todo>
    <select
      class="form-select mt-5 mb-5"
      v-model="filter"
      aria-label="Default select example"
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="not-completed">Not Complited</option>
    </select>
    <loader v-if="loading"></loader>
    <todo-list
      v-else-if="this.filteredTodos.length !== 0"
      :todos="filteredTodos"
      @remove-todo="removeTodo"
    ></todo-list>
    <h3 v-else>You do not have active TODO</h3>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue';
import AddTodo from '@/components/AddTodo.vue';
import Loader from '@/components/Loader.vue';

export default {
  components: {
    TodoList,
    Loader,
    AddTodo,
  },
  data() {
    return {
      todos: [],
      loading: true,
      filter: 'all',
    };
  },
  methods: {
    removeTodo(id) {
      this.todos = this.todos.filter((t) => t.id !== id);
    },
    addTodo(newTodo) {
      this.todos.push(newTodo);
    },
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'all') {
        return this.todos;
      } else if (this.filter === 'completed') {
        return this.todos.filter((t) => t.completed);
      } else {
        return this.todos.filter((t) => !t.completed);
      }
    },
  },
  created() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((response) => response.json())
      .then((json) => {
        this.todos = json;
        this.loading = false;
      });
  },
};
</script>

<style scoped>
select {
  width: 60%;
  margin: 0 auto;
}
</style>
