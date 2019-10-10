<template>
  <div>
    <div class="ActionButton opacity-100">
      <Popover ref='popover'>
        <template v-slot:trigger>
          <button
            class="Button Button--export font-title z-50"
            tabindex="1000"
          >
            Export
          </button>
        </template>

        <template v-slot:content>
          <h3 class="Meta">Copy formatted for:</h3>
          <button class="Button Button--invisible export-option" @click="exportGmail()">
            <icon name="gmail" height="1.25em" width="1.25em" class="mr-2"></icon>
            Gmail
          </button>
          <button class="Button Button--invisible export-option" @click="exportBasecamp()">
            <icon name="basecamp" height="1.25em" width="1.25em" class="mr-2"></icon>
            Basecamp
          </button>
          <button class="Button Button--invisible export-option" @click="exportSlack()">
            <icon name="slack" height="1.25em" width="1.25em" class="mr-2"></icon>
            Slack
          </button>
        </template>
      </Popover>
    </div>

    <div ref="hiddenContainer" class="Text-reset absolute opacity-0"></div>
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
    // eslint-disable-next-line
    return `<blockquote style="margin: 0px 0px 0px 0.8ex; border-left: 1px solid rgb(204,204,204); padding-left: 1ex; border-radius: 0; background-color: initial;">${text}</blockquote>\n`;
  },
};

const SlackFormatter = {
  // Uses text/plain
  blockquote(text) {
    return `> ${text}\n`;
  },
};

const BasecampFormatter = {
  // Uses text/plain
  blockquote(text) {
    return `<blockquote>${text}</blockquote>\n`;
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
        // All supported apps support new lines formatted as br tags
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
>>> .vue-slick-popover[x-placement^="bottom"] {
  margin-top: 16px;
}
>>> .vue-slick-popover-content__body {
  @apply rounded-lg bg-white;
  /* @apply shadow-xl; */
  box-shadow: 0 0 40px 3px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
  width: 300px;
}
>>> .vue-slick-popover-content__body > * {
  @apply inline-flex items-center justify-start w-full;
  @apply border-b;
  --button-height: 54px;
  --button-border-radius: 0;
  --button-box-shadow-color: transparent;
  border-bottom-color: theme(colors.gray.light);
  height: var(--button-height);
  line-height: 1;
  padding: 0 var(--button-padding-x);
  padding-bottom: calc((1 / 15) * 1em); /* 2 */
}
>>> .vue-slick-popover-content__body > *:last-child {
  @apply border-0;
}

/* >>> .vue-slick-popover__overlay {
  background-color: rgba(166, 101, 1, 0.2);
} */

.export-option {
  @apply font-title font-semibold text-brand-primary;
  transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
}
.export-option:hover {
  background-color: rgba(166, 101, 1, 0.1);
}

.Button--export:hover,
.Button--export:active,
.Button--export:focus {
  --button-invert-color: theme(colors.brand.primary);
  --button-bg-color: var(--button-invert-color);
  --button-bg-color-hover: var(--button-invert-color);
  --button-border-color: var(--button-invert-color);
  --button-box-shadow-color: var(--button-invert-color);
}

.Text-reset,
.Text-reset > *,
.Text-reset >>> > * {
  /* @apply bg-transparent !important; */
  background-color: initial !important;
  color: black;
  font: small/1.5 Arial,Helvetica,sans-serif;
  letter-spacing: normal;
}
</style>
