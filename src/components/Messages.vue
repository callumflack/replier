<template>
  <div>
    <!-- DONATIONS -->
    <MessageBar alert v-if="$route.query.donation === 'success'">
      <span class="font-bold">Thanks!</span>
      We appreciate it. Tell your friends, and keep on tap tappin'
    </MessageBar>
    <MessageBar alert v-if="$route.query.donation === 'cancelled'">
      <span class="font-bold">Oh well!</span>
      Write is still free to use. If you like it, tell your friends. We'd appreciate it.
    </MessageBar>

    <!-- TRACKING -->
    <MessageBar>
      <!-- <span class="font-bold mobile:table mobile:mx-auto">
        It's your data, not ours.
      </span> -->
      We don't store anything you paste or type here.
      <template v-if="!optOut">
        You can also
        <button @click="optOutOfTracking" class="Link ">
          opt out of analytics tracking.
        </button>
      </template>
      <template v-else>
        <span class="font-bold mobile:table mobile:mx-auto">
          Analytics tracking turned off.
        </span>
      </template>
    </MessageBar>
  </div>
</template>

<script>
import MessageBar from '@/components/MessageBar.vue';

export default {
  components: {
    MessageBar
  },
  data: () => ({
    optOut: false,
  }),
  methods: {
    optOutOfTracking() {
      localStorage.setItem("doNotTrack", true);
      this.$gtm.enable(false);
      this.optOut = true;
    },
    optInToTracking() {
      localStorage.setItem("doNotTrack", false);
      this.$gtm.enable(true);
    },
  },
}
</script>
