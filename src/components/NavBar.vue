<template>
  <nav id="nav" class="Nav flex justify-between">
    <router-link
      to="/"
      class="Title relative w-1/2"
    >
      <!-- <h1 :class="{ home: $route.name === 'home' }">Corvid Write</h1> -->
      <h1 class="element" :class="{ home: $route.name === 'home' }">
        Write
        <span
          v-if="$store.state.timestamp && $store.state.selections.length < 1" class="Title-direction text-brand-primary font-normal"
        >click to select…</span>
      </h1>
      <span class="element" :class="{ reply: $route.name !== 'home' }">
        <icon name="arrow-back" class="mr-1" />
        <span>Revise</span>
      </span>
    </router-link>
    <NavBarInfo class="transform translate-y-1"></NavBarInfo>
  </nav>
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
.Nav {
  @apply relative z-100 w-full border-b-2 border-scheme-text-border pt-w6 pb-4;
}

.Title .element {
  @apply absolute left-0 opacity-0 inline-block;
  transition:
    opacity 250ms theme(bezier.thisalso),
    transform 1000ms theme(bezier.thisalso);
  transform: translateX(-5%);
}
.Title .home,
.Title .reply {
  @apply opacity-100;
  transform: translateX(0);
}

.modal-is-active .Title-direction {
  @apply opacity-0;
}
</style>
