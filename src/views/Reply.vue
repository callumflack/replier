<template>
  <div>
    <div class="container">
      <div class="selection" v-for="selection in $store.state.selections" :key="selection">
        <p>"{{ selection }}"</p>
        <textarea
          class="reply-input"
          placeholder="Reply..."
          rows="3"
          />
      </div>

      <button class="next-button"
        @click="exportReply">Export</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reply',
  methods: {
    exportReply() {
    },
  },
};
</script>

<style scoped>
.selection {
  margin-top: 3rem;
}

.selection p {
  font-weight: bold;
}

.reply-input {
  border: 1px solid;
  border-bottom: 1px solid;
  border-color: #eaeaea;
  width: 100%;
  padding: 0.7rem 0.9rem;
}
.reply-input:focus {
  border-color: var(--color-brand);
  transition: border-color 0.2s;
}
</style>
