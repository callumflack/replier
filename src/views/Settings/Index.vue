<template>
  <div class="container max-w-3xl">
    <div class="Block-sm">
      <div v-if="subscriptionStatus === 'ACTIVE'">
        <div class="s-h">
          <h3 class="Title">You're subscribed!</h3>
          <p class="s-p">
            Your subscription is currently active, you may cancel your plan by clicking below.
          </p>
        </div>
        <button
          :disabled="loadingCancel"
          class="Button Button--lg"
          @click="cancelPayment"
        >Cancel payment</button>
      </div>
      <div v-if="subscriptionStatus === 'CANCELLED'">
        <div class="s-h">
          <h3 class="Title">You're subscription is paused</h3>
          <p class="s-p">Your subscription is currently paused, click below to resume your subscription.</p>
        </div>
        <button
          :disabled="loadingResume"
          class="Button Button--lg"
          @click="resumePayment"
        >Resume payment</button>
      </div>
    </div>

    <div class="Block-sm">
      <router-link to="/settings/update-card" class="Link">Update your payment details</router-link>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api';

export default {
  name: 'page-login',
  data() {
    return {
      loadingCancel: false,
      loadingResume: false,
      stripeSubscription: null,
    };
  },
  async mounted() {
    this.getStripeSubscription();
  },
  computed: {
    subscriptionStatus() {
      if (!this.stripeSubscription) {
        return 'INACTIVE';
      }

      return this.stripeSubscription.cancel_at_period_end
        ? 'CANCELLED'
        : 'ACTIVE';
    },
  },
  methods: {
    async getStripeSubscription() {
      const response = await api.get('/write/pay/subscribe');
      this.stripeSubscription = response.stripeSubscription;
    },
    async cancelPayment() {
      this.loadingCancel = true;

      await api.delete('/write/pay/subscribe');

      // Update user in vuex store
      await this.$store.dispatch('getUser', true);
      await this.getStripeSubscription();

      this.loadingCancel = false;
    },
    async resumePayment() {
      this.loadingResume = true;

      await api.post('/write/pay/resume');

      // Update user in vuex store
      await this.$store.dispatch('getUser', true);
      await this.getStripeSubscription();

      this.loadingResume = false;
    },
    async handleSubmit() {
      this.error = null;
      this.submitting = true;
      const response = await this.$store.dispatch('loginUser', this.formData);

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
