<template>
  <div class="container Block-sm max-w-5xl">
    <router-link to="/" class="Link mb-8 block opacity-75">Return to Editor</router-link>

    <div
      class="selection"
      v-for="selection in $store.state.selections"
      :key="selection.type.spec.selection.id"
    >
      <p class="s-p">"{{ selection.type.spec.selection.text }}"</p>
      <textarea
        class="reply-input Input"
        placeholder="Reply..."
        rows="3"
        />
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

.selection p {
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
