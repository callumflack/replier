<template>
  <div id="app">
    <div id="nav" class="container Block-sm max-w-5xl">
      <router-link to="/">Corvid Writing</router-link>
    </div>
    <vue-page-transition :name="transitionName">
      <router-view/>
    </vue-page-transition>
  </div>
</template>

<script>
export default {
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

<style>
#nav a.router-link-active {
  @apply text-brand-primary;
}
</style>
