<template>
  <div>
    <!-- DONATIONS -->
    <MessageBar alert v-if="$route.query.donation === 'success'">
      <span class="font-bold">Thanks!</span>
      We appreciate it. Tell your friends, and keep on tap tappin'.
    </MessageBar>
    <MessageBar alert v-if="$route.query.donation === 'cancelled'">
      <span class="font-bold">Oh well!</span>
      Replier is still free to use. If you like it, tell your friends. We'd appreciate it.
    </MessageBar>
    <MessageBar alert v-if="$route.query.ref === 'producthunt'">
      <icon
        name="flash_on"
        class="text-white mr-2px"
        height="1.25em"
        width="1.25em"
      ></icon>
      <span class="font-bold">Hello Product Hunters.</span>
      Replier is free to use. If you like it, tell your friends!
    </MessageBar>

    <!-- TRACKING -->
    <MessageBar>
      <!-- <span class="font-bold mobile:table mobile:mx-auto">
        It's your data, not ours.
      </span> -->
      We don't store anything you paste or type here.
      <template v-if="!optedOut">
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
import * as storage from "@/lib/storage";
import MessageBar from '@/components/MessageBar.vue';

export default {
  components: {
    MessageBar
  },
  data: () => ({
    optedOut: storage.localStorageGet("doNotTrack"),
  }),
  methods: {
    optOutOfTracking() {
      storage.localStorageSet("doNotTrack", true);
      this.$gtm.enable(false);
      this.optedOut = true;
    },
  },
}
</script>
