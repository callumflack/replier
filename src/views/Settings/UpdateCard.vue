<template>
  <div class="container Block-sm max-w-3xl">
    <PaymentForm :onSubmit="updateCard" @success="handleSuccess" />
  </div>
</template>

<script>
import PaymentForm from '@/components/PaymentForm.vue';
import api from '@/lib/api.js';

export default {
  name: 'page-settings-update-card',
  components: {
    PaymentForm,
  },
  methods: {
    async updateCard(token) {
      const response = await api.put('/write/pay/subscribe', {
        cardToken: token.id,
      });

      if (response.error) {
        console.error('Failed to update card details');
        const error = new Error('Failed to update card details');
        error.code = 'CARD_UPDATE_FAILED';
        return error;
      }

      // Update user in vuex store
      this.$store.dispatch('getUser', true);

      return null;
    },
  },
};
</script>
