<template>
  <div class="pt-w5 pb-w8">
    <!-- tabindex starting with a positive value and
    ending with the highest possible value: tiny.cc/txtudz -->
    <div class="px-inset">
      <textarea
        class="reply-input reply-input--contextual reply-input--intro Input"
        placeholder="Say hi…"
        tabindex="1"
        @input="handleIntroInput"
      >{{ $store.state.repliesIntro }}</textarea>

      <draggable
        v-model="groupedSelections"
        v-bind="dragOptions"
        handle=".handle"
        @end="handleDragEnd"
      >
        <transition-group type="transition" name="flip-list">
          <div
            class="selection"
            v-for="(selection, index) in groupedSelections"
            :key="selection.id"
          >
            <div class="selection__options">
              <Tooltip>
                <button class="option-button handle">
                  <icon name="grip"></icon>
                </button>
                <span class="ui-label" slot="content">Drag to move</span>
              </Tooltip>
              <Tooltip>
                <button
                  @click="(event) => deleteSelection(event, selection)"
                  class="option-button delete-button"
                >
                  <icon name="delete"></icon>
                </button>
                <span class="ui-label" slot="content">Delete</span>
              </Tooltip>
            </div>

            <div class="selection-content">
              <div class="selection-header s-p">{{ selection.text }}</div>
              <textarea
                class="reply-input Input"
                placeholder="Reply…"
                :tabindex="index + 2"
                @input="(event) => handleReplyInput(event, selection)"
              >{{ findReply(selection) }}</textarea>
            </div>
          </div>
        </transition-group>
      </draggable>

      <textarea
        class="reply-input reply-input--contextual reply-input--outro Input"
        placeholder="Add a summary or closing remark…"
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
        <div class="Modal-body">
          <p class="s-h Meta text-brand-primary">
            <icon name="check-circle" class="text-brand-primary mr-2px" height="1.25em" width="1.25em"></icon>
            Copied to your clipboard
          </p>
          <hr class="my-4" />
          <div class="flex pt-1">
            <button
              class="mr-2 w-1/2 font-title font-semibold Button Button--black"
              @click="resetState"
            >
              Start again
            </button>
            <button
              class="ml-2 w-1/2 font-title font-semibold Button"
              @click="dismiss"
            >
              Keep editing
            </button>
          </div>
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
      drag: false,
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
    /*
      See:
      * https://sortablejs.github.io/Vue.Draggable/#/transition-example-2
      * https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/transition-example-2.vue
      * https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/transition-example.vue
    */
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
      };
    },
  },
  methods: {
    dismiss() {
      this.$refs.resetModal.dismiss();
    },
    async resetState() {
      await this.$store.commit('resetState');
      this.$refs.resetModal.dismiss();
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
    resizeTextarea(element) {
      /* eslint-disable no-param-reassign */
      element.style.height = '1px';
      element.style.height = `${element.scrollHeight}px`;
      /* eslint-enable no-param-reassign */
    },
    handleReplyInput(event, selection) {
      this.resizeTextarea(event.target);

      this.$store.commit('setReply', {
        id: selection.id,
        text: event.target.value,
      });
    },
    handleIntroInput(event) {
      this.resizeTextarea(event.target);
      this.$store.commit('setRepliesIntro', event.target.value);
    },
    handleOutroInput(event) {
      this.resizeTextarea(event.target);
      this.$store.commit('setRepliesOutro', event.target.value);
    },
  },
  mounted() {
    this.goBackIfSelectionsEmpty();
    // document.documentElement.classList.add('bg-brand-neutral');
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
  left: -2.5rem;
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
  /* Input changes size to fit it's content */
  --min-height: 90px;
  min-height: var(--min-height);
  height: var(--min-height);
  @apply font-title font-normal text-scheme-text leading-relaxed;
  @apply bg-transparent;
  /* @apply border border-gray-light; */
  /* font-size: calc(theme(fontSize.xl) * var(--text-ratio) - 1px); */
  font-size: calc(theme(fontSize.xl) * var(--text-ratio));
  transition: border-color 0.2s;
}
.reply-input:focus {
  border-color: theme("colors.brand.primary");
}
.reply-input::placeholder,
.reply-input--contextual::placeholder {
  --input-placeholder-color: theme("colors.brand.primary");
}
.reply-input--intro {
  margin-bottom: calc(theme(spacing.4) * var(--block-size-ratio));
}
.reply-input--outro {
  --min-height: 120px;
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
  @apply bg-transparent;
  /* background: rgba(255, 255, 255, 0.7); */
  /* background: rgba(250, 248, 245, 0.7); */
  /* background: rgba(244, 242, 240, 0.7); */
  /* background-color: rgba(166, 101, 1, 0.2); */
  /* transition: background-color 500ms cubic-bezier(0.19, 1, 0.22, 1); */
  z-index: 101; /* 1 */
}
.modal-is-active .Modal-backdrop {
  /* background-color: rgba(166, 101, 1, 0.5); */
  background-color: hsla(theme(colors.brand.primarys), 0.5);
}
@media (prefers-color-scheme: dark) {
  .modal-is-active .Modal-backdrop {
    /* background-color: rgba(166, 101, 1, 0.25); */
    background-color: hsla(theme(colors.brand.primarys), 0.25);
  }
}

.Modal-body {
  @apply bg-white rounded-lg shadow-xl;
  @apply p-inset;
  margin-top: 25vh;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
}
.Modal-body .Button {
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
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
