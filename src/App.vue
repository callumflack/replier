<template>
  <div id="app">
    <NavBar></NavBar>
    <transition-page>
      <component :is="layout">
        <router-view/>
      </component>
    </transition-page>
    <portal-target name="modals" multiple></portal-target>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TransitionPage from '@/components/TransitionPage.vue';
import LayoutDefault from './components/Layouts/Default';
import LayoutAuth from './components/Layouts/Auth';

export default {
  components: {
    NavBar,
    TransitionPage,
    LayoutDefault,
    LayoutAuth,
  },
  computed: {
    layout() {
      return `layout-${(this.$route.meta.layout || 'default')}`;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logoutUser');

      if (this.$route.name !== 'login') {
        this.$router.push({ name: 'login' });
      }
    },
  },
};
</script>

<style lang="postcss">
.vue-slick-popover__overlay {
  /* Stop overlay creating horizontal scroll from "width: 100vw" */
  @apply h-auto w-auto bottom-0 right-0;
}

#app {
  @apply flex flex-col;
  min-height: 100vh;
}
</style>
