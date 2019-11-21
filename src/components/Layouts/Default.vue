<template>
  <div v-if="loaded">
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
    };
  },
  async beforeCreate() {
    // Redirect to login page if user isn't authed
    const user = await this.$store.dispatch('getUser');

    if (!user) {
      this.$router.push('/login');
      return;
    }

    this.loaded = true;
  },
};
</script>
