<template>
  <div id="nav" class="container max-w-3xl Block-md-t Block-sm-b">
    <nav class="Nav flex justify-between">
      <template v-if="$store.state.auth.user">
        <router-link
          to="/"
          class="Title relative w-1/3"
        >
          <span :class="{ home: $route.name === 'home' }">Corvid Reply</span>
          <span :class="{ reply: $route.name !== 'home' }">
            <icon name="arrow-back" class="mr-1" />
            <span>Revise selection</span>
          </span>
        </router-link>
        <div class="flex">
          <NavBarInfo class="mt-px nav__item"></NavBarInfo>
          <router-link to="/settings">Settings</router-link>
          <a href="#" @click.prevent="logout">Logout</a>
        </div>
      </template>
      <template v-else-if="$store.state.auth.user === null">
        <div />
        <div>
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </div>
      </template>
    </nav>
  </div>
</template>

<script>
import NavBarInfo from '@/components/NavBarInfo.vue';

export default {
  components: {
    NavBarInfo,
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logoutUser');
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="postcss">
#nav {
  @apply flex justify-between;
}

#nav a:not(:last-child),
#nav .nav__item:not(:last-child) {
  @apply mr-10;
}

#nav {
  @apply relative;
  z-index: 100;
}
.Nav {
  @apply w-full border-b-2 border-black pb-4;
}

.Title > span {
  @apply absolute left-0 opacity-0 inline-block;
  transition:
    opacity 200ms cubic-bezier(0.19, 1, 0.22, 1),
    transform 750ms cubic-bezier(0.19, 1, 0.22, 1);
  transform: translateX(-5%);
}
.Title span.home,
.Title span.reply {
  @apply opacity-100;
  transform: translateX(0);
}
</style>
