<template>
  <div id="nav" class="container max-w-3xl Block-md-t Block-sm-b">
    <nav class="Nav flex justify-between">
      <router-link to="/" class="Text-xl font-title font-bold text-brand-primary">
        <icon v-if="$route.name !== 'home'" name="arrow-back" class="mr-1" />{{ homeLabel }}
      </router-link>
      <div class="mt-px">
        <span v-if="!$store.state.timestamp" class="Timestamp Text-xs text-brand-primary">
          Click + cmd selects sentences
        </span>
        <span v-else class="Timestamp Text-xs">
          {{ $store.state.timestamp }}
        </span>
        <span class="Info Text-xs text-brand-primary">
          <icon name="info"></icon>
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    homeLabel() {
      return this.$route.name === 'home' ? 'Corvid Writing' : 'Corral mode';
    },
  },
};
</script>

<style lang="postcss">
.Nav {
  @apply w-full border-b-2 border-brand-primary pb-4;
}

.Timestamp {
  @apply inline-block self-end;
  @apply font-title font-medium;
  @apply text-gray-mid;
  /* @apply text-brand-primary; */
  transition: opacity 0.5s ease-in;
}

.Info {
  @apply ml-4 text-gray-mid cursor-pointer;
  transition: opacity 0.5s ease-in;
}
.Info:hover {
  @apply text-brand-primary;
}
.Info svg {
  height: 1.25em !important;
  width: 1.25em !important;
}
</style>
