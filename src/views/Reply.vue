<template>
  <div class="container Block-sm max-w-3xl">
    <!-- <router-link to="/" class="Link mb-8 block opacity-75">Return to Editor</router-link> -->

    <draggable v-model="groupedSelections" handle=".handle" @end="end">
      <div
        class="selection"
        v-for="selection in groupedSelections"
        :key="selection.id"
      >
        <div class="selection__options">
          <button class="option-button handle">
            <icon name="grip" />
          </button>
          <button
            @click="(event) => deleteSelection(event, selection)"
            class="option-button delete-button"
          >
            <icon name="delete" />
          </button>
        </div>
        <div class="selection-content">
          <div class="selection-header s-p">
            {{ selection.text }}
          </div>
          <textarea
            class="reply-input Input"
            placeholder="Add an intro…"
            rows="3"
            @input="(event) => handleIntroInput(event, selection)"
          >{{ findReplyIntro(selection) }}</textarea>
          <textarea
            class="reply-input Input"
            placeholder="Summarise your reply…"
            rows="3"
            @input="(event) => handleOutroInput(event, selection)"
          >{{ findReplyOutro(selection) }}</textarea>
        </div>
      </div>
    </draggable>

    <div class="ActionButton">
      <button
        class="Button font-title"
        @click="exportReply"
      >
        Export
      </button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'reply',
  components: {
    draggable,
  },
  data() {
    return {
      groupedSelections: [],
    };
  },
  /* head() {
    return {
      htmlAttrs: {
        class: `page${this.currentPageClass}`,
      },
    };
  }, */
  methods: {
    groupSelections() {
      const selections = this.$store.state.selections;
      const groupedSelections = [];

      selections.forEach((deco) => {
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
        const orderA = this.$store.state.orders[a.id];
        const orderB = this.$store.state.orders[b.id];
        return orderA - orderB;
      });

      this.groupedSelections = groupedSelections;
    },
    end() {
      this.$store.commit('updateOrders', this.groupedSelections);
    },
    goBackIfSelectionsEmpty() {
      if (!this.$store.state.selections.length) {
        this.$router.push('/');
      }
    },
    deleteSelection(event, selection) {
      // TODO: If in group delete whole group of selections
      let selectionsToDelete = [selection.id];

      if (selection.groupId) {
        selectionsToDelete = this.$store.state.selections
          .filter(deco => deco.type.spec.selection.groupId === selection.groupId)
          .map(deco => deco.type.spec.selection.id);
      }

      this.$store.commit('deleteSelections', selectionsToDelete);
      this.goBackIfSelectionsEmpty();
      this.groupSelections();
    },
    findReply(selection) {
      return this.$store.state.replies[selection.id];
    },
    findReplyIntro(selection) {
      const reply = this.findReply(selection);
      return reply && reply.intro;
    },
    findReplyOutro(selection) {
      const reply = this.findReply(selection);
      return reply && reply.outro;
    },
    handleIntroInput(event, selection) {
      this.$store.commit('updateOrCreateReply', {
        id: selection.id,
        intro: event.target.value,
      });
    },
    handleOutroInput(event, selection) {
      this.$store.commit('updateOrCreateReply', {
        id: selection.id,
        outro: event.target.value,
      });
    },
    async exportReply() {
      // Copy exported contents to clipboard
      // Display UI feedback
      const exportText = this.groupedSelections
        .map((selection) => {
          const reply = this.$store.state.replies[selection.id] || '';
          return `> ${selection.text}\n${reply.intro}\n${reply.outro}`;
        })
        .join('\n\n');

      try {
        await navigator.clipboard.writeText(exportText);
      } catch (err) {
        console.error('Could not copy text to clipboard: ', err);
      }
    },
  },
  mounted() {
    this.goBackIfSelectionsEmpty();
    this.groupSelections();
    document.documentElement.classList.add('bg-brand-neutral');
  },
};
</script>

<style lang="postcss" scoped>
.selection {
  @apply relative flex px-6;
  @apply cursor-default;
}
.selection:not(:last-of-type) {
  /* less than Block-sm-b */
  margin-bottom: calc(theme(spacing.10) * var(--block-size-ratio));
}

.selection-content {
  flex-grow: 1;
}

.selection-header {
  /* @apply font-semibold; */
  /* @apply text-gray-dark; */
}

/*
  Affordance buttons
 */
.selection__options {
  @apply absolute inset-0 right-auto text-right;
  left: -2rem;
}

.selection .option-button {
  /* @apply align-middle; */
  @apply opacity-0;
  @apply text-black;
  transition: opacity 250ms cubic-bezier(0.19, 1, 0.22, 1);
}
.selection .option-button + .option-button {
  @apply ml-2px;
}
.selection .option-button svg {
  @apply bg-transparent rounded;
  height: 1.25em !important;
  width: 1.25em !important;
  transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
}

.selection:hover .option-button {
  @apply opacity-33;
  @apply cursor-pointer;
}
.selection:hover .option-button:hover {
  @apply opacity-100;
}
.selection .option-button:hover svg {
  @apply bg-gray-light;
}
.selection .option-button.handle {
  @apply cursor-move;
}

.selection .delete-button {
  /* @apply text-form-bad text-3xl; */
}

/*
  Inputs
 */
.reply-input {
  --button-padding-x: 0;
  @apply font-title font-medium text-brand-primary;
  @apply leading-relaxed;
  @apply bg-transparent;
  /* @apply border; */
  font-size: calc(theme(fontSize.xl) * var(--text-ratio) - 1px);
  transition: border-color 0.2s;
}
.reply-input:focus {
  border-color: theme('colors.brand.primary');
}
</style>
