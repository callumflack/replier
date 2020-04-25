<template>
  <!-- <button class="Button" id="checkout-button-sku_H9hlmTOYXeeC8k" @click="handleClick"> -->
  <button class="Button" id="checkout-button-sku_HA2ZsTlYVOHV2n" @click="handleClick">
    <!-- $2 Donation -->
    Micro donate
  </button>
</template>

<script>
/* global Stripe */
export default {
  methods: {
    async handleClick() {
      // const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);
      const stripe = Stripe("pk_test_DAddKTtCLuVq2utH4ANloAO5");
      const response = await fetch("/.netlify/functions/donation");
      const json = await response.json();
      await stripe.redirectToCheckout({
        sessionId: json.session.id,
      });
      // `redirectToCheckout` may fail due to a browser or network error
    },
  },
};
</script>
