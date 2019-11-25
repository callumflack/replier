<template>
  <div class="container Block-sm max-w-xl">
    <PaymentForm />
  </div>
</template>

<script>
import PaymentForm from '@/components/PaymentForm.vue';

export default {
  name: 'page-pay',
  components: {
    PaymentForm,
  },
};
</script>
