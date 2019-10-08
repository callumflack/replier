<template>
  <div class="container max-w-3xl Block">
    <div class="container-inset pt-1 text-scope">
      <h1
        class="Subtitle s-p"
      >{{ thisTitle }}</h1>
      <p class="s-p">{{ thisOne }}</p>
      <p class="s-p">{{ thisTwo }}</p>
      <h2
        class="Subtitle s-p st-2xh"
      >{{ howTitle }}</h2>
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
export default {
  components: {},
  props: [],
  data() {
    return {
      thisTitle: 'What is this?',
      /* eslint-disable max-len */
      thisOne:
          "Corvid Reply helps you reply to your project collaborators by choosing only what's most important in the conversation. It removes the superfluous and helps avoid important info falling through the cracks.",
      thisTwo:
          "We also give you custom formatted responses to paste into for your favourite project mangement apps. So it's clear who said what.",
      howTitle: 'How does it work?',
      howOne: 'Click on the line you wish to reply to.',
      howTwo:
          'Select multiple sentences by holding `command` while you click.',
      howThree:
          'Choose to export to Gmail, Slack or Basecamp.',
      version: 'Version 0.0.1 2019-10-01',
      /* eslint-enable max-len */
    };
  },
};
</script>

<style lang="postcss" scoped>
.Block {
  margin-top: calc(theme(spacing.40) * var(--block-size-ratio));
  margin-bottom: calc(theme(spacing.24) * var(--block-size-ratio));
}

/*
  Scoped to css vars under `custom-info-modal.css`
 */
.text-scope h1,
.text-scope h2 {
  color: var(--info-modal-text);
}
.text-scope p,
.text-scope ol {
  color: var(--info-modal-text-light);
}
</style>
