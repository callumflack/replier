<template>
  <span class="tooltip">
    <slot name="trigger" v-bind="{ setIsOpen, isOpen }">
      <span @mouseenter="setIsOpen(true)" @mouseleave="setIsOpen(false)" class="tooltip-trigger">
        <slot/>
      </span>
    </slot>
    <div v-show="isOpen" class="tooltip-content">
      <slot name="content" v-bind="{ setIsOpen, isOpen }"/>
    </div>
  </span>
</template>

<script>
/* https://codesandbox.io/s/composing-components-blog-0sjpp */
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    setIsOpen(isOpen) {
      this.isOpen = isOpen;
    },
  },
};
</script>

<style lang="postcss">
.tooltip {
  @apply relative;
}
.tooltip-trigger {
  /* @apply cursor-help; */
  /* @apply border-b; */
  /* border-bottom: 1px dashed rgba(#000, 0.5); */
}
.tooltip-content {
  @apply absolute z-10;
  @apply text-center;
  bottom: -7px;
  left: 50%;
  min-width: 150px;
  transform: translate(-50%, 100%);
}
</style>
