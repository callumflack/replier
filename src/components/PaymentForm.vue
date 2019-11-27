<template>
  <form action="/charge" method="post" id="payment-form" @submit="handleSubmit">
    <div class="mb-6">
      <div v-if="success && !loading" class="text-form-good mb-4">
        Your payment was successful! You will be redirected in 5 seconds.
      </div>

      <div v-if="error && !loading" class="text-form-bad mb-4">
        There was an error processing your payment. Please try again.
      </div>

      <div class="Form__field">
        <label for="billing-email" class="block mb-2">
          Email
        </label>
        <input id="billing-email" class="Input Input--bordered" v-model="formData.email" required />
      </div>

      <div class="Form__field">
        <label for="card-name" class="block mb-2">
          Fullname On Card
        </label>
        <input id="card-name" class="Input Input--bordered" v-model="formData.cardName" required />
      </div>

      <div class="Form__field">
        <label for="card-element" class="block mb-2">
          Credit or debit card
        </label>
        <!-- A Stripe Element will be inserted here. -->
        <div id="card-element" />

        <!-- Used to display form errors. -->
        <div id="card-errors" role="alert" />
      </div>

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
      // Stripe card object
      card: null,
      error: false,
      success: false,
      loading: false,
      formData: {
        cardName: '',
        email: this.$store.state.auth.user.email,
      },
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
    async subscribeToPlan(token) {
      const response = await api.post('/pay/subscribe', {
        cardToken: token.id,
        ...this.formData,
      });

      if (response.error) {
        console.error('Failed to subscribe user');
        this.error = true;
        this.success = false;
        this.loading = false;
        return;
      }

      this.success = true;
      this.loading = false;

      // Update user in vuex store
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
      this.card = elements.create('card', { style });

      // Add an instance of the card Element into the `card-element` <div>.
      this.card.mount('#card-element');

      // Handle real-time validation errors from the card Element.
      this.card.addEventListener('change', (event) => {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });
    },
    async handleSubmit() {
      this.error = false;
      this.success = false;
      this.loading = true;

      const tokenResult = await this.stripe.createToken(this.card, { name: this.formData.cardName });

      if (tokenResult.error) {
        // Inform the user if there was an error.
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = tokenResult.error.message;
        return;
      }

      // Send the token to your server.
      this.subscribeToPlan(tokenResult.token);
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

.Form__field {
  @apply mb-8;
}
</style>
