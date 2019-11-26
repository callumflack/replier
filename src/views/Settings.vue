<template>
  <div class="container Block-sm max-w-3xl">
    <div v-if="$store.state.auth.user.stripeSubscriptionId">
      <div class="s-h">
        <h3 class="Title">You're subscribed!</h3>
        <p class="s-p">Your subscription is currently active, you may cancel your plan by clicking below.</p>
      </div>
      <button
        :disabled="loadingCancel"
        class="Button Button--lg"
        @click="cancelPayment"
      >Cancel payment</button>
    </div>
    <div v-else>
      <div class="s-h">
        <h3 class="Title">You're not subscribed</h3>
        <p class="s-p">Your subscription is currently inactive, click below to resume your subscription.</p>
      </div>
      <button
        :disabled="loadingResume"
        class="Button Button--lg"
        @click="resumePayment"
      >Resume payment</button>
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
    };
  },
  methods: {
    async cancelPayment() {
      this.loadingCancel = true;

      const response = await api.delete('/pay/subscribe');
      console.log(response);

      // Update user in vuex store
      await this.$store.dispatch('getUser', true);

      this.loadingCancel = false;
    },
    async resumePayment() {
      this.$router.push('/pay');
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
