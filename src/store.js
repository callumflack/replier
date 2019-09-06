import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    editorState: null,
    selections: [],
  },
  mutations: {
    setEditorState(state, editorState) {
      state.editorState = editorState;
    },
    setSelections(state, selections) {
      state.selections = selections;
    },
  },
  actions: {

  },
});
