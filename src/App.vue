<template>
  <div id="app">
    <NavBar></NavBar>
    <transition-page>
      <router-view />
    </transition-page>
    <portal-target name="modals" multiple></portal-target>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TransitionPage from '@/components/TransitionPage.vue';

export default {
  components: {
    NavBar,
    TransitionPage,
  },
};
</script>

<style lang="postcss">
.vue-slick-popover__overlay {
  /* Stop overlay creating horizontal scroll from "width: 100vw" */
  @apply h-auto w-auto bottom-0 right-0;
}
</style>
