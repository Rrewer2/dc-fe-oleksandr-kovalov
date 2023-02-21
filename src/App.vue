<script setup lang="ts">
import ContainerChars from "./components/ContainerChars.vue";
</script>

<template>
  <header>
    <div><h1 class="">Rick and Morty fun page</h1></div>
  </header>
  <div class="CharList">
    <ContainerChars />
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-evenly;
  line-height: 1.5;
  /* max-height: 10vh; */
  background-color: var(--vt-c-bgc-elem);
  color: var(--vt-c-bgc-h1);
}
/* 
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
} */
</style>
