import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    editorState: null,
    selections: [],
    // Keyed by selection ids
    replies: {},
  },
  mutations: {
    setEditorState(state, editorState) {
      state.editorState = editorState;
    },
    setSelections(state, selections) {
      state.selections = selections;
    },
    setReply(state, reply) {
      Vue.set(state.replies, reply.id, reply.text);
    },
  },
  actions: {
  },
});
