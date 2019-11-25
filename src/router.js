import Vue from 'vue';
import Router from 'vue-router';
// Auth routes
import Login from './views/Login.vue';
// App routes
import Register from './views/Register.vue';
import Home from './views/Home.vue';
import Pay from './views/Pay.vue';

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
      path: '/pay',
      name: 'pay',
      component: Pay,
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
      meta: { transitionName: 'slide' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
});
