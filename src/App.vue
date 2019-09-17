<template>
  <div id="app">
    <!-- <nav id="nav" class="container max-w-3xl Block-md-t Block-sm-b">
      <router-link to="/" class="font-title">Corvid Writing</router-link>
    </nav> -->
    <NavBar></NavBar>
    <vue-page-transition :name="transitionName">
      <router-view />
    </vue-page-transition>
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
