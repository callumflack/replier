import Vue from 'vue';
import Router from 'vue-router';
// Auth routes
import Login from './views/Login.vue';
import Register from './views/Register.vue';
// Account management routes
import Pay from './views/Pay.vue';
import Settings from './views/Settings/Index.vue';
import UpdateCard from './views/Settings/UpdateCard.vue';

// App routes
import Home from './views/Home.vue';
import Reply from './views/Reply.vue';

import store from './store.js';

Vue.use(Router);

const LAYOUTS = {
  // Values must match the name of layout components registered in App.vue
  AUTH: 'auth',
  DEFAULT: 'default',
};

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: LAYOUTS.AUTH,
      },
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        layout: LAYOUTS.AUTH,
      },
      component: Register,
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/settings/update-card',
      name: 'update-card',
      component: UpdateCard,
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
      component: Reply,
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

router.beforeEach(async (to, from, next) => {
  if (to.meta.layout === LAYOUTS.AUTH) {
    //
    // AUTH LAYOUT
    //

    // Redirect to index page if user is already authed
    const user = await store.dispatch('getUser');

    if (user) {
      return next('/');
    }
  } else {
    //
    // DEFAULT LAYOUT
    //

    // Redirect to login page if user isn't authed
    const user = await store.dispatch('getUser');

    // Unauthorized
    if (!user) {
      return next('/login');
    }

    // New customer
    if (!user.stripeCustomerId || !user.stripeSubscriptionId) {
      if (to.path !== '/pay') return next('/pay');
    }
  }

  return next();
});
export default router;
