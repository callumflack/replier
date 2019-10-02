<template>
  <div class="container max-w-3xl Block">
    <div class="px-6 pt-1">
      <h1
        class="Text-lg font-title font-bold text-brand-primary s-p"
      >{{ thisTitle }}</h1>
      <p class="s-p">{{ thisOne }}</p>
      <p class="s-p">{{ thisTwo }}</p>
      <h1
        class="Text-lg font-title font-bold text-brand-primary s-p st-2xh"
      >{{ howTitle }}</h1>
      <p class="s-p">{{ howOne }}</p>
      <p class="s-2xh">{{ howTwo }}</p>
      <p class="Text-xs text-gray-mid">{{ version }}</p>
    </div>
  </div>
</template>

<script>
// import Modal from '@/components/Modal.vue';

export default {
  components: {},
  props: [],
  data() {
    return {
      thisTitle: 'What is this?',
      thisOne:
          "Corvid Reply helps you reply to your project collaborators by choosing only what's most important in the conversation. It keeps the ball rolling by removing the superfluous and helps you to avoid letting important info fall through the cracks.",
      thisTwo:
          "We also give you custom formatted responses to paste into for your favourite project mangement apps. So it's clear who said what.",
      howTitle: 'How does it work?',
      howOne: 'Click on the line you wish to reply to.',
      howTwo:
          'Tip: select multiple sentences by holding `command` while you click.',
      version: 'Version 0.0.1 2019-10-01',
    };
  },
};
</script>

<style lang="postcss" scoped>
  .Block {
    margin-top: calc(theme(spacing.40) * var(--block-size-ratio));
    margin-bottom: calc(theme(spacing.24) * var(--block-size-ratio));
  }
</style>
