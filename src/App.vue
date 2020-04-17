<template>
  <div id="app" class="Site">
    <div class="Site-content container bg-white">
      <MessageBar>
        <span class="font-bold">It's your data, not ours.</span>
        We don't store anything you paste nor type here.
        <span class="Link">Opt out of all tracking.</span>
      </MessageBar>
      <NavBar></NavBar>
      <transition-page>
        <router-view />
      </transition-page>
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
  @apply flex-1;
  /* margin-top: var(--message-bar-height); */
}
</style>
