<script setup lang="ts">
import ContainerChars from "./components/ContainerChars.vue";
</script>

<template>
  <header>
    <div class="title"><h2>Rick and Morty fun page</h2></div>
  </header>
  <div class="container">
    <ContainerChars />
  </div>
  <footer>Rick&Morty</footer>
</template>

<style scoped>
header {
  width: 100%;
  margin: 0 auto;
  line-height: 1;
  background-color: var(--vt-c-bgc-elem);
  color: var(--vt-c-bgc-h1);
}
@media (min-width: 760px) {
  header {
    line-height: 1.5;
  }
}
@media (min-width: 1024px) {
  header {
    width: 1024px;
    line-height: 1.5;
  }
}
.title {
  text-align: center;
}
.container {
  width: 100%;
  margin: 0 auto;
}
@media (min-width: 1024px) {
  .container {
    width: 1024px;
    margin: 5px auto;
  }
}
footer {
  display: block;
  text-align: center;
  background-color: var(--vt-c-divider-dark-1);
  color: var(--vt-c-white-mute);
}
/* @media (min-width: 1024px) {
  footer {
    display: block;
    text-align: center;
    background-color: var(--vt-c-divider-dark-1);
    color: var(--vt-c-white-mute);
  }
} */
</style>
