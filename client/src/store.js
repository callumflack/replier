import Vue from 'vue';
import Vuex from 'vuex';
import * as auth from './utils/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selections: [],
    auth: {
      user: undefined,
    },
  },
  mutations: {
    setSelections(state, selections) {
      state.selections = selections;
    },
    setUser(state, user) {
      state.auth.user = user;
    },
  },
  actions: {
    async getUser(context) {
      let { user } = this.state.auth;

      if (user) {
        return user;
      }

      // If no user in store attempt to fetch it
      const response = await auth.getUser();

      if (response.error) {
        context.commit('setUser', null);
        return null;
      }

      user = response.user;
      context.commit('setUser', user);

      return user;
    },
    async loginUser(context, credentials) {
      const response = await auth.login(credentials);
      const user = (response && response.user) || null;

      context.commit('setUser', user);
      return response;
    },
    async registerUser(context, credentials) {
      const response = await auth.register(credentials);
      const user = (response && response.user) || null;

      context.commit('setUser', user);
      return response;
    },
    async logoutUser(context) {
      // Destroy session + cookies
      await auth.logout();

      // Nullify in store
      return context.commit('setUser', null);
    },
  },
});
