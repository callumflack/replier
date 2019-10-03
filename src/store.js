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
    repliesIntro: '',
    repliesOutro: '',
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
    setRepliesIntro(state, text) {
      state.repliesIntro = text;
    },
    setRepliesOutro(state, text) {
      state.repliesOutro = text;
    },
  },
  actions: {
  },
  getters: {
    groupedSelections(state) {
      const groupedSelections = [];

      state.selections.forEach((deco) => {
        const selection = deco.type.spec.selection;
        let index = -1;

        if (selection.groupId) {
          index = groupedSelections.findIndex(
            sel => sel.groupId === selection.groupId,
          );
        }

        // Create new object to avoid mutation
        if (index !== -1) {
          const groupedSelection = groupedSelections[index];
          groupedSelections[index] = {
            ...groupedSelection,
            text: groupedSelection.text += ` ${selection.text}`,
          };
        } else {
          groupedSelections.push({ ...selection });
        }
      });

      groupedSelections.sort((a, b) => {
        const orderA = state.orders[a.id];
        const orderB = state.orders[b.id];
        return orderA - orderB;
      });

      return groupedSelections;
    },
  },
});
