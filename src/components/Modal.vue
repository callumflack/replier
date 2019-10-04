<template>
  <transition name="Modal">
    <div v-show="show" class="Modal-backdrop">
      <div class="Modal">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
/* https://learn.adamwathan.com/advanced-vue/encapsulating-external-behavior-background-scrolling */

export default {
  props: {
    show: { required: true },
    preventBackgroundScrolling: { default: true },
    info: { default: false },
  },
  watch: {
    show: {
      // this watcher will run when first instantiated
      immediate: true,
      handler(show) {
        if (this.preventBackgroundScrolling) {
          if (show) {
            document.body.style.setProperty('overflow', 'hidden');
            document.documentElement.classList.add('modal-is-active');
          } else {
            document.body.style.removeProperty('overflow');
            document.documentElement.classList.remove('modal-is-active');
          }
          if (show && this.info) {
            document.documentElement.classList.add('info-modal');
          } else {
            document.documentElement.classList.remove('info-modal');
          }
        }
      },
    },
  },
  created() {
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && this.show) {
        this.dismiss();
      }
    };
    document.addEventListener('keydown', escapeHandler);
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler);
    });
  },
  methods: {
    closeVideo() {
      // eslint-disable-next-line
      const video = document.getElementsByTag("video");
      this.video.pause();
      this.video.currentTime = 0;
    },
    dismiss() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="postcss" scoped>
.Modal-backdrop {
  @apply fixed inset-0 overflow-auto;
  background-color: rgba(255, 255, 255, 1);
  z-index: 99; /* below vue-headroom */
}

.Modal {
  /* @apply h-full; */
  /* @apply bg-white; */
}

.Modal-close {
  @apply absolute inset-0 p-4 z-10 cursor-pointer;
}

.Modal-close:focus,
.Modal-close:active {
  @apply outline-none;
}

/* Transition */
.Modal-enter-active,
.Modal-leave-active {
  transition: opacity 500ms cubic-bezier(0.19, 1, 0.22, 1);
}

.Modal-enter,
.Modal-leave-to {
  @apply opacity-0;
  /* transform: scale(1.05); */
}
</style>
