<template>
  <div id="app">
    <div id="nav" class="container Block-sm max-w-5xl">
      <router-link to="/">Writing-App</router-link>
      <div v-if="$store.state.auth.user">
        <a href="#" @click.prevent="logout">Logout</a>
      </div>
      <div v-else-if="$store.state.auth.user === null">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </div>
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import LayoutDefault from './components/Layouts/Default';
import LayoutAuth from './components/Layouts/Auth';

export default {
  components: {
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

<style>
#nav {
  @apply flex justify-between;
  position: relative;
  z-index: 10;
}

#nav a:not(:last-child) {
  @apply mr-10;
}

#nav a.router-link-exact-active {
  @apply text-brand-primary;
}

#app {
  @apply flex flex-col;
  min-height: 100vh;
}

.body {

}
</style>
