import Vue from 'vue';
import PortalVue from 'portal-vue';
import SvgIcon from 'vue-svgicon';
import App from './App.vue';
import router from './router';
import store from './store';
import './components/icons';
import './assets/css/tailwind.css';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import VueGtm from 'vue-gtm';

Vue.use(PortalVue);

Vue.use(SvgIcon, {
  tagName: 'icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});

Vue.config.productionTip = false;

// https://docs.sentry.io/platforms/javascript/vue/
Sentry.init({
  dsn: 'https://8cbe086668634a66874bc13cea49da71@o379282.ingest.sentry.io/5203892',
  integrations: [new Integrations.Vue({ Vue, attachProps: true, logErrors: true })],
});

// https://github.com/mib200/vue-gtm
/* eslint-disable */
Vue.use(VueGtm, {
  id: "GTM-KMRRBXD",
  // queryParams: { // Add url query string when load gtm.js with GTM ID (optional)
  //   gtm_auth:'AB7cDEf3GHIjkl-MnOP8qr',
  //   gtm_preview:'env-4',
  //   gtm_cookies_win:'x'
  // },
  // enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
});
/* eslint-enable */

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
