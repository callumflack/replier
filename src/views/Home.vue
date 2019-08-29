<template>
  <div class="home">
    <div class="container">
      <div class="editor" ref="editor" />

      <div ref="editor_initial_content" class="editor-initial-content" v-once />
    </div>
  </div>
</template>

<script>
import { commentPlugin, commentUI } from '../lib/comment';

const { EditorState } = require('prosemirror-state');
const { EditorView } = require('prosemirror-view');
const { schema } = require('prosemirror-schema-basic');
const { exampleSetup } = require('prosemirror-example-setup');


export default {
  name: 'home',
  mounted() {
    const that = this;

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
      comments: [],
      commentVersion: 0,
    };


    class State {
      constructor(edit, comm) {
        this.edit = edit;
        this.comm = comm;
      }
    }

    class EditorConnection {
      constructor() {
        this.state = new State(null, 'start');
        this.request = null;
        this.backOff = 0;
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
              commentPlugin,
              commentUI(transaction => this.dispatch({ type: 'transaction', transaction })),
            ]),
            comments: action.comments,
          });
          this.state = new State(editState, 'poll');
        } else if (action.type === 'transaction') {
          newEditState = this.state.edit.apply(action.transaction);
        }

        if (newEditState) {
          if (newEditState.doc.content.size > 40000) {
            this.state = new State(newEditState, 'detached');
          } else {
            this.state = new State(newEditState, this.state.comm);
          }
        }

        // Sync the editor with this.state.edit
        if (this.state.edit) {
          if (this.view) this.view.updateState(this.state.edit);
          else {
            this.setView(new EditorView(that.$refs.editor, {
              state: this.state.edit,
              dispatchTransaction: transaction => this.dispatch({ type: 'transaction', transaction }),
            }));
          }
        } else this.setView(null);
      }

      // Load the document from the server and start up
      start() {
        const data = initData;
        this.backOff = 0;
        this.dispatch({
          type: 'loaded',
          doc: schema.nodeFromJSON(data.doc),
          version: data.version,
          users: data.users,
          comments: {
            version: data.commentVersion, comments: data.comments,
          },
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
      return true;
    }

    createEditor();
  },
};
</script>

<style>
.editor {
  border: 1px solid #eaeaea;
  /* Wrap inner content padding */
  overflow: auto;
}

.ProseMirror {
  outline: none;
  padding: 1rem 2.2rem;
  overflow-y: scroll;
  height: 80vh;
  /* REQUIRED: https://github.com/ProseMirror/prosemirror/issues/651#issuecomment-313436150 */
  white-space: pre-wrap;
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

.editor-initial-content {
  display: none;
}
</style>
