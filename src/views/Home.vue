<template>
  <div class="home">
    <div class="container">
      <div class="editor" ref="editor" />
    </div>
  </div>
</template>

<script>
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import { exampleSetup } from 'prosemirror-example-setup';

import { selectionPlugin, selectionUI } from '../lib/selection';


export default {
  name: 'home',
  mounted() {
    // Used to mount editor to the DOM
    const editorRef = this.$refs.editor;

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
