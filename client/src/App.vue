<template>
  <div id="app">
    <div id="nav" class="container Block-sm max-w-5xl">
      <router-link to="/">Writing-App</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#nav a.router-link-exact-active {
  @apply text-brand-primary;
}
</style>
