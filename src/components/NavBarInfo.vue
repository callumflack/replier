<template>
  <div>
    <template v-if="!mobileNavOpen">
      <span
        v-if="!$store.state.timestamp"
        class="Timestamp Text-xs text-brand-primary"
      >{{ tip }}</span>
      <span v-else class="Timestamp Text-xs">{{ $store.state.timestamp }}</span>
    </template>
    <!-- info toggle -->
    <span
      class="Info Text-xs text-brand-primary"
      ref="infoIcon"
      @click.prevent="toggleMobileNav()"
    >
      <icon v-if="mobileNavOpen" name="close" height="1.75em" width="1.75em"></icon>
      <icon v-else name="info" height="1.25em" width="1.25em"></icon>
    </span>
    <portal to="modals">
      <Modal :show="mobileNavOpen" @close="mobileNavOpen = false">
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
.Info {
  @apply ml-4 text-gray-mid cursor-pointer;
  @apply relative;
  transition: opacity 0.5s ease-in;
  z-index: 101;
}
.Info:hover {
  @apply text-brand-primary;
}
.Info svg {
  /* height: 1.25em !important; */
  /* width: 1.25em !important; */
}
</style>
