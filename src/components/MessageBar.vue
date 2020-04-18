<template>
  <div v-show="show" class="relative py-5 -mx-8">
    <div class="Text-sm text-scheme-text-gray text-center px-8 lg:px-16 mb-px">
      <slot></slot>
    </div>
    <div
      class="absolute top-0 right-0 bottom-0 cursor-pointer text-scheme-text-gray px-inset flex items-center"
      @click="show = !show"
    >
      <icon name="close"></icon>
    </div>
  </div>
</template>

<script>
export default {
  name :"MessageBar",
  data() {
    return {
      show: true,
    };
  },
  watch: {
    show: {
      // this watcher will run when first instantiated
      immediate: true,
      handler(show) {
        if (show) {
          document.documentElement.classList.add('messagebar-is-active');
        } else {
          document.documentElement.classList.remove('messagebar-is-active');
        }
      },
    }
  },
};
</script>
