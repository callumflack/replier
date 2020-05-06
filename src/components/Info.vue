<template>
  <div class="container py-w5 px-inset">
    <vue-markdown
      class="Markdown Link-block"
      :anchor-attributes="anchorAttributes"
      :source="copy"
    ></vue-markdown>
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
      /* https://github.com/miaolz123/vue-markdown/issues/36 */
      /* also: https://github.com/miaolz123/vue-markdown/issues/74 */
      anchorAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer nofollow'
      },
      /* eslint-disable max-len */
      copy: `
## What is Replier?

Replier helps you reply to friends, clients, colleagues and collaborators by choosing only what's important in the conversation.

It removes the superfluous, creates focus and helps you avoid losing important information to the vortex of chat messages and email chains.

We also give you custom formatted responses to paste into your favourite project management apps. So it's clear who said what.

## How does it work?

1. Click on the line you wish to reply to.
2. Join sentences by holding "command" while you click, anywhere across the doc.
3. Hit the reply button and write your replies.
4. Choose to export to Gmail, Slack or Basecamp.

Replier is a work in progress. We welcome feedback! [Email us with bugs, ideas, etc.](mailto:callum@callumflack.design)

## Your privacy

We don't like using apps that aren't clear about how they use input data. So let's be clear: if you paste or type anything into Replier, we don't save it. There is no database connected to Replier. We handle the text manipulations that create your reply using application state. So once you refresh or close the browser tab, whatever data you entered is permanently deleted.

We also use analytics to see how people are using Replier so we can keep making it better. You can opt out of analytics tracking using the message bar link that appears when you load Replier.

## Who made it?

[Jeremy](https://jackywinter.com), [Callum](https://callumflack.design) &amp; [Barry](https://barryph.com/blog/).

<small>Version 0.0.2 2020-05-06</small>`
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
