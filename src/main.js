import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase/app';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDmiwZXzC0aWG0-mvjdtuJibxjfAvZWzvI',
      authDomain: 'vue-post-and-todo-list.firebaseapp.com',
      databaseURL: 'https://vue-post-and-todo-list-default-rtdb.firebaseio.com',
      projectId: 'vue-post-and-todo-list',
      storageBucket: 'vue-post-and-todo-list.appspot.com',
      messagingSenderId: '33121177931',
      appId: '1:33121177931:web:10cbdabddc1438cfa018ce',
      measurementId: 'G-CFBNCHCPXG',
    });
  },
  render: (h) => h(App),
}).$mount('#app');
