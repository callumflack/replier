<template>
  <div>
    <span v-if="!showDialog" class="Timestamp Text-xs font-title font-medium mr-2">
      {{ $store.state.timestamp }}
    </span>
    <!-- if modal is active, donate button -->
    <!-- <template v-if="showDialog">
      <DonationButton class="Button--sm Text-xs mr-3"></DonationButton>
    </template> -->
    <!-- info toggle -->
    <button
      class="Info-button Text-xs font-title font-medium"
      ref="infoIcon"
      @click.prevent="active"
    >
      <template v-if="!showDialog">
        <span v-if="!$store.state.timestamp" class="inline-block mr-2">
          <!-- Cmd + click selects sentences -->
          What is Write?
        </span>
      </template>
      <!-- icons -->
      <icon v-if="showDialog" name="close" height="1.75em" width="1.75em"></icon>
      <icon v-else name="info" height="1.75em" width="1.75em"></icon>
    </button>
    <!-- <portal to="modals">
      <Modal
        :show="showDialog"
        @close="showDialog = false"
        info
      >
        <Info></Info>
      </Modal>
    </portal> -->
  </div>
</template>

<script>
// import DonationButton from "@/components/DonationButton";
// import Info from '@/components/Info';
// import Modal from '@/components/Modal';

export default {
  components: {
    // DonationButton,
    // Info,
    // Modal,
  },
  data: () => ({
    showDialog: false,
  }),
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      this.showDialog = false;
    },
  },
  methods: {
    active() {
      this.showDialog = !this.showDialog;
      this.$emit('active');
    }
  }
};
</script>

<style lang="postcss">
.Timestamp {
  @apply inline-block self-end;
  transition: opacity 0.5s ease-in;
}
.Info-button {
  @apply cursor-pointer relative;
  transition: opacity 0.5s ease-in;
  z-index: 101;
}
.Info-button:hover {
  /* @apply text-brand-primary; */
}
.Info-button:focus {
  @apply outline-none;
}
</style>
