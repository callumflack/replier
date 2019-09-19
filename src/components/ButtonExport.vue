<template>
  <div>
    <div class="ActionButton">
      <button
        ref="popoverReference"
        class="Button font-title"
        @click="togglePopover()"
      >
        Export
      </button>
    </div>

    <VueSlickPopover
      v-if="isPopoverVisible"
      :popover-options="popoverOptions"
      @closePopover="closePopover"
    >
      <VueSlickPopoverContent>
        <h3 class="export-headline">Copy to share:</h3>
        <button class="export-option" @click="exportGmail()">Format for Gmail</button>
        <button class="export-option" @click="exportBasecamp()">Format for Basecamp</button>
        <button class="export-option" @click="exportSlack()">Format for Slack</button>
      </VueSlickPopoverContent>
    </VueSlickPopover>

    <div ref="hiddenInput" class="absolute opacity-0"></div>
  </div>
</template>

<script>
import { VueSlickPopover, VueSlickPopoverContent } from 'vue-slick-popover';
import 'vue-slick-popover/dist/vue-slick-popover.css';

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
    VueSlickPopover,
    VueSlickPopoverContent,
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
      popoverOptions: {
        animation: 'scale-fade',
        popoverReference: null,
        placement: 'bottom',
        offset: '0,0',
      },
    };
  },
  /* head() {
    return {
      htmlAttrs: {
        class: `page${this.currentPageClass}`,
      },
    };
  }, */
  methods: {
    togglePopover() {
      this.isPopoverVisible = !this.isPopoverVisible;
    },
    closePopover() {
      this.isPopoverVisible = false;
    },
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
      this.$refs.hiddenInput.innerHTML = formatter.final(exportText);
      this.$refs.hiddenInput.focus();

      // Select and copy
      window.getSelection().removeAllRanges();
      const range = document.createRange();
      range.selectNode(this.$refs.hiddenInput);
      window.getSelection().addRange(range);
      document.execCommand('copy');

      focused.focus();
      this.isPopoverVisible = false;
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
  mounted() {
    this.popoverOptions.popoverReference = this.$refs.popoverReference;
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

.export-headline {
  @apply text-brand-primary font-bold uppercase;
}
</style>
