<template>
  <div class="container py-w5 px-inset">
    <vue-markdown class="Markdown Link-block" :source="copy"></vue-markdown>
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
## What is Replier?

Replier helps you reply to friends, clients, colleagues and collaborators by choosing only what's important in the conversation.

It removes the superfluous, creates focus and helps you avoid losing important information to the vortex of chat messages and email chains.

We also give you custom formatted responses to paste into your favourite project management apps. So it's clear who said what.

## How does it work?

1. Click on the line you wish to reply to.
2. Select multiple sentences by holding "command" while you click.
3. Hit the reply button and write your replies.
4. Choose to export to Gmail, Slack or Basecamp.

## Who made it?

[Jeremy](https://jackywinter.com), [Callum](https://callumflack.design) &amp; [Barry](https://barryph.com/blog/).

<small>Version 0.0.2 2020-04-18</small>`
      /* eslint-enable max-len */
    };
  },
};
</script>

<style lang="postcss" scoped>
/* presumed to be within the info modal */
.Markdown >>> h1,
.Markdown >>> h2 {
  @apply text-scheme-text;
}
.Markdown >>> p,
.Markdown >>> ol {
  @apply text-scheme-text-gray;
}
.Markdown >>> small {
  @apply opacity-50;
}
</style>

<style lang="postcss">
/* MODAL POSITIONS */
.info-block {
  padding-top: var(--info-block-position);
}
/* avoid any padding-top transitions */
.messagebar-is-active .info-block {
  transform: translateY(var(--messagebar-height));
}
</style>
