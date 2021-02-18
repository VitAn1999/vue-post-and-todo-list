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
    loadCompletedTodo(state) {
      return state.todos.filter((t) => t.completed);
    },
    loadNotCompletedTodo(state) {
      return state.todos.filter((t) => !t.completed);
    },
  },
  mutations: {
    createTodo(state, payload) {
      state.todos.push(payload);
    },
    changeCompleted(state, payload) {
      const newState = [];
      state.todos.forEach((t) => {
        if (t.id === payload.id) {
          newState.push(payload);
        } else {
          newState.push(t);
        }
      });
      state.todos = newState;
    },
    loadTodos(state, payload) {
      state.todos = payload;
    },
    removeTodo(state, payload) {
      state.todos = state.todos.filter((t) => t.id !== payload);
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
    async changeCompleted(context, payload) {
      await fb
        .database()
        .ref('todos')
        .child(payload.id)
        .update({
          completed: !payload.completed,
        });
      const editTodo = new Todo(payload.title, !payload.completed, payload.id);
      context.commit('changeCompleted', editTodo);
    },
    async removeTodo(context, payload) {
      await fb
        .database()
        .ref('todos')
        .child(payload)
        .remove();
      context.commit('removeTodo', payload);
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
