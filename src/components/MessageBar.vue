<template>
  <div v-show="show" class="relative bg py-5 -mx-8">
    <div class="Text-sm text-blackgray text-center px-8 lg:px-16 mb-px">
      <slot></slot>
      <!-- <nuxt-link v-if="link" :to="link" class="Link Link--rev">
        Read more.
      </nuxt-link> -->
    </div>
    <div
      class="absolute top-0 right-0 bottom-0 cursor-pointer text-blackgray px-inset flex items-center"
      @click="show = !show"
    >
      <icon name="close"></icon>
    </div>
  </div>
</template>

<script>
export default {
  name :"MessageBar",
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style lang="postcss" scoped>
.bg {
  background-color: rgb(247, 247, 247);
}
</style>
