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

      <div class="Form__field">
        <label for="card-name" class="block mb-2">
          Fullname On Card
        </label>
        <input id="card-name" class="Input Input--bordered" v-model="formData.cardName" required />
      </div>

      <div class="Form__field">
        <StripeElements ref="stripeElements" />
      </div>

      <div class="mt-4 flex flex-col justify-between items-center text-center">
        <button
          :disabled="loading"
          class="Auth-Form__Button Button Button--lg Button--full"
          type="submit"
        >Register</button>
        <router-link to="/login" class="Auth-Form__Links">Already have an account?</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import StripeElements from '@/components/StripeElements.vue';

export default {
  name: 'page-register',
  components: {
    StripeElements,
  },
  data() {
    return {
      error: null,
      loading: false,
      formData: {
        email: null,
        password: null,
        confirmPassword: null,
        cardName: null,
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

      this.loading = true;

      const { stripe, card } = this.$refs.stripeElements;
      const tokenResult = await stripe.createToken(card, { name: this.formData.cardName });

      if (tokenResult.error) {
        // Inform the user if there was an error.
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = tokenResult.error.message;
        this.loading = false;
        return;
      }

      console.log(tokenResult);
      const response = await this.$store.dispatch('registerUser', {
        cardToken: tokenResult.token.id,
        user: {
          email: this.formData.email,
          password: this.formData.password,
          confirmPassword: this.formData.confirmPassword,
          name: this.formData.cardName,
        },
      });

      if (response.error) {
        console.error('Failed to subscribe user');
        this.error = response.error;
        this.loading = false;
        return;
      }

      // Redirect to /
      this.$router.push('/');
    },
  },
};
</script>
