<template>
  <div class="container max-w-3xl Block">
    <div class="px-6 pt-2">
      <h1
        class="Text-lg font-title font-bold text-brand-primary s-p"
      >{{ thisTitle }}</h1>
      <p class="s-p">{{ thisOne }}</p>
      <!-- <p class="s-p">{{ thisTwo }}</p> -->
      <p class="s-p">{{ thisThree }}</p>
      <h1
        class="Text-lg font-title font-bold text-brand-primary s-p st-2xh"
      >{{ howTitle }}</h1>
      <ol>
        <li class="s-p">{{ howOne }}</li>
        <li class="s-p">{{ howTwo }}</li>
        <li class="s-2xh">{{ howThree }}</li>
      </ol>
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
          "Corvid Reply helps you reply to your project collaborators by choosing only what's most important in the conversation. It removes the superfluous and helps avoid important info falling through the cracks.",
      thisTwo:
          'It removes the superfluous and helps avoid important info falling through the cracks.',
      thisThree:
          "We also give you custom formatted responses to paste into for your favourite project mangement apps. So it's clear who said what.",
      howTitle: 'How does it work?',
      howOne: 'Click on the line you wish to reply to.',
      howTwo:
          'Select multiple sentences by holding `command` while you click.',
      howThree:
          'Choose to export to Gmail, Slack or Basecamp.',
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
