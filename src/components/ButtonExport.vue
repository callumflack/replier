<template>
  <div>
    <div class="ActionButton">
      <Popover ref='popover'>
        <template v-slot:trigger>
          <button
            class="Button font-title"
          >
            Export
          </button>
        </template>

        <template v-slot:content>
          <h3 class="popover-headline">Copy to share:</h3>
          <button class="export-option" @click="exportGmail()">Format for Gmail</button>
          <button class="export-option" @click="exportBasecamp()">Format for Basecamp</button>
          <button class="export-option" @click="exportSlack()">Format for Slack</button>
        </template>
      </Popover>
    </div>

    <div ref="hiddenContainer" class="absolute opacity-0"></div>
  </div>
</template>

<script>
import Popover from '@/components/Popover.vue';

const GmailFormatter = {
  // Uses text/html
  blockquote(text) {
    return `<blockquote style="margin-left: 0; padding: 15px; background: rgb(238, 238, 238); border-radius: 5px; color: rgb(51, 51, 51); font-family: sans-serif; font-size: 14.4px;">${text}</blockquote>`;
  },
  final(text) {
    return text.replace(/\n/g, '<br />');
  },
};

const BasecampFormatter = {
  // Uses text/plain
  blockquote(text) {
    return `> ${text}\n`;
  },
  final(text) {
    return text.replace(/\n/g, '<br />');
  },
};

const SlackFormatter = {
  // Uses text/plain
  blockquote(text) {
    return `> ${text}\n`;
  },
  final(text) {
    return text.replace(/\n/g, '<br />');
  },
};

export default {
  name: 'button-export',
  components: {
    Popover,
  },
  props: {
    groupedSelections: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isPopoverVisible: false,
    };
  },
  methods: {
    async exportReply(formatter) {
      // Copy exported contents to clipboard
      // Display UI feedback
      const exportText = this.groupedSelections
        .map((selection) => {
          const reply = this.$store.state.replies[selection.id] || '';
          const intro = reply.intro ? `${reply.intro}\n` : '';
          const outro = reply.outro ? `${reply.outro}\n` : '';

          return `${formatter.blockquote(selection.text)}${intro}${outro}`;
        })
        .join('\n\n')
        // Remove trailing new line displayed in some inputs
        .trim();

      const focused = document.activeElement;
      this.$refs.hiddenContainer.innerHTML = formatter.final(exportText);
      this.$refs.hiddenContainer.focus();

      // Select and copy
      window.getSelection().removeAllRanges();
      const range = document.createRange();
      range.selectNode(this.$refs.hiddenContainer);
      window.getSelection().addRange(range);
      document.execCommand('copy');

      focused.focus();
      this.$refs.popover.close();
    },
    exportGmail() {
      return this.exportReply(GmailFormatter);
    },
    exportBaseCamp() {
      return this.exportReply(BasecampFormatter);
    },
    exportSlack() {
      return this.exportReply(SlackFormatter);
    },
  },
};
</script>

<style lang="postcss" scoped>
>>> .vue-slick-popover-content__body {
  width: 300px;
}

.vue-slick-popover-content__body > * {
  @apply block py-4 px-8 w-full text-left border-b;
}

.popover-headline {
  @apply text-brand-primary font-bold uppercase;
}
</style>
