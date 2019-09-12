<template>
  <div class="main-block Block-sm container max-w-5xl">
    <Editor class="editor" :editor.sync="editor" :timestamp.sync="timestamp" />

    <div class="mt-4 flex justify-between">
      <p
        :class="{ 'timestamp--transparent': !timestamp }"
        class="timestamp"
      >{{ timestamp }}</p>
      <button
        class="Button Button--continue"
        @click="handleContinueClick"
        :disabled="!$store.state.selections.length"
      >Reply</button>
    </div>

    <aside class="aside-map">
      <p v-for="selection in $store.state.selections" :key="selection.type.spec.selection.id ">
        {{ selection.type.spec.selection.text }}
      </p>
    </aside>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue';

export default {
  name: 'home',
  components: {
    Editor,
  },
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

      this.$store.commit('setEditorState', editorState.toJSON());
      this.$store.commit('addMissingOrders');
      this.$router.push({ path: 'reply' });
    },
  },
};
</script>

<style scoped>
.editor {
  height: 75vh;
}

.timestamp {
  opacity: 0.7;
  transition: opacity 0.5s ease-in;
  float: left;
}

.timestamp--transparent {
  opacity: 0;
}

.main-block {
  position: relative;
}

.aside-map {
  @apply text-brand-primary;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  width: 150px;
}

.aside-map p {
  @apply block mb-2;
  font-size: 0.40rem;
}
</style>
