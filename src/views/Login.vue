<template>
  <div class="container Block-sm max-w-xl">
    <form class="Auth-Form" @submit.prevent="handleSubmit">
      <div v-if="error" class="error">{{ error }}</div>
      <label for="email">Email:</label>
      <input
        v-model="formData.email"
        class="Input Input--bordered mb-4"
        type="email"
        name="email"
        placeholder="john@mail.com"
        required
      />
      <label for="password">Password:</label>
      <input
        v-model="formData.password"
        class="Input Input--bordered mb-4"
        type="password"
        name="password"
        pattern=".{8,}"
        title="Must be at least 8 characters"
        required
      />
      <div class="mt-4 flex flex-col justify-between items-center">
        <button
          :disabled="submitting"
          class="Auth-Form__Button Button Button--lg Button--full"
          type="submit"
        >Login</button>
        <router-link to="/register" class="Auth-Form__Links">Don't have an account?</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'page-login',
  data() {
    return {
      error: null,
      submitting: false,
      formData: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async handleSubmit() {
      this.error = null;
      this.submitting = true;
      const response = await this.$store.dispatch('loginUser', this.formData);

      if (response.error) {
        this.error = response.error.message;
        this.submitting = false;
        return;
      }

      // Redirect to /
      this.$router.push('/');
    },
  },
};
</script>
