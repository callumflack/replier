<template>
  <div class="container Block-sm max-w-3xl">
    <!-- <router-link to="/" class="Link mb-8 block opacity-75">Return to Editor</router-link> -->

    <div class="px-6">
      <textarea
        class="reply-input reply-input--contextual Input"
        placeholder="Say hi…"
        rows="2"
        @input="handleIntroInput"
      >{{ $store.state.repliesIntro }}</textarea>

      <draggable v-model="groupedSelections" handle=".handle" @end="handleDragEnd">
        <div
          class="selection"
          v-for="selection in groupedSelections"
          :key="selection.id"
        >
          <div class="selection__options">
            <!-- <button class="option-button handle">
              <icon name="grip" />
            </button> -->
            <!-- <button
              @click="(event) => deleteSelection(event, selection)"
              class="option-button delete-button"
            >
              <icon name="delete" />
            </button> -->
            <Tooltip>
              <button class="option-button handle">
                <icon name="grip" />
              </button>
              <span class="ui-label" slot="content">Drag to move</span>
            </Tooltip>
            <Tooltip>
              <button
                @click="(event) => deleteSelection(event, selection)"
                class="option-button delete-button"
              >
                <icon name="delete" />
              </button>
              <span class="ui-label" slot="content">Delete</span>
            </Tooltip>
          </div>

          <div class="selection-content">
            <div class="selection-header s-p">
              {{ selection.text }}
            </div>
            <textarea
              class="reply-input Input"
              placeholder="Reply…"
              rows="3"
              @input="(event) => handleReplyInput(event, selection)"
            >{{ findReply(selection) }}</textarea>
            <!-- <Tooltip class="tooltip--reply">
              <textarea
                class="reply-input Input"
                placeholder="Reply…"
                rows="3"
                @input="(event) => handleReplyInput(event, selection)"
              >{{ findReply(selection) }}</textarea>
              <span class="ui-label" slot="content">Click to start writing</span>
            </Tooltip> -->
          </div>
        </div>
      </draggable>

      <textarea
        class="reply-input reply-input--contextual Input"
        placeholder="Add a summary…"
        rows="3"
        @input="handleOutroInput"
      >{{ $store.state.repliesOutro }}</textarea>

      <ButtonExport :groupedSelections="groupedSelections" />
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import ButtonExport from '@/components/ButtonExport.vue';
import Tooltip from '@/components/Tooltip.vue';

export default {
  name: 'reply',
  components: {
    draggable,
    ButtonExport,
    Tooltip,
  },
  computed: {
    groupedSelections: {
      get() {
        return this.$store.getters.groupedSelections;
      },
      set(value) {
        this.$store.commit('updateOrders', value);
      },
    },
  },
  methods: {
    handleDragEnd() {
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
    },
    findReply(selection) {
      return this.$store.state.replies[selection.id];
    },
    handleReplyInput(event, selection) {
      this.$store.commit('setReply', {
        id: selection.id,
        intro: event.target.value,
      });
    },
    handleIntroInput(event) {
      this.$store.commit('setRepliesIntro', event.target.value);
    },
    handleOutroInput(event) {
      this.$store.commit('setRepliesOutro', event.target.value);
    },
  },
  mounted() {
    this.goBackIfSelectionsEmpty();
    document.documentElement.classList.add('bg-brand-neutral');
  },
};
</script>

<style lang="postcss" scoped>
.selection {
  @apply relative flex;
  @apply cursor-default;
}
.selection:not(:last-of-type) {
  /* less than Block-sm-b */
  margin-bottom: calc(theme(spacing.10) * var(--block-size-ratio));
}
.selection-content {
  flex-grow: 1;
}

/*
  Affordance buttons
 */
.selection__options {
  @apply absolute inset-0 right-auto text-right;
  left: -3.5rem;
}
.selection .option-button {
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

/*
  Inputs
 */
.reply-input {
  --button-padding-x: 0;
  @apply font-title font-medium text-brand-primary;
  @apply leading-relaxed;
  @apply bg-transparent;
  /* @apply border-b border-gray-light; */
  font-size: calc(theme(fontSize.xl) * var(--text-ratio) - 1px);
  transition: border-color 0.2s;
}
.reply-input:focus {
  border-color: theme('colors.brand.primary');
}
.reply-input--contextual::placeholder {
  --input-placeholder-color: theme('colors.gray.mid');
}

/*
  UI label
 */
.ui-label {
  @apply py-1 px-2 rounded;
  @apply bg-black text-white text-center;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.15);
  font-size: calc(theme(fontSize.xs) * var(--text-ratio));
  padding-bottom: 0.375rem;
}
/* .tooltip--reply >>> .tooltip-content {
  @apply absolute z-10;
  @apply text-center;
  top: -7px;
  left: 50%;
  min-width: 150px;
  transform: translate(-50%, 100%);
} */
</style>
