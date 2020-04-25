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
      <span class="font-bold mobile:table mobile:mx-auto">
        It's not our data, it's yours.
      </span>
      We don't store anything you paste nor type here.
      <!-- <span class="Link">Opt out of all tracking.</span> -->
    </MessageBar>
  </div>
</template>

<script>
import MessageBar from '@/components/MessageBar.vue';

export default {
  components: {
    MessageBar
  },
}
</script>
