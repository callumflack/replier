<template>
  <div id="nav" class="container max-w-3xl Block-md-t Block-sm-b">
    <nav class="Nav flex justify-between">
      <router-link to="/" class="Text-xl font-title font-bold text-brand-primary">
        <icon v-if="$route.name !== 'home'" name="arrow-back" class="mr-1" />{{ homeLabel }}
      </router-link>
      <!-- <span :class="{ 'text-transparent': !timestamp }" class="Timestamp"> -->
      <span class="Timestamp Text-xs ml-4">
        {{ $store.state.timestamp }}
      </span>
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
</style>
