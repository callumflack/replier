<template>
  <div class="container Block-sm max-w-3xl">
    <PaymentForm :onSubmit="subscribeToPlan" @success="handleSuccess" />
  </div>
</template>

<script>
import PaymentForm from '@/components/PaymentForm.vue';
import api from '@/lib/api.js';

export default {
  name: 'page-settings',
  components: {
    PaymentForm,
  },
  mounted() {
    if (this.$store.state.auth.user.stripeSubscriptionId) {
      this.$router.push('/settings');
    }
  },
  methods: {
    async subscribeToPlan(token, formData) {
      const response = await api.post('/write/pay/subscribe', {
        cardToken: token.id,
        email: formData.email,
      });

      if (response.error) {
        console.error('Failed to subscribe user');
        const error = new Error('Failed to subscribe user');
        error.code = 'SUBSCRIBE_FAILED';
        return error;
      }

      // Update user in vuex store
      this.$store.dispatch('getUser', true);

      return null;
    },
    async handleSuccess() {
      setTimeout(() => {
        this.$router.push('/');
      }, 5000);
    },
  },
};
</script>
