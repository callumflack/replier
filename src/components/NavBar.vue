<template>
  <div id="nav" class="container max-w-3xl Block-md-t Block-sm-b">
    <nav class="Nav flex justify-between">
      <router-link
        to="/"
        class="Title relative w-2/3"
      >
        <span :class="{ home: $route.name === 'home' }">Corvid Reply</span>
        <span :class="{ reply: $route.name !== 'home' }">
          <icon name="arrow-back" class="mr-1" />
          <span>Revise selection</span>
        </span>
      </router-link>
      <NavBarInfo class="mt-px"></NavBarInfo>
    </nav>
  </div>
</template>

<script>
import NavBarInfo from '@/components/NavBarInfo.vue';

export default {
  components: {
    NavBarInfo,
  },
};
</script>

<style lang="postcss">
#nav {
  @apply relative;
  z-index: 100;
}
.Nav {
  @apply w-full border-b-2 border-black pb-4;
}

.Title > span {
  @apply absolute left-0 opacity-0 inline-block;
  transition:
    opacity 200ms cubic-bezier(0.19, 1, 0.22, 1),
    transform 750ms cubic-bezier(0.19, 1, 0.22, 1);
  transform: translateX(-5%);
}
.Title span.home,
.Title span.reply {
  @apply opacity-100;
  transform: translateX(0);
}
</style>
