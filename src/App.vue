<template>
  <div id="app" class="Site">
    <div class="Site-content">
      <!-- MESSAGES -->
      <Messages :class="{ 'invisible': showInfoDialog }"></Messages>

      <!-- WRITE CONTAINER -->
      <div
        class="container h-full"
        :class="`${ showInfoDialog ? 'bg-scheme-bg-html' : 'bg-scheme-bg'}`"
      >
        <NavBar></NavBar>
        <transition type="transition" name="dialog">
          <div class="relative" v-show="showInfoDialog">
            <Info key="1" class="absolute w-full"></Info>
          </div>
        </transition>

        <!-- APP -->
        <transition-page>
          <router-view :class="{ 'hidden': showInfoDialog }"></router-view>
        </transition-page>
      </div>
    </div>

    <!-- MODALS -->
    <portal-target name="modals" multiple></portal-target>
  </div>
</template>

<script>
import Info from '@/components/Info';
import Messages from '@/components/Messages.vue';
import NavBar from '@/components/NavBar.vue';
import TransitionPage from '@/components/TransitionPage.vue';

export default {
  components: {
    Info,
    Messages,
    NavBar,
    TransitionPage,
  },
  computed: {
    showInfoDialog() {
      return this.$store.state.showInfoDialog;
    },
  },
  // head: {
  //   script: [
  //     { src: "https://js.stripe.com/v3/" } // Used for the donation button
  //   ]
  // }
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

/* TRANSITION */
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 750ms theme(bezier.thisalso);
}
.dialog-enter,
.dialog-leave-to {
  @apply opacity-0;
  /* transform: scale(1.05); */
}
</style>
