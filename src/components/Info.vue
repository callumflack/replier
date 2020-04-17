<template>
  <div class="container bg-transparent Block">
    <div class="px-inset pt-1 text-scope">
      <h1 class="Subtitle s-p">
        {{ what.title }}
      </h1>
      <p class="s-p">{{ what.one }}</p>
      <p class="s-p">{{ what.two }}</p>
      <h2 class="Subtitle s-p st-2xh">
        {{ how.title }}
      </h2>
      <ol>
        <li class="s-p">{{ how.one }}</li>
        <li class="s-p">{{ how.two }}</li>
        <li class="s-p">{{ how.three }}</li>
        <li class="s-2xh">{{ how.four }}</li>
      </ol>
      <p class="Text-xs text-gray-mid">{{ version }}</p>
      <vue-markdown># this is the default slot</vue-markdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  components: {
    VueMarkdown,
  },
  data() {
    return {
      /* eslint-disable max-len */
      what: {
        title: 'What is this?',
        one:
          "Corvid Write helps you reply to your friends, clients, colleagues and collaborators by choosing only what's most important in the conversation. It removes the superfluous and helps you to avoid losing important info to the vortex of chat messages and email chains.",
        two:
          "We also give you custom formatted responses to paste into for your favourite project management apps. So it's clear who said what.",
      },
      how: {
        title: 'How does it work?',
        one: 'Click on the line you wish to reply to.',
        two: 'Select multiple sentences by holding `command` while you click.',
        three: 'Hit the reply button and write your replies.',
        four: 'Choose to export to Gmail, Slack or Basecamp.',
      },
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
