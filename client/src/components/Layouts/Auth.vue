<template>
  <div v-if="loaded" class="body">
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
  async created() {
    // Redirect to index page if user is already authed
    const user = await this.$store.dispatch('getUser');

    if (user) {
      this.$router.push('/');
      return;
    }

    this.loaded = true;
  },
};
</script>

<style scoped>
.body {
  @apply flex justify-center;
  align-items: center;
  flex-grow: 1;

  /* Offset to appear centered */
  margin-top: -10%;
}

/**
 * Auth forms
 */
.body >>> .Auth-Form {
  box-shadow: 0 0 3px 1px #eaeaea;
  @apply px-10;
  @apply py-8;
}

.body >>> .Auth-Form .error {
  @apply mb-5 text-form-bad;
}

.body >>> .Auth-Form label {
  @apply pb-1 inline-block text-lg;
}

.body >>> .Auth-Form__Buttons {
  @apply mt-4 flex flex-col justify-between items-center;
}

.body >>> .Auth-Form__Button {
  @apply font-bold text-xl;
}
</style>
