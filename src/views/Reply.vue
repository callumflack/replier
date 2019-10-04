<template>
  <div class="container Block-sm max-w-3xl">
    <!-- tabindex starting with a positive value and
    ending with the highest possible value: tiny.cc/txtudz -->
    <div class="container-inset">
      <textarea
        class="reply-input reply-input--contextual reply-input--intro Input"
        placeholder="Say hi…"
        rows="2"
        tabindex="1"
        @input="handleIntroInput"
      >{{ $store.state.repliesIntro }}</textarea>

      <draggable
        v-model="groupedSelections"
        handle=".handle"
        @end="handleDragEnd"
      >
        <div
          class="selection"
          v-for="(selection, index) in groupedSelections"
          :key="selection.id"
        >
          <div class="selection__options">
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
            <div class="selection-header s-p">{{ selection.text }}</div>
            <textarea
              class="reply-input Input"
              placeholder="Reply…"
              rows="2"
              :tabindex="index + 2"
              @input="(event) => handleReplyInput(event, selection)"
            >{{ findReply(selection) }}</textarea>
          </div>
        </div>
      </draggable>

      <textarea
        class="reply-input reply-input--contextual reply-input--outro Input"
        placeholder="Add a summary…"
        rows="3"
        tabindex="999"
        @input="handleOutroInput"
      >{{ $store.state.repliesOutro }}</textarea>
    </div>
    <ButtonExport @onExport="handleExport" :groupedSelections="groupedSelections" />
    <!-- success modal -->
    <portal to="modals">
      <Modal
        :show="isResetModalOpen"
        @close="isResetModalOpen = false"
        ref="resetModal"
      >
        <p class="s-h Meta">
          <icon name="check-circle" class="text-form-good mr-2px" height="1.25em" width="1.25em"></icon>
          Copied to your clipboard
        </p>
        <hr class="s-h" />
        <div class="flex pt-1">
          <button class="mr-2 w-1/2 font-title font-semibold Button" @click="resetState">
            Start again
          </button>
          <button class="ml-2 w-1/2 font-title font-semibold Button Button--outline" @click="dismiss">
            Keep editing
          </button>
        </div>
      </Modal>
    </portal>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import ButtonExport from '@/components/ButtonExport.vue';
import Tooltip from '@/components/Tooltip.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'reply',
  components: {
    draggable,
    ButtonExport,
    Tooltip,
    Modal,
  },
  data() {
    return {
      isResetModalOpen: false,
    };
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
    dismiss() {
      this.$refs.resetModal.dismiss();
    },
    async resetState() {
      await this.$store.commit('resetState');
      this.$refs.resetModal.dismiss();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.$router.push('/');
    },
    handleExport() {
      this.isResetModalOpen = true;
    },
    handleDragEnd() {},
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
          .filter(
            deco => deco.type.spec.selection.groupId === selection.groupId,
          )
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
        text: event.target.value,
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
  --inset: 12px;
  @apply relative flex;
  @apply cursor-default;
  @apply rounded-lg;
  /* @apply border border-form-bad; */
  padding: var(--inset);
  margin: calc(-1 * var(--inset));
}
.selection:not(:last-of-type) {
  /* less than Block-sm-b */
  margin-bottom: calc(theme(spacing.2) * var(--block-size-ratio));
}
.selection-header {
  @apply text-brand-primary;
  @apply text-gray-dark;
}
.selection-content {
  flex-grow: 1;
}

/*
  Affordance buttons
*/
.selection__options {
  @apply absolute inset-0 right-auto text-right;
  top: var(--inset);
  left: -3rem;
}
.selection .option-button {
  @apply opacity-0;
  @apply text-black;
  transition: opacity 250ms cubic-bezier(0.19, 1, 0.22, 1);
}
.selection .option-button:focus {
  @apply outline-none;
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
  @apply font-title font-medium;
  @apply text-black;
  @apply leading-relaxed;
  @apply bg-transparent;
  /* @apply border-b border-gray-light; */
  font-size: calc(theme(fontSize.xl) * var(--text-ratio) - 1px);
  transition: border-color 0.2s;
}
.reply-input:focus {
  border-color: theme("colors.brand.primary");
}
.reply-input--contextual::placeholder {
  --input-placeholder-color: theme("colors.black");
}
.reply-input--intro {
  margin-bottom: calc(theme(spacing.4) * var(--block-size-ratio));
}
.reply-input--outro {
  @apply pt-2;
  margin-top: calc(theme(spacing.4) * var(--block-size-ratio));
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

/*
  Modal
  1. Move it above everything incl the nav
 */
.Modal-backdrop {
  @apply flex justify-center items-start;
  background: rgba(255, 255, 255, 0.7);
  background: rgba(250, 248, 245, 0.7);
  background: rgba(244, 242, 240, 0.7);
  z-index: 101; /* 1 */
}
>>> .Modal {
  @apply shadow-xl;
  @apply rounded-lg bg-white;
  /* @apply border border-form-good; */
  padding: calc(theme(spacing.8) * var(--block-size-ratio));
  margin-top: calc(theme(spacing.48) * var(--block-size-ratio));
  margin-top: 25vh;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
}
>>> .Modal .Button {
  white-space: nowrap;
}

/*
  Draggable
*/
.sortable-chosen {
  @apply shadow-md border border-gray-light;
}
.sortable-ghost {
  /* background-color: rgba(0, 123, 255, 0.025); */
}
</style>
