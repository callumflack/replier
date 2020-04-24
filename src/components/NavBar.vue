<template>
  <nav
    id="nav"
    class="Nav flex justify-between"
    :class="{ 'border-brand-primary': showDialog }"
  >
    <div class="pos-button">
      <DonationButton
        class="Button--sm Text-xs"
        :class="{ 'Button--active': showDialog }"
      ></DonationButton>
    </div>
    <router-link
      to="/"
      class="Title relative w-1/2"
    >
      <h1
        class="element"
        :class="{ home: $route.name === 'home', 'text-brand-primary': showDialog }"
      >
        Write
        <span
          v-if="$store.state.timestamp && $store.state.selections.length < 1" class="Title-direction text-brand-primary font-normal mobile:hidden"
          :class="{ invisible: showDialog }"
        >click to select…</span>
      </h1>
      <span
        class="element"
        :class="{ reply: $route.name !== 'home', 'text-brand-primary': showDialog }"
      >
        <icon name="arrow-back" class="mr-1" />
        <span>Revise</span>
      </span>
    </router-link>
    <NavBarInfo class="transform translate-y-1"></NavBarInfo>
  </nav>
</template>

<script>
import DonationButton from "@/components/DonationButton";
import NavBarInfo from '@/components/NavBarInfo2';

export default {
  components: {
    DonationButton,
    NavBarInfo,
  },
  computed: {
    showDialog() {
      return this.$store.state.showInfoDialog;
    },
  },
  // if using portal for modal
  // data: () => ({
  //   modalActive: false
  // }),
  // methods: {
  //   infoModalActive() {
  //     this.modalActive = !this.modalActive;
  //     this.$emit('info-modal-active');
  //   }
  // }
};
</script>

<style lang="postcss">
.Nav {
  @apply relative z-100 w-full border-b-2 border-scheme-text-border pt-w6 pb-4;
}

.Button--sm.Text-xs {
  /* Text-sm has a cascade issue */
  font-size: calc(theme(fontSize.xs) * var(--text-ratio));
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
</style>

<style lang="postcss" scoped>
.pos-button {
  @apply absolute top-0 right-0 pt-w2;
}
.Button {
  border-color: var(--scheme-border);
}
.Button--active {
  border-color: theme(colors.brand.primary);
  color: theme(colors.brand.primary);
}
.Button--active:hover {
  box-shadow: theme(colors.brand.primary) 0 0 0 var(--button-box-shadow-stroke-hover);
}

.modal-is-active .Title-direction {
  @apply opacity-0;
}
</style>
