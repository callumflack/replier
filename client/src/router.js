import Vue from 'vue';

// Auth routes
import Router from 'vue-router';
import Login from './views/Login.vue';

// App routes
import Register from './views/Register.vue';
import Home from './views/Home.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: 'auth',
      },
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        layout: 'auth',
      },
      component: Register,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/reply',
      name: 'reply',
      // route level code-splitting
      // this generates a separate chunk (reply.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "reply" */ './views/Reply.vue'),
    },
  ],
});
