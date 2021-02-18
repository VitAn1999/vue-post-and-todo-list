import Vue from 'vue';
import VueRouter from 'vue-router';
import Posts from '../views/Posts.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/todos',
    name: 'Todos',
    component: () => import('../views/Todos.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
