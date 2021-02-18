import Vue from 'vue';
import Vuex from 'vuex';
import todos from './todos';
import posts from './posts';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posts,
    todos,
  },
});
