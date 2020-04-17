<template>
  <div class="container bg-transparent pt-w8">
    <div class="px-inset">
      <vue-markdown class="Markdown" :source="copy"></vue-markdown>
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
      copy: `
## What is Write?

Corvid Write helps you reply to your friends, clients, colleagues and collaborators by choosing only what's most important in the conversation. It removes the superfluous and helps you to avoid losing important info to the vortex of chat messages and email chains.

We also give you custom formatted responses to paste into for your favourite project management apps. So it's clear who said what.

## How does it work?

1. Click on the line you wish to reply to.
2. Select multiple sentences by holding "command" while you click.
3. Hit the reply button and write your replies.
4. Choose to export to Gmail, Slack or Basecamp.

## Who made it?

Jeremy, Callum &amp; Barry.

<small>Version 0.0.1 2019-10-01</small>`
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
.Markdown >>> h1,
.Markdown >>> h2 {
  color: var(--info-modal-text);
}
.Markdown >>> p,
.Markdown >>> ol {
  color: var(--info-modal-text-light);
}
.Markdown >>> small {
  @apply opacity-50;
}
</style>
