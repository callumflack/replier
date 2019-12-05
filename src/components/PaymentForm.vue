<template>
  <form method="post" id="payment-form" @submit.prevent="handleSubmit">
    <div class="mb-6">
      <div v-if="success && !loading" class="text-form-good mb-4">
        Your payment details have been updated!
      </div>

      <div v-if="error && !loading" class="text-form-bad mb-4">
        There was an error processing your payment. Please try again.
      </div>

      <div class="Form__field">
        <label for="billing-email" class="block mb-2">
          Email
        </label>
        <input id="billing-email" class="Input Input--bordered" v-model="formData.email" disabled required />
      </div>

      <div class="Form__field">
        <label for="card-name" class="block mb-2">
          Fullname On Card
        </label>
        <input id="card-name" class="Input Input--bordered" v-model="formData.cardName" required />
      </div>

      <div class="Form__field">
        <StripeElements ref="stripeElements" />
      </div>

    </div>

    <button :disabled="loading" class="Button">Update details</button>
  </form>
</template>

<script>
import StripeElements from '@/components/StripeElements.vue';

export default {
  name: 'PaymentForm',
  props: {
    /**
     * This function will be called on a successful submission and token generation
     * If an Error object is returned it's treated as though the submission failed
     * Passed arguments: (cardToken, formData)
     */
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  components: {
    StripeElements,
  },
  data() {
    return {
      error: false,
      success: false,
      loading: false,
      formData: {
        cardName: '',
        email: this.$store.state.auth.user.email,
      },
    };
  },
  methods: {
    async handleSubmit() {
      this.error = false;
      this.success = false;
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

      const response = await this.onSubmit(tokenResult.token, this.formData);

      if (response instanceof Error) {
        this.error = true;
        this.success = false;
      } else {
        this.error = false;
        this.success = true;
      }

      this.loading = false;

      this.$emit('success');
    },
  },
};
</script>

<style scoped>
.Form__field {
  @apply mb-8;
}
</style>
