<template>
  <div id="app" class="Site">
    <div class="Site-content">
      <div class="container bg-transparent">
        <MessageBar>
          <span class="font-bold">It's your data, not ours.</span>
          We don't store anything you paste nor type here.
          <span class="Link">Opt out of all tracking.</span>
        </MessageBar>
      </div>
      <div class="container h-full">
        <NavBar></NavBar>
        <transition-page>
          <router-view />
        </transition-page>
      </div>
    </div>
    <portal-target name="modals" multiple></portal-target>
  </div>
</template>

<script>
import MessageBar from '@/components/MessageBar.vue';
import NavBar from '@/components/NavBar.vue';
import TransitionPage from '@/components/TransitionPage.vue';

export default {
  components: {
    MessageBar,
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

<style lang="postcss" scoped>
/* https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/ */
.Site {
  @apply flex flex-col min-h-screen;
  /* @apply flex-1; */
}
.Site-content {
  /* Setting a height of 1px allows children to use height 100%
  to inherit this elements height */
  @apply h-px min-h-screen;
  @apply flex-1;
}
</style>
