import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timestamp: null,
    editorState: null,
    selections: [],
    // Keyed by selection ids
    orders: {},
    replies: {},
  },
  mutations: {
    setEditorState(state, editorState) {
      state.editorState = editorState;
    },
    setTimestamp(state, timestamp) {
      state.timestamp = timestamp;
    },
    setSelections(state, selections) {
      state.selections = selections;
    },
    updateOrders(state, selections) {
      const orders = {};

      selections.forEach((selection, index) => {
        orders[selection.id] = index + 1;
      });

      state.orders = orders;
    },
    addMissingOrders(state) {
      const orders = state.selections
        .map(sel => state.orders[sel.type.spec.selection.id])
        .filter(order => !!order);
      let maxOrder = orders.length ? Math.max(...orders) : 0;

      state.selections.forEach((sel) => {
        const id = sel.type.spec.selection.id;
        const order = state.orders[id];
        if (!order) {
          maxOrder++;
          state.orders[id] = maxOrder;
        }
      });
    },
    deleteSelections(state, ids) {
      ids.forEach((id) => {
        const index = state.selections.map(item => item.type.spec.selection.id).indexOf(id);
        Vue.delete(state.selections, index);
      });
    },
    setReply(state, reply) {
      Vue.set(state.replies, reply.id, reply.text);
    },
  },
  actions: {
  },
});
