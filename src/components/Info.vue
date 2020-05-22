<template>
  <div class="container py-w5 mobile:px-0">
    <div class="pb-w3 mx-auto lg:w-5/6">
    <figure class="Aspect">
      <iframe
          width="100%"
          height="100%"
          frameborder="0"
          allow="autoplay"
          :src="
            `https://player.vimeo.com/video/${vimeoId}?playsinline=1&title=0&byline=0&portrait=0&color=000&`
          "
        />
    </figure>
    </div>
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
      vimeoId: "419858766",
      /* eslint-disable max-len */
      copy: `
## What is Replier?

Replier lets you quickly respond to questions buried in a long message by choosing what's important and removing the rest. It helps avoid losing important info to the vortex of chat messages and email chains.

We also give you custom formatted responses to paste into your favourite project management apps, making it [easy for the reader](http://www.idallen.com/topposting.html). So it's clear who said what.

[Here's an article](https://jackywinter.com/homeroom/introducing-replier) about the genesis of the idea and the problems we're trying to solve.

## How does it work?

1. Click on the line you wish to reply to.
2. Join sentences by holding "command" while you click, anywhere across the doc.
3. Hit the reply button and write your replies.
4. Choose to export to Gmail, Slack or Basecamp.


Replier is a work in progress. [We welcome feedback on our public spreadsheet.](https://www.notion.so/callum/139e53429d9f4216a4521a3da10d8e51?v=47af5078446f44e28406cbd14139b69f)

Ps. Replier runs in dark mode automatically based on your OS.

## Your privacy

Let's be clear: if you paste or type anything into Replier, we don't save it. There is no database connected to Replier. We handle the text manipulations that create your reply using application state. So once you refresh or close the browser tab, whatever data you entered is permanently deleted.

We use analytics so we can keep making Replier better. You can opt out of analytics tracking using the message bar that appears when you load Replier.

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

/* ASPECT */
.Aspect {
  @apply relative overflow-hidden m-0 w-full bg-transparent;
}
.Aspect:before {
  @apply block;
  content: "";
  padding-bottom: calc(100% * 1);
}
.Aspect > * {
  @apply absolute inset-0 h-full w-full;
  /* @apply object-cover; */
}
.Aspect > video {
  @apply object-cover;
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
