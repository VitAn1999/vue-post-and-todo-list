<template>
  <div class="about mt-5">
    <h2 class="text-center ">This is an your todo list</h2>
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
    <div v-if="loading" class="text-center">
      <loader></loader>
    </div>
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
      loading: true,
      filter: 'all',
    };
  },
  methods: {
    removeTodo(id) {
      this.$store.dispatch('removeTodo', id);
    },
    addTodo(todo) {
      this.$store.dispatch('createTodo', todo);
    },
  },
  mounted() {
    this.$store.dispatch('fetchTodo').finally(() => {
      this.loading = false;
    });
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'all') {
        return this.$store.getters.loadAllTodos;
      } else if (this.filter === 'completed') {
        return this.$store.getters.loadCompletedTodo;
      } else {
        return this.$store.getters.loadNotCompletedTodo;
      }
    },
  },
};
</script>

<style scoped>
select {
  width: 60%;
  margin: 0 auto;
}
</style>
