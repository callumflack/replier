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
    deleteSelection(state, id) {
      const index = state.selections.map(item => item.type.spec.selection.id).indexOf(id);
      Vue.delete(state.selections, index);
    },
    setReply(state, reply) {
      Vue.set(state.replies, reply.id, reply.text);
    },
  },
  actions: {
  },
});
