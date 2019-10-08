<template>
  <div id="nav" class="container max-w-3xl Block-md-t Block-sm-b">
    <nav class="Nav flex justify-between">
      <router-link
        to="/"
        class="Title"
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
      return this.$route.name === 'home' ? 'Corvid Reply' : 'Revise selection';
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
  @apply w-full border-b-2 border-black pb-4;
}
</style>
