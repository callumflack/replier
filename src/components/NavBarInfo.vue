<template>
  <div>
    <template v-if="!mobileNavOpen">
      <span
        v-if="!$store.state.timestamp"
        class="Timestamp Text-xs"
      >{{ tip }}</span>
      <span v-else class="Timestamp Text-xs">{{ $store.state.timestamp }}</span>
    </template>
    <!-- info toggle -->
    <button
      class="Info Text-xs"
      ref="infoIcon"
      @click.prevent="toggleMobileNav()"
    >
      <icon v-if="mobileNavOpen" name="close" height="1.75em" width="1.75em"></icon>
      <icon v-else name="info" height="1.5em" width="1.5em"></icon>
    </button>
    <portal to="modals">
      <Modal
        :show="mobileNavOpen"
        @close="mobileNavOpen = false"
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
    mobileNavOpen: false,
    tip: 'Cmd + click selects sentences',
  }),
  methods: {
    toggleMobileNav() {
      this.mobileNavOpen = !this.mobileNavOpen;
    },
  },
  watch: {
    // eslint-disable-next-line
      $route(to, from) {
      if (this.mobileNavOpen) {
        this.$refs.infoIcon.toggle();
      }
      this.mobileNavOpen = false;
    },
  },
};
</script>

<style lang="postcss">
.Timestamp {
  @apply inline-block self-end;
  @apply font-title font-medium;
  @apply text-black;
  transition: opacity 0.5s ease-in;
}
.Info {
  @apply ml-4 cursor-pointer text-black relative;
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
