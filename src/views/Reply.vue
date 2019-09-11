<template>
  <div class="container Block-sm max-w-5xl">
    <router-link to="/" class="Link mb-8 block opacity-75">Return to Editor</router-link>

    <draggable v-model="groupedSelections" handle=".handle" @end="end">
      <div
        class="selection"
        v-for="selection in groupedSelections"
        :key="selection.id"
      >
        <div class="selection__options">
          <button
            class="option-button handle"
          >&#9776;</button>
          <button
            @click="(event) => deleteSelection(event, selection)"
            class="option-button delete-button"
          >&#10005;</button>
        </div>
        <div class="selection-content">
          <div class="selection-header s-p">
           "{{ selection.text }}"
          </div>
          <textarea
            class="reply-input Input"
            placeholder="Reply..."
            rows="3"
            @input="(event) => handleInput(event, selection)"
            >{{ findReply(selection) }}</textarea>
        </div>
      </div>
    </draggable>

    <div class="mt-8">
      <button
        class="Button Button--continue"
        @click="exportReply"
      >Export</button>
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
      this.groupSelections();

      this.goBackIfSelectionsEmpty();
    },
    findReply(selection) {
      return this.$store.state.replies[selection.id];
    },
    handleInput(event, selection) {
      this.$store.commit('setReply', {
        id: selection.id,
        text: event.target.value,
      });
    },
    async exportReply() {
      // Copy exported contents to clipboard
      // Display UI feedback
      const exportText = this.groupedSelections
        .map((selection) => {
          const reply = this.$store.state.replies[selection.id] || '';
          return `> ${selection.text}\n${reply}`;
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
    this.groupSelections();
    this.goBackIfSelectionsEmpty();
  },
};
</script>

<style scoped>
.selection {
  @apply mb-12 flex relative;
}

.selection__options {
  @apply px-8 absolute;
  top: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
}

.selection .option-button {
  @apply ml-4;
  opacity: 0;
  transition: opacity 0.2s;
  vertical-align: middle;
}

.selection:hover .option-button {
  opacity: 0.50;
}

.selection:hover .option-button:hover {
  opacity: 1;
}

.selection .delete-button {
  @apply text-red text-3xl;
}

.selection-content {
  flex-grow: 1;
}

.selection-header {
  font-weight: bold;
}

.reply-input {
  @apply border;
  transition: border-color 0.2s;
}
.reply-input:focus {
  border-color: theme('colors.brand.primary');
}
</style>
