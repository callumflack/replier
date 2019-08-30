import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selections: [],
  },
  mutations: {
    setSelections(state, selections) {
      state.selections = selections;
    },
  },
  actions: {

  },
});
