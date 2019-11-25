<template>
  <form action="/charge" method="post" id="payment-form">
    <div class="mb-6">
      <div v-if="success && !loading" class="text-form-good mb-4">
        Your payment was successful! You will be redirected in 5 seconds.
      </div>

      <div v-if="error && !loading" class="text-form-bad mb-4">
        There was an error processing your payment. Please try again.
      </div>

      <label for="card-element" class="block mb-4">
        Credit or debit card
      </label>

      <!-- A Stripe Element will be inserted here. -->
      <div id="card-element" />

      <!-- Used to display form errors. -->
      <div id="card-errors" role="alert" />
    </div>

    <button :disabled="loading" class="Button">Submit Payment</button>
  </form>
</template>

<script>
import api from '@/lib/api.js';

export default {
  name: 'PaymentForm',
  data() {
    return {
      // Stripe library instance on window
      stripe: null,
      error: false,
      success: false,
    };
  },
  mounted() {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://js.stripe.com/v3/');
    script.async = true;
    document.head.appendChild(script);
    script.onload = this.initStripeElements;
  },
  methods: {
    async stripeTokenHandler(token) {
      const response = await api.post('/pay/subscribe', {
        cardToken: token.id,
        email: this.$store.state.auth.user.email,
      });

      if (response instanceof Error || response.error) {
        console.error('Failed to subscribe user');
        this.error = true;
        this.success = false;
        this.loading = false;
        return;
      }

      this.success = true;
      this.loading = false;

      await this.$store.dispatch('getUser', true);

      setTimeout(() => {
        this.$router.push('/');
      }, 5000);
    },
    initStripeElements() {
      // Create a Stripe client.
      this.stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);

      // Create an instance of Elements.
      const elements = this.stripe.elements();

      // Custom styling can be passed to options when creating an Element.
      // (Note that this demo uses a wider set of styles than the guide below.)
      const style = {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      };

      // Create an instance of the card Element.
      const card = elements.create('card', { style });

      // Add an instance of the card Element into the `card-element` <div>.
      card.mount('#card-element');

      // Handle real-time validation errors from the card Element.
      card.addEventListener('change', (event) => {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });

      // Handle form submission.
      const form = document.getElementById('payment-form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        this.error = false;
        this.success = false;
        this.loading = true;

        this.stripe.createToken(card).then((result) => {
          if (result.error) {
            // Inform the user if there was an error.
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            // Send the token to your server.
            this.stripeTokenHandler(result.token);
          }
        });
      });
    },
    async handleSubmit() {
      this.error = null;
      this.submitting = true;
      const response = await this.$store.dispatch('pay', this.formData);

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

<style scoped>
/**
 * The CSS shown here will not be introduced in the Quickstart guide, but shows
 * how you can use CSS to style your Element's container.
 */
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
