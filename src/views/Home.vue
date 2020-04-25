<template>
  <div class="relative">
    <Editor class="editor py-w5 px-inset" :editor.sync="editor" />

    <div
      class="ActionButton"
      :class="{ 'is-active': $store.state.selections.length }"
    >
      <button
        class="Button font-title"
        @click="handleContinueClick"
        :disabled="!$store.state.selections.length"
      >Reply</button>
    </div>

    <aside class="aside-map">
      <p
        v-for="selection in $store.getters.groupedSelections"
        :key="selection.id "
      >
        <span>
          {{ selection.text }}
        </span>
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
  /* mounted() {
    document.documentElement.classList.add('bg-brand-neutral');
  }, */
};
</script>

<style lang="postcss" scoped>
.editor {
  min-height: 70vh;
}
@screen xl {
  .editor {
    min-height: 40vh;
  }
}

.aside-map {
  @apply absolute top-0 right-0;
  transform: translateX(144%);
  width: 150px;
}
.aside-map p {
  @apply text-transparent;
  @apply mb-2;
  @apply leading-relaxed;
  font-size: 0.4rem;
}
.aside-map span {
  background-color: var(--color-selected);
}
</style>
