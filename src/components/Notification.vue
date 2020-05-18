<template>
  <span class="Root Text-sm">
    <icon
      name="flash_on"
      class="text-white mr-2px"
      height="1.25em"
      width="1.25em"
    ></icon>
    <slot></slot>
  </span>
</template>

<style lang="postcss" scoped>
  .Root {
    @apply absolute py-2 px-3 rounded-md shadow-xl;
    top: theme(spacing.w2);
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 750ms theme(bezier.thisalso);
    @apply font-semibold bg-brand-primary text-white text-center;
    z-index: 101;
  }
</style>
