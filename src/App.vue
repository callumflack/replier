<template>
  <div id="app" class="Site">
    <div class="Site-content">
      <!-- MESSAGES -->
      <Messages :class="{ 'invisible': showInfoDialog }"></Messages>

      <!-- WRITE CONTAINER -->
      <div
        class="container min-h-full pb-w8 relative"
        :class="`${ showInfoDialog ? 'bg-scheme-bg-html' : 'bg-scheme-bg'}`"
      >
        <Notification
          v-if="$store.state.timestamp && $route.name !== 'reply'"
          :class="{
            'opacity-0': $store.state.selections.length > 2,
            'hidden': showInfoDialog
          }"
        >
          <template v-if="$store.state.selections.length === 0">
            Click to select a sentence
          </template>
          <template v-if="$store.state.selections.length > 0">
            Hold command to click multiple sentences
          </template>
          <!-- <template v-if="$store.state.selections.length === 3">
            Nice!
          </template> -->
        </Notification>

        <!-- NAV + INFO -->
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

    <!-- MODALS (currently unused) -->
    <portal-target name="modals" multiple></portal-target>
  </div>
</template>

<script>
  import Info from "@/components/Info";
  import Messages from "@/components/Messages.vue";
  import NavBar from "@/components/NavBar.vue";
  import Notification from "@/components/Notification.vue";
  import TransitionPage from "@/components/TransitionPage.vue";

  export default {
    components: {
      Info,
      Messages,
      NavBar,
      Notification,
      TransitionPage
    },
    computed: {
      showInfoDialog() {
        return this.$store.state.showInfoDialog;
      }
    }
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
