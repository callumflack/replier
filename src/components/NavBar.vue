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
    <!-- NAV: R LOGO + L INFO -->
    <router-link
      to="/"
      class="Title relative w-1/2 lg:w-2/3"
    >
      <span
        class="element"
        :class="{ home: $route.name === 'home' || showDialog, 'text-brand-primary': showDialog }"
      >
        <!-- LOGO -->
        <h1 class="inline mr-2">
          <!-- Replier -->
          <Logo></Logo>
        </h1>
        <!-- directions after pasting -->
        <span
          v-if="$store.state.timestamp"
          class="Text-sm font-medium text-brand-primary mobile:hidden"
          :class="{ invisible: showDialog }"
        >
          <template v-if="$store.state.selections.length === 0">
            Click to select…
          </template>
          <template v-if="$store.state.selections.length > 0 && $store.state.selections.length < 3">
            Click + command for multiples…
          </template>
          <template v-if="$store.state.selections.length === 3">
            Nice!
          </template>
        </span>
      </span>
      <!-- REVISE -->
      <span
        class="element"
        :class="{ reply: $route.name !== 'home' && !showDialog, 'text-brand-primary': showDialog }"
      >
        <icon name="arrow-back" class="mr-1" />
        <span>revise</span>
      </span>
    </router-link>
    <!-- L: INFO -->
    <NavBarInfo class="transform translate-y-1"></NavBarInfo>
  </nav>
</template>

<script>
import DonationButton from "@/components/DonationButton";
import Logo from '@/components/Logo';
import NavBarInfo from '@/components/NavBarInfo2';

export default {
  components: {
    DonationButton,
    Logo,
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
  color: var(--scheme-text-gray);
}
.Button:hover,
.Button:active,
.Button:focus {
  border-color: var(--scheme-text);
  box-shadow: var(--scheme-text) 0 0 0 var(--button-box-shadow-stroke-hover);
  color: var(--scheme-text);
}
.Button--active {
  border-color: theme(colors.brand.primary);
  color: theme(colors.brand.primary);
}
.Button--active:hover,
.Button--active:active,
.Button--active:focus {
  border-color: var(--scheme-primary);
  box-shadow: var(--scheme-primary) 0 0 0 var(--button-box-shadow-stroke-hover);
  color: var(--scheme-primary);
}


/* .modal-is-active .Title-direction {
  @apply opacity-0;
} */
</style>
