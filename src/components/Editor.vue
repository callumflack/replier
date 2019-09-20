<template>
  <div class="relative">
    <div
      v-if="!$store.state.timestamp"
      class="Placeholder Text-lg"
    >
      Paste here &amp; click to select…
    </div>
    <div
      class="editor z-10"
      :class="{ 'text-brand-primary': !$store.state.timestamp}"
      ref="editor"
    >
    </div>
  </div>
</template>

<script>
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { exampleSetup } from 'prosemirror-example-setup';

import { schema } from '@/lib/schema';
import { selectionPlugin, selectionUI } from '@/lib/selection';

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
  name: 'editor',
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    // Used to mount editor to the DOM
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
          if (!that.$store.state.timestamp) {
            that.$store.commit('setTimestamp', formatDate(new Date()));
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
            this.setView(new EditorView(that.$refs.editor, {
              state: this.state.edit,
              dispatchTransaction: transaction => this.dispatch({ type: 'transaction', transaction }),
            }));
          }
        } else this.setView(null);
      }

      // Load the document from the server and start up
      start() {
        // Check for persisted state
        // fallback to default initData
        const doc = that.$store.state.editorState
          ? that.$store.state.editorState.doc
          : initData.doc;
        const selections = that.$store.state.selections || initData.selections;

        this.dispatch({
          type: 'loaded',
          doc: schema.nodeFromJSON(doc),
          selections,
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
    this.$emit('update:editor', this.editor);
  },
};
</script>

<style lang="postcss">
.Placeholder {
  @apply font-title text-brand-primary pl-6;
  @apply absolute;
  margin-left: 3px;
}
/*

  Unscoped styles for ProseMirror elements
  1. Required: https://github.com/ProseMirror/prosemirror/issues/651#issuecomment-313436150
  2. Set vertical padding to bottom of vertical scrolling editor
  3. Wrap inner content padding

*/
.ProseMirror {
  --vertical-padding: 1.8rem;

  @apply h-full outline-none overflow-y-scroll;
  @apply whitespace-pre-wrap; /* 1 */
  @apply px-6 pt-1;
  /* padding: var(--vertical-padding) theme(spacing.6); */
}

.ProseMirror:after {
  @apply block w-full;
  content: "";
  height: var(--vertical-padding); /* 2 */
}

.editor__sentence {
  @apply cursor-pointer border-transparent;
}

.editor__sentence:hover {
  background-color: var(--color-hover);
}

.sentence--selected {
  @apply border-l;
  border-left-width: 2px;
  padding-left: 4px;
  background-color: var(--color-selected);
  border-color: var(--color-normal);
}


/*

  Groups of sentences

 */

.sentence--group {
  @apply relative;
}
.sentence--group:first-of-type {
  /* @apply border-l; */
}
.sentence--group:last-of-type {
  /* @apply border-r; */
}
.sentence--group:not(:first-of-type):before,
.sentence--group + a .sentence--group:before,
.sentence--group + a + .sentence--group:before {
  @apply absolute top-0 left-0;
  @apply font-bold not-italic text-white;
  @apply rounded-full;
  @apply flex justify-center text-center;
  @apply z-10;
  content: "+";
  background-color: var(--color-normal);
  border-color: var(--color-normal);
  font-size: 60%;
  line-height: 1.1;
  height: 13px;
  width: 13px;
  transform: translate(-8px, -6px);
}
</style>

<style lang="postcss" scoped>
.editor {
  /* @apply border; */
  @apply overflow-auto; /* 3 */
}
</style>
