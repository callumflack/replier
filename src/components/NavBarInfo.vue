<template>
  <div>
    <span v-if="!showDialog" class="Timestamp Text-xs font-title font-medium mr-2">
      {{ $store.state.timestamp }}
    </span>
    <!-- info toggle -->
    <button
      class="Info Text-xs font-title font-medium"
      ref="infoIcon"
      @click.prevent="showDialog = !showDialog"
    >
      <template v-if="!showDialog">
        <span v-if="!$store.state.timestamp" class="inline-block mr-2">
          <!-- Cmd + click selects sentences -->
          What is Write?
        </span>
      </template>
      <icon v-if="showDialog" name="close" height="1.75em" width="1.75em"></icon>
      <icon v-else name="info" height="1.75em" width="1.75em"></icon>
    </button>
    <portal to="modals">
      <Modal
        :show="showDialog"
        @close="showDialog = false"
        info=true
        class="info-modal"
      >
        <Info></Info>
      </Modal>
    </portal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import Info from '@/components/Info.vue';

export default {
  components: {
    Modal,
    Info,
  },
  data: () => ({
    showDialog: false,
  }),
  watch: {
      // eslint-disable-next-line
      $route(to, from) {
      if (this.showDialog) {
        this.$refs.infoIcon.toggle();
      }
      this.showDialog = false;
    },
  },
};
</script>

<style lang="postcss">
.Timestamp {
  @apply inline-block self-end;
  transition: opacity 0.5s ease-in;
}
.Info {
  @apply cursor-pointer text-black relative;
  transition: opacity 0.5s ease-in;
  z-index: 101;
}
.Info:hover {
  /* @apply text-brand-primary; */
}
.Info:focus {
  @apply outline-none;
}
</style>
