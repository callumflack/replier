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
        ref="passwordInput"
        v-model="formData.password"
        @input="passwordChange"
        class="Input Input--bordered mb-4"
        type="password"
        name="password"
        pattern=".{8,}"
        title="Must be at least 8 characters"
        required
      />
      <label for="confirmPassword">Confirm Password:</label>
      <input
        v-model="formData.confirmPassword"
        @input="passwordChange"
        class="Input Input--bordered mb-4"
        type="password"
        name="confirmPassword"
        required
      />
      <div class="mt-4 flex flex-col justify-between items-center text-center">
        <button
          :disabled="submitting"
          class="Auth-Form__Button Button Button--lg Button--full"
          type="submit"
        >Register</button>
        <router-link to="/login" class="Auth-Form__Links">Already have an account?</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'page-register',
  data() {
    return {
      error: null,
      submitting: false,
      formData: {
        email: null,
        password: null,
        confirmPassword: null,
      },
    };
  },
  methods: {
    passwordChange() {
      // Set input as valid
      this.$refs.passwordInput.setCustomValidity('');
    },
    async handleSubmit() {
      this.error = null;

      if (this.formData.password !== this.formData.confirmPassword) {
        this.$refs.passwordInput.setCustomValidity('Passwords don\'t match');
        return;
      }

      this.submitting = true;
      const response = await this.$store.dispatch('registerUser', this.formData);

      if (response.error) {
        this.error = response.error;
        this.submitting = false;
        return;
      }

      // Redirect to /
      this.$router.push('/');
    },
  },
};
</script>
