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

/**
 * FORMATTERS
 *
 * Defines formatting of replies for export to another app (via pasting)
 * All formatters are expected to include the same base functions
 *   * blockquote - format a blockquote
 */
const GmailFormatter = {
  // Uses text/html
  blockquote(text) {
    return `<blockquote style="margin-left: 0; padding: 15px; background: rgb(238, 238, 238); border-radius: 5px; color: rgb(51, 51, 51); font-family: sans-serif; font-size: 14.4px;">${text}</blockquote>`;
  },
};

const BasecampFormatter = {
  // Uses text/plain
  blockquote(text) {
    return `<blockquote>${text}</blockquote>\n`;
  },
};

const SlackFormatter = {
  // Uses text/plain
  blockquote(text) {
    return `> ${text}\n`;
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
      const repliesText = this.groupedSelections
        .map((selection) => {
          const reply = this.$store.state.replies[selection.id] || '';

          return `${formatter.blockquote(selection.text)}${reply}`;
        })
        .join('\n\n');

      const exportText = [
        // Remove trailing new line displayed in some inputs
        this.$store.state.repliesIntro.trim(),
        repliesText.trim(),
        this.$store.state.repliesOutro.trim(),
      ]
        .filter(section => section && section !== '')
        .join('\n\n')
        // All supported apps supportes new lines formatted as br tags
        // but not all support "\n"
        .replace(/\n/g, '<br />');

      const focused = document.activeElement;
      this.$refs.hiddenContainer.innerHTML = exportText;
      this.$refs.hiddenContainer.focus();

      // Select and copy
      window.getSelection().removeAllRanges();
      const range = document.createRange();
      range.selectNode(this.$refs.hiddenContainer);
      window.getSelection().addRange(range);
      document.execCommand('copy');

      focused.focus();
      this.$refs.popover.close();

      this.$emit('onExport');
    },
    exportGmail() {
      return this.exportReply(GmailFormatter);
    },
    exportBasecamp() {
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
