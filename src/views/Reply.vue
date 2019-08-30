<template>
  <div>
    <div class="container max-w-5xl">
      <div class="selection" v-for="selection in $store.state.selections" :key="selection">
        <p class="s-p">"{{ selection }}"</p>
        <textarea
          class="reply-input Input"
          placeholder="Reply..."
          rows="3"
          />
      </div>

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
  @apply mt-12;
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
