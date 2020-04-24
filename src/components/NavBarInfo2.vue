<template>
  <div>
    <span v-if="!showDialog" class="Timestamp Text-xs font-title font-medium mr-2">
      {{ $store.state.timestamp }}
    </span>
    <button
      class="Info-button Text-xs font-title font-medium"
      :class="{ 'text-brand-primary': showDialog }"
      ref="infoIcon"
      @click.prevent="active"
    >
      <template v-if="!showDialog">
        <span v-if="!$store.state.timestamp" class="inline-block mr-2">
          What is Write?
        </span>
      </template>
      <!-- icons -->
      <icon v-if="showDialog" name="close" height="1.75em" width="1.75em"></icon>
      <icon v-else name="info" height="1.75em" width="1.75em"></icon>
    </button>
  </div>
</template>

<script>
export default {
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      this.$store.commit("setInfoDialogState", false);
    },
  },
  computed: {
    showDialog() {
      return this.$store.state.showInfoDialog;
    },
  },
  methods: {
    active() {
      this.$store.commit("setInfoDialogState", !this.$store.state.showInfoDialog);
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
