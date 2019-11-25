import Vue from 'vue';
import Vuex from 'vuex';
import * as auth from './lib/auth';

Vue.use(Vuex);

const defaultState = {
  auth: {
    user: null,
  },
  timestamp: null,
  editorState: null,
  selections: [],
  // Keyed by selection ids
  orders: {},
  replies: {},
  repliesIntro: '',
  repliesOutro: '',
};

export default new Vuex.Store({
  state: Object.assign({}, defaultState),
  mutations: {
    setUser(state, user) {
      state.auth.user = user;
    },
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
    // eslint-disable-next-line no-unused-vars
    resetState(state) {
      // eslint-disable-next-line no-param-reassign
      state = Object.assign(state, defaultState);
    },
  },
  actions: {
    async getUser(context, force = false) {
      if (!force) {
        // Attempt to grab user from store
        const { user } = this.state.auth;

        if (user) {
          return user;
        }
      }

      // If no user in store attempt to fetch it
      const response = await auth.getUser();

      if (response.error) {
        context.commit('setUser', null);
        return null;
      }

      const user = response.user;
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
