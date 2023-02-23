<template>
  <header class="header">
    <h1 class="title">Rick and Morty fun page</h1>
  </header>

  <ContainerChars />

  <footer class="footer">Rick&Morty</footer>
</template>

<script setup lang="ts">
import ContainerChars from "./components/ContainerChars.vue";
</script>

<style scoped>
.header {
  font-size: 0.75rem;
  background-color: var(--vt-c-bgc-header);
  color: var(--vt-c-bgc-title);
}
@media (min-width: 768px) {
  .header {
    line-height: 1.5;
    font-size: 1rem;
  }
}
@media (min-width: 1024px) {
  .header {
    margin: 0 5rem;
  }
}
.title {
  text-align: center;
}
.footer {
  display: block;
  text-align: center;
  background-color: var(--vt-c-bgc-footer);
  color: var(--vt-c-text-footer);
}
@media (min-width: 768px) {
  .footer {
    font-size: 0.75rem;
    line-height: 1.5;
    font-size: 1rem;
  }
}
@media (min-width: 1024px) {
  .footer {
    margin: 0 5rem;
  }
}
</style>
