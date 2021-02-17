import fb from 'firebase';
class Todo {
  constructor(title, completed, id = null) {
    this.title = title;
    this.completed = completed;
    this.id = id;
  }
}
export default {
  state: {
    todos: [],
  },
  getters: {
    loadAllTodos(state) {
      return state.todos;
    },
  },
  mutations: {
    createTodo(state, payload) {
      state.todos.push(payload);
    },
    loadTodos(state, payload) {
      state.todos = payload;
    },
  },
  actions: {
    async createTodo(context, payload) {
      const newTodo = new Todo(payload.title, payload.completed);
      const todo = await fb
        .database()
        .ref('todos')
        .push(newTodo);
      context.commit('createTodo', {
        ...newTodo,
        id: todo.key,
      });
    },
    async fetchTodo(context) {
      const fbTodo = await fb
        .database()
        .ref('todos')
        .once('value');
      const todos = fbTodo.val();
      const todosList = [];
      Object.keys(todos).forEach((key) => {
        const todo = todos[key];
        todosList.push(new Todo(todo.title, todo.completed, key));
      });
      context.commit('loadTodos', todosList);
    },
  },
};
