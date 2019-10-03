<template>
  <div id="app">
    <NavBar></NavBar>
    <vue-page-transition :name="transitionName">
      <router-view />
    </vue-page-transition>
    <portal-target name="modals" multiple></portal-target>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      // Default for home page which doesn't trigger $route watcher
      transitionName: 'fade-in-right',
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').filter(s => s.length).length;
      const fromDepth = from.path.split('/').filter(s => s.length).length;
      this.transitionName = toDepth < fromDepth ? 'fade-in-right' : 'fade-in-left';
    },
  },
};
</script>

<style lang="postcss">
  .fade-in-right .fade-in-right-enter-active,
  .fade-in-right .fade-in-right-leave-active,
  .fade-in-left .fade-in-left-enter-active,
  .fade-in-left .fade-in-left-leave-active {
    /* transition: all 10s ease !important; */
  }
</style>
