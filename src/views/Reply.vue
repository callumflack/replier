<template>
  <div class="container Block-sm max-w-5xl">
    <router-link to="/" class="Link mb-8 block opacity-75">Return to Editor</router-link>

    <div
      class="selection"
      v-for="selection in $store.state.selections"
      :key="selection.type.spec.selection.id"
    >
      <div class="selection-header">
        <p class="s-p">"{{ selection.type.spec.selection.text }}"</p>
        <button
          @click="(event) => deleteSelection(event, selection.type.spec.selection)"
          class="delete-button opacity-75"
        >&#10005;</button>
      </div>
      <textarea
        class="reply-input Input"
        placeholder="Reply..."
        rows="3"
        @input="(event) => handleInput(event, selection.type.spec.selection)"
        >{{ findReply(selection) }}</textarea>
    </div>

    <div class="mt-8">
      <button
        class="Button Button--continue"
        @click="exportReply"
      >Export</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reply',
  methods: {
    deleteSelection(event, selection) {
      this.$store.commit('deleteSelection', selection.id);
      if (!this.$store.state.selections.length) {
        this.$router.push('/');
      }
    },
    findReply(selection) {
      return this.$store.state.replies[selection.type.spec.selection.id];
    },
    handleInput(event, selection) {
      this.$store.commit('setReply', {
        id: selection.id,
        text: event.target.value,
      });
    },
    exportReply() {
      // Copy exported contents to clipboard
      // Display UI feedback
    },
  },
};
</script>

<style scoped>
.selection {
  @apply mb-12;
}

.selection-header {
  @apply flex justify-between items-start;
}

.selection .delete-button {
  @apply text-red text-3xl ml-10;
  opacity: 0;
  transition: opacity 0.2s;
}

.selection:hover .delete-button {
  opacity: 0.50;
}

.selection:hover .delete-button:hover {
  opacity: 1;
}

.selection-header p {
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
