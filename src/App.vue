<template>
  <div id="app">
    <div id="nav" class="container">
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
:root {
  --color-brand: #00CDFB;
}

*, *:before, *:after {
  box-sizing: border-box;
}

#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: var(--color-brand);
}

.container {
  max-width: 960px;
  margin: auto;
}

input, textarea {
  font-family: inherit;
  font-weight: inherit;
  width: 100%;
}

button {
  cursor: pointer;
}

.next-button {
  background: var(--color-brand);
  color: #fff;
  padding: 0.7rem 2rem;
  float: right;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border: 0;
  border-radius: 2px;
  font-weight: bold;
  text-transform: uppercase;
}
.next-button:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>
