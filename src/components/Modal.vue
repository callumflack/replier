<template>
  <transition name="Modal">
    <div class="Modal-backdrop z-100" v-show="show" @click="dismiss">
      <div class="Modal" @click="stopPropagation">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
// import IconBase from "@/components/IconBase";
// import IconUIClose from "@/components/icons/IconUIClose";

/* https://learn.adamwathan.com/advanced-vue/encapsulating-external-behavior-background-scrolling */

export default {
  components: {},
  props: {
    show: { required: true },
    preventBackgroundScrolling: { default: true },
  },
  watch: {
    show: {
      // this watcher will run when first instaniated
      immediate: true,
      handler(show) {
        if (this.preventBackgroundScrolling) {
          if (show) {
            document.body.style.setProperty('overflow', 'hidden');
          } else {
            document.body.style.removeProperty('overflow');
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
    stopPropagation(event) {
      event.stopPropagation();
    },
    dismiss() {
      this.$emit('close');
      document.body.style.removeProperty('overflow');
    },
  },
};
</script>

<style scoped>
.Modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
}

@keyframes headerIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.Modal {
  @apply py-5 px-7;
  animation: headerIn 750ms cubic-bezier(0.19, 1, 0.22, 1);
  background-color: #fff;

  @media (max-width: 768px) and (orientation: landscape) {
    height: auto;
  }
}

.Modal-close {
  cursor: pointer;
  padding: calc(1.75 * var(--rs-space));
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;

  &:focus,
  &:active {
    outline: none;
  }

  & >>> svg {
    height: 2.5em;
    width: 2.5em;

    @media (--sm) {
      height: 3em;
      width: 3em;
    }
  }
}

/*
 * Transitions auto-applied to elements with
 * transition="modal" when their visibility is toggled by Vue.
 */

.Modal-enter-active, .Modal-leave-active {
  transition: opacity .2s;
}

.Modal-enter, .Modal-leave-to /* .Modal-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
