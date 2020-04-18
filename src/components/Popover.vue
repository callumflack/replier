<template>
  <div>
    <!-- Wrap in span to handle click event -->
    <span class="block" ref="popoverReference" @click="toggle()">
      <slot name="trigger" />
    </span>

    <VueSlickPopover
      v-if="isVisible"
      :popover-options="options"
      @closePopover="close"
    >
      <VueSlickPopoverContent>
        <slot name="content" />
      </VueSlickPopoverContent>
    </VueSlickPopover>
  </div>
</template>
<script>
/*
 * POPOVER
 *
 * Helper component. Automatically handles vue-slick-popover setup and toggling
 * on trigger click
 *
 * To close the popover add a ref to this component and call ref.close()
 * `
 *   <Popover ref="myPopover">
 *   ...
 *   this.$refs.myPopover.close()
 * `
*/
import { VueSlickPopover, VueSlickPopoverContent } from 'vue-slick-popover';
import 'vue-slick-popover/dist/vue-slick-popover.css';

export default {
  components: {
    VueSlickPopover,
    VueSlickPopoverContent,
  },
  data() {
    return {
      isVisible: false,
      options: {
        animation: 'fade',
        popoverReference: null,
        placement: 'bottom',
        offset: '0,0',
      },
    };
  },
  methods: {
    toggle() {
      this.isVisible = !this.isVisible;
    },
    close() {
      this.isVisible = false;
    },
  },
  mounted() {
    this.options.popoverReference = this.$refs.popoverReference;
  },
};
</script>
