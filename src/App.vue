<template>
  <div id="app">
    <div id="nav" class="container max-w-4xl">
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#nav {
  @apply my-8;
  text-transform: uppercase;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  @apply text-brand-primary;
}
</style>
