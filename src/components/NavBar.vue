<template>
  <div id="nav" class="container max-w-3xl Block-md-t Block-sm-b">
    <nav class="Nav flex justify-between">
      <router-link
        to="/"
        class="Text-xl font-title font-bold text-brand-primary"
      >
        <icon v-if="$route.name !== 'home'" name="arrow-back" class="mr-1" />
        <span>{{ homeLabel }}</span>
      </router-link>
      <NavBarInfo class="mt-px"></NavBarInfo>
    </nav>
  </div>
</template>

<script>
import NavBarInfo from '@/components/NavBarInfo.vue';

export default {
  components: {
    NavBarInfo,
  },
  computed: {
    homeLabel() {
      return this.$route.name === 'home' ? 'Corvid Writing' : 'Revise selection';
    },
  },
};
</script>

<style lang="postcss">
  #nav {
    @apply relative;
    z-index: 100;
  }

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
