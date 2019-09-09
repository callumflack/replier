import Vue from 'vue';
import VuePageTransition from 'vue-page-transition';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/tailwind.css';

Vue.config.productionTip = false;

Vue.use(VuePageTransition);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
