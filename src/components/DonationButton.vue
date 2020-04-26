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
      const stripe = Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({
        items: [
          {
            sku: 'sku_HA2ZsTlYVOHV2n', // TEST
            quantity: 1
          }
        ],
        // Do not rely on the redirect to the successUrl for fulfilling
        // purchases, customers may not always reach the success_url after
        // a successful payment, or malicious users could directly access
        // the successUrl without paying.
        // Instead use one of the strategies described in
        // https://stripe.com/docs/payments/checkout/fulfillment
        successUrl: "http://write.corv.id?donation=success",
        cancelUrl: "http://write.corv.id?donation=cancelled"
      });
      // `redirectToCheckout` may fail due to a browser or network error
    },
  },
};
</script>
