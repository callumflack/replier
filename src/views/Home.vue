<template>
  <div class="container Block-sm max-w-5xl">
    <div class="editor" ref="editor" />

    <div class="flex mt-4 flex-start justify-between">
      <p
        :class="{ 'timestamp--transparent': !timestamp }"
        class="timestamp"
      >{{ timestamp }}</p>
      <button
        class="Button Button--continue"
        @click="handleContinueClick"
        :disabled="!$store.state.selections.length"
      >Next</button>
    </div>
  </div>
</template>

<script>
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import { exampleSetup } from 'prosemirror-example-setup';

import { selectionPlugin, selectionUI } from '../lib/selection';


function formatDate(date) {
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December',
  ];

  const padDigit = s => s.toString().padStart(2, '0');

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hour = padDigit(date.getHours());
  const minutes = padDigit(date.getMinutes());

  return `${hour}:${minutes}, ${day} ${monthNames[monthIndex]} ${year}`;
}


export default {
  name: 'home',
  data() {
    return {
      editor: null,
      timestamp: null,
    };
  },
  methods: {
    handleContinueClick(event) {
      event.preventDefault();
      // Get selected sentences
      const editorState = this.editor.state.edit;
      const pluginState = selectionPlugin.getState(editorState);
      const activeDecos = pluginState.decos
        .find(null, null, spec => spec.selection.active)
        .map(deco => deco.type.spec.selection.text);

      this.$store.commit('setSelections', activeDecos);
      this.$router.push({ path: 'reply' });
    },
  },
  mounted() {
    // Used to mount editor to the DOM
    const editorRef = this.$refs.editor;
    const that = this;

    // Empty document data for initializing editor
    const initData = {
      doc: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [],
          },
        ],
      },
      selections: [],
    };


    class State {
      constructor(edit) {
        this.edit = edit;
      }
    }

    class EditorConnection {
      constructor() {
        this.state = new State(null);
        this.view = null;
        this.dispatch = this.dispatch.bind(this);
        this.start();
      }

      // All state changes go through this
      dispatch(action) {
        let newEditState = null;

        if (action.type === 'loaded') {
          const editState = EditorState.create({
            doc: action.doc,
            plugins: exampleSetup({ schema, menuBar: false }).concat([
              selectionPlugin,
              selectionUI(transaction => this.dispatch({ type: 'transaction', transaction })),
            ]),
            selections: action.selections,
          });
          this.state = new State(editState);
        } else if (action.type === 'transaction') {
          if (!that.timestamp) {
            that.timestamp = formatDate(new Date());
          }

          newEditState = this.state.edit.apply(action.transaction);

          if (newEditState.doc.content.size > 40000) {
            // Document too big
          }

          this.state = new State(newEditState);
        }

        // Sync the editor with this.state.edit
        if (this.state.edit) {
          if (this.view) this.view.updateState(this.state.edit);
          else {
            this.setView(new EditorView(editorRef, {
              state: this.state.edit,
              dispatchTransaction: transaction => this.dispatch({ type: 'transaction', transaction }),
            }));
          }
        } else this.setView(null);
      }

      // Load the document from the server and start up
      start() {
        const data = initData;

        this.dispatch({
          type: 'loaded',
          doc: schema.nodeFromJSON(data.doc),
          selections: data.selections,
        });
      }

      setView(view) {
        if (this.view) this.view.destroy();
        // eslint-disable-next-line no-multi-assign
        this.view = window.view = view;
      }
    }

    function createEditor() {
      // eslint-disable-next-line no-multi-assign
      const editor = window.editor = new EditorConnection();
      editor.view.focus();
      return editor;
    }

    this.editor = createEditor();
  },
};
</script>

<style>
/* Unscoped styles for ProseMirror elements */

.ProseMirror {
  --vertical-padding: 1.8rem;

  outline: none;
  padding: var(--vertical-padding) 2rem;
  overflow-y: scroll;
  height: 75vh;
  /* REQUIRED: https://github.com/ProseMirror/prosemirror/issues/651#issuecomment-313436150 */
  white-space: pre-wrap;
}

/* Set vertical padding to bottom of vertical scrolling editor */
.ProseMirror:after {
  content: "";
  display: block;
  height: var(--vertical-padding);
  width: 100%;
}

.editor__sentence {
  background-color: #B3E7FF22;
  border: 1px solid #97B9E822;
  cursor: pointer;
}

.editor__sentence.sentence--selected,
.editor__sentence:hover {
  background-color: #B3E7FF88;
  border: 1px solid #97B9E888;
}
</style>

<style scoped>
.editor {
  @apply border;
  /* Wrap inner content padding */
  overflow: auto;
}

.timestamp {
  opacity: 0.7;
  transition: opacity 0.5s ease-in;
  float: left;
}

.timestamp--transparent {
  opacity: 0;
}
</style>
