import Vue from 'vue';
import PortalVue from 'portal-vue';
import SvgIcon from 'vue-svgicon';
import App from './App.vue';
import router from './router';
import store from './store';
import './components/icons';
import './assets/css/tailwind.css';

Vue.config.productionTip = false;

Vue.use(PortalVue);

Vue.use(SvgIcon, {
  tagName: 'icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
