<template>
  <!-- <div class="px-inset" :class="{ 'bg-brand-primary': alert }"> -->
  <div :class="`${ alert ? 'bg-brand-primary px-inset': 'container'}`">
    <div
      v-show="show"
      class="relative -mx-8"
      :class="`${ alert ? 'py-1 md:py-2' : 'py-4 md:py-5' }`"
    >
      <div
        class="Text-sm text-center px-12 lg:px-16 mb-px"
        :class="`${ alert ? 'text-scheme-bg': 'text-scheme-text-gray'}`"
      >
        <slot></slot>
      </div>
      <div
        class="absolute top-0 right-0 bottom-0 cursor-pointer px-inset flex items-center"
        :class="`${ alert ? 'text-scheme-bg': 'text-scheme-text-gray'}`"
        @click="show = !show"
      >
        <icon name="close"></icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MessageBar",
    props: {
      alert: Boolean
    },
    data() {
      return {
        show: true
      };
    },
    watch: {
      show: {
        // this watcher will run when first instantiated
        immediate: true,
        handler(show) {
          if (show) {
            document.documentElement.classList.add("messagebar-is-active");
          } else {
            document.documentElement.classList.remove("messagebar-is-active");
          }
        }
      }
    }
  };
</script>
