<template>
  <transition name="Modal">
    <div v-show="show" class="Modal-backdrop">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
/* https://learn.adamwathan.com/advanced-vue/encapsulating-external-behavior-background-scrolling */

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    preventBackgroundScrolling: {
      type: Boolean,
      default: true
    },
    info: {
      type: Boolean,
      default: false
    },
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
  /* background-color: rgba(255, 255, 255, 1); */
  /* background-color: rgba(49, 48, 45, 0.51); */
  z-index: 99; /* below headroom */
}
.Modal-close {
  @apply absolute inset-0 p-4 z-10 cursor-pointer;
}
.Modal-close:focus,
.Modal-close:active {
  @apply outline-none;
}



/* TRANSITION */
.Modal-enter-active,
.Modal-leave-active {
  transition: opacity 1000ms theme(bezier.thisalso);
}
.Modal-enter,
.Modal-leave-to {
  @apply opacity-0;
  /* transform: scale(1.05); */
}
</style>

<style lang="postcss">
/* INFO THEME */
.info-modal .Modal-backdrop {
  @apply bg-scheme-bg-html;
}
.info-modal .Nav {
  @apply border-brand-primary;
}
.info-modal .Title,
.info-modal .Info-button {
  @apply text-brand-primary;
}
</style>
